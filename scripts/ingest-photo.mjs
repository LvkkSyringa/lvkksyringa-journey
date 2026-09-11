import { createHash } from "node:crypto";
import {
  access,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import exifr from "exifr";
import heicConvert from "heic-convert";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const defaultInputDir = path.join(repoRoot, "public", "incoming", "photos");
const outputDir = path.join(repoRoot, "public", "images");
const worksPath = path.join(repoRoot, "src", "data", "works.ts");
const historyPath = path.join(repoRoot, "src", "data", "photo-ingest-history.json");
const supportedExtensions = new Set([".heic", ".jpg", ".jpeg", ".png"]);
const exifTags = [
  "Make",
  "Model",
  "LensModel",
  "FNumber",
  "ExposureTime",
  "ISO",
  "FocalLength",
  "FocalLengthIn35mmFormat",
  "DateTimeOriginal",
  "CreateDate",
  "ModifyDate",
  "Orientation",
];

function printHelp() {
  console.log(`Photo ingest for Fengqiao World

Usage:
  npm.cmd run ingest:photo
  npm.cmd run ingest:photo -- --apply
  npm.cmd run ingest:photo -- --input <directory> --metadata <file>

Options:
  --apply             Convert images and append resolved entries to works.ts.
  --input <directory> Override public/incoming/photos for a dry-run or test.
  --metadata <file>   Override <input>/metadata.json.
  --limit <number>    Inspect only the first N sorted input files.
  --help              Show this message.

The default run is read-only. Copy metadata.example.json to metadata.json,
fill the owner-controlled fields, review the preview, then run with --apply.`);
}

function parseArgs(argv) {
  const options = {
    apply: false,
    inputDir: defaultInputDir,
    metadataPath: null,
    limit: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") {
      options.apply = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else if (arg === "--input") {
      const value = argv[index + 1];
      if (!value) throw new Error("--input requires a directory path.");
      options.inputDir = path.resolve(repoRoot, value);
      index += 1;
    } else if (arg === "--metadata") {
      const value = argv[index + 1];
      if (!value) throw new Error("--metadata requires a JSON file path.");
      options.metadataPath = path.resolve(repoRoot, value);
      index += 1;
    } else if (arg === "--limit") {
      const value = Number.parseInt(argv[index + 1], 10);
      if (!Number.isInteger(value) || value < 1) {
        throw new Error("--limit requires a positive integer.");
      }
      options.limit = value;
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  options.metadataPath ??= path.join(options.inputDir, "metadata.json");
  return options;
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJsonIfPresent(filePath, fallback) {
  if (!(await fileExists(filePath))) return fallback;
  const source = await readFile(filePath, "utf8");
  return JSON.parse(source.replace(/^\uFEFF/, ""));
}

function normalizeManifest(rawManifest) {
  if (!rawManifest || Array.isArray(rawManifest) || typeof rawManifest !== "object") {
    throw new Error("metadata.json must be an object keyed by source filename.");
  }

  return new Map(
    Object.entries(rawManifest).map(([filename, value]) => [
      filename.toLocaleLowerCase("en-US"),
      value && typeof value === "object" && !Array.isArray(value) ? value : {},
    ]),
  );
}

function photoSection(source) {
  const start = source.indexOf("const photoWorks: Work[]");
  const end = source.indexOf("/* ── 游戏作品 ── */", start);
  if (start < 0 || end < 0) {
    throw new Error("Could not locate the photoWorks section in src/data/works.ts.");
  }
  return source.slice(start, end);
}

function existingPhotoState(source) {
  const section = photoSection(source);
  const ids = new Set();
  const images = new Set();
  const maxSequenceByDate = new Map();

  for (const match of section.matchAll(/"id":\s*"(photo-(\d{8})(\d+))"/g)) {
    const [, id, date, sequenceText] = match;
    const sequence = Number.parseInt(sequenceText, 10);
    ids.add(id);
    maxSequenceByDate.set(date, Math.max(maxSequenceByDate.get(date) ?? 0, sequence));
  }

  for (const match of section.matchAll(/"image":\s*"([^"]+)"/g)) {
    images.add(match[1].toLocaleLowerCase("en-US"));
  }

  return { ids, images, maxSequenceByDate };
}

function cleanString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function numericValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const number = Number.parseFloat(value);
    return Number.isFinite(number) ? number : null;
  }
  return null;
}

function dateKey(value) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return [value.getFullYear(), value.getMonth() + 1, value.getDate()]
      .map((part) => String(part).padStart(2, "0"))
      .join("");
  }

  if (typeof value === "string") {
    const match = value.match(/^(\d{4})[-:/]?(\d{2})[-:/]?(\d{2})/);
    if (match) return `${match[1]}${match[2]}${match[3]}`;
  }

  return null;
}

function formatAperture(value) {
  const number = numericValue(value);
  if (number === null) return null;
  return `f/${Number.isInteger(number) ? number : number.toFixed(1)}`;
}

function formatShutter(value) {
  const number = numericValue(value);
  if (number === null || number <= 0) return null;
  if (number < 1) return `1/${Math.round(1 / number)}`;
  return `${Number.isInteger(number) ? number : number.toFixed(1)}s`;
}

function formatIso(value) {
  const number = numericValue(value);
  return number === null ? null : String(Math.round(number));
}

function formatFocal(value) {
  const number = numericValue(value);
  if (number === null || number <= 0) return null;
  const formatted = Number.isInteger(number) ? String(number) : number.toFixed(1);
  return `${formatted}mm`;
}

function formatCamera(makeValue, modelValue) {
  const make = cleanString(makeValue);
  const model = cleanString(modelValue);
  if (!model) return null;
  if (/^sony$/i.test(make ?? "") && !/^sony\s/i.test(model)) {
    return `Sony ${model}`;
  }
  return model;
}

function inferIPhoneLens(equivalentFocal, lensModel) {
  const focal = numericValue(equivalentFocal);
  const model = cleanString(lensModel);
  if (model && /16[.,]89/i.test(model)) return "Tele 100mm";
  if (focal === null) return null;
  if (focal >= 13 && focal <= 15) return "Ultra Wide 14mm";
  if (focal >= 23 && focal <= 25) return "Main 24mm";
  if (focal >= 47 && focal <= 49) return "Main 48mm";
  if (focal >= 95 && focal <= 105) return "Tele 100mm";
  return null;
}

function resolveTags(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(cleanString).filter(Boolean))];
}

function reserveId(date, state, overrideId) {
  if (overrideId) {
    if (!/^photo-\d{9,}$/.test(overrideId)) {
      throw new Error(`Invalid photo id '${overrideId}'. Expected photo-YYYYMMDDN.`);
    }
    if (state.ids.has(overrideId)) throw new Error(`Photo id already exists: ${overrideId}`);
    state.ids.add(overrideId);
    return overrideId;
  }

  const next = (state.maxSequenceByDate.get(date) ?? 0) + 1;
  state.maxSequenceByDate.set(date, next);
  const id = `photo-${date}${next}`;
  if (state.ids.has(id)) throw new Error(`Generated photo id already exists: ${id}`);
  state.ids.add(id);
  return id;
}

async function sha256(filePath) {
  const buffer = await readFile(filePath);
  return createHash("sha256").update(buffer).digest("hex");
}

async function inspectPhoto(filePath, override, state, historyByHash) {
  const filename = path.basename(filePath);
  const originalSha256 = await sha256(filePath);
  const previous = historyByHash.get(originalSha256);
  if (previous) {
    return { filename, originalSha256, alreadyImported: previous };
  }

  let exif = {};
  let exifError = null;
  const skipExif = override.skipExif === true;
  const configuredExifSource = cleanString(override.exifSource);
  const exifSourcePath = configuredExifSource
    ? path.isAbsolute(configuredExifSource)
      ? configuredExifSource
      : path.resolve(repoRoot, configuredExifSource)
    : filePath;
  if (!skipExif) {
    try {
      exif = (await exifr.parse(exifSourcePath, exifTags)) ?? {};
    } catch (error) {
      exifError = error instanceof Error ? error.message : String(error);
    }
  }

  const make = cleanString(exif.Make);
  const camera = cleanString(override.camera) ?? formatCamera(make, exif.Model);
  const isIPhone = /iphone/i.test(camera ?? "") || /apple/i.test(make ?? "");
  const equivalentFocal = exif.FocalLengthIn35mmFormat;
  const date =
    dateKey(override.date) ??
    dateKey(exif.DateTimeOriginal) ??
    dateKey(exif.CreateDate) ??
    dateKey(exif.ModifyDate);

  const missing = [];
  if (!date) missing.push("date");

  let id = null;
  let image = null;
  if (date) {
    id = reserveId(date, state, cleanString(override.id));
    image = `/images/${id.slice("photo-".length)}.jpg`;
    if (state.images.has(image.toLocaleLowerCase("en-US"))) {
      throw new Error(`Output image reference already exists: ${image}`);
    }
    state.images.add(image.toLocaleLowerCase("en-US"));
  }

  const hasTitle = Object.prototype.hasOwnProperty.call(override, "title");
  const title = cleanString(override.title);
  const location = cleanString(override.location) ?? cleanString(override.description);
  const tags = resolveTags(override.tags);
  const lens =
    cleanString(override.lens) ??
    (isIPhone
      ? inferIPhoneLens(equivalentFocal, exif.LensModel)
      : cleanString(exif.LensModel));
  const focal =
    cleanString(override.focal) ??
    formatFocal(isIPhone ? equivalentFocal : exif.FocalLength);
  const aperture = cleanString(override.aperture) ?? formatAperture(exif.FNumber);
  const shutter = cleanString(override.shutter) ?? formatShutter(exif.ExposureTime);
  const iso = cleanString(override.iso) ?? formatIso(exif.ISO);

  if (!hasTitle) missing.push("title");
  if (!location) missing.push("location");
  if (tags.length === 0) missing.push("tags");
  if (!skipExif) {
    if (!camera) missing.push("camera");
    if (!lens) missing.push("lens");
    if (!aperture) missing.push("aperture");
    if (!shutter) missing.push("shutter");
    if (!iso) missing.push("iso");
    if (!focal) missing.push("focal");
  }

  let work = null;
  if (id && image) {
    work = {
      id,
      title: title ?? "",
      description: location ?? "",
      tags,
      image,
    };
    if (!skipExif) {
      work.metadata = {
        Camera: camera ?? "",
        Lens: lens ?? "",
        Aperture: aperture ?? "",
        Shutter: shutter ?? "",
        ISO: iso ?? "",
        Focal: focal ?? "",
      };
    } else {
      const manualMetadata = Object.fromEntries(
        [
          ["Camera", camera],
          ["Lens", lens],
          ["Aperture", aperture],
          ["Shutter", shutter],
          ["ISO", iso],
          ["Focal", focal],
        ].filter(([, value]) => value),
      );
      if (Object.keys(manualMetadata).length > 0) {
        work.metadata = manualMetadata;
      }
    }
  }

  return {
    filename,
    sourcePath: filePath,
    originalSha256,
    exifError,
    exifSourcePath,
    skipExif,
    isIPhone,
    date,
    missing,
    work,
  };
}

function appendPhotoWorks(source, works) {
  const start = source.indexOf("const photoWorks: Work[]");
  const gameMarker = source.indexOf("/* ── 游戏作品 ── */", start);
  const closeBracket = source.lastIndexOf("]", gameMarker);
  if (start < 0 || gameMarker < 0 || closeBracket < start) {
    throw new Error("Could not find the closing photoWorks array bracket.");
  }

  const before = source.slice(0, closeBracket).replace(/\s+$/, "");
  const needsComma = /}\s*$/.test(before);
  const serialized = works
    .map((work) =>
      JSON.stringify(work, null, 2)
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n"),
    )
    .join(",\n");

  return `${before}${needsComma ? "," : ""}\n${serialized}\n${source.slice(closeBracket)}`;
}

async function convertPhoto(plan, destinationPath) {
  const extension = path.extname(plan.sourcePath).toLocaleLowerCase("en-US");
  let input = plan.sourcePath;
  if (extension === ".heic") {
    const buffer = await readFile(plan.sourcePath);
    input = Buffer.from(
      await heicConvert({
        buffer,
        format: "JPEG",
        quality: 1,
      }),
    );
  }

  await sharp(input)
    .rotate()
    .resize(1920, 1280, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toFile(destinationPath);
}

function printPreview(plans, metadataPath, apply) {
  console.log(apply ? "PHOTO INGEST APPLY" : "PHOTO INGEST DRY RUN");
  console.log(`Metadata: ${path.relative(repoRoot, metadataPath)}`);
  console.log("");

  for (const plan of plans) {
    if (plan.alreadyImported) {
      console.log(`SKIP ${plan.filename}`);
      console.log(`  Already imported as ${plan.alreadyImported.workId}.`);
      continue;
    }

    console.log(`${plan.missing.length ? "NEEDS INPUT" : "READY"} ${plan.filename}`);
    console.log(`  ID: ${plan.work?.id ?? "unresolved"}`);
    console.log(`  Image: ${plan.work?.image ?? "unresolved"}`);
    console.log(`  Date: ${plan.date ?? "missing"}`);
    console.log(
      `  EXIF: ${plan.skipExif ? "explicitly skipped" : plan.exifSourcePath}`,
    );
    console.log(`  Camera: ${plan.skipExif ? "not displayed" : plan.work?.metadata?.Camera || "missing"}`);
    console.log(`  Lens: ${plan.skipExif ? "not displayed" : plan.work?.metadata?.Lens || "missing"}`);
    console.log(`  Focal: ${plan.skipExif ? "not displayed" : plan.work?.metadata?.Focal || "missing"}`);
    if (plan.exifError) console.log(`  EXIF warning: ${plan.exifError}`);
    if (plan.missing.length) console.log(`  Missing: ${plan.missing.join(", ")}`);
    console.log("");
  }
}

async function applyPlans(plans, history, originalWorksSource) {
  const ready = plans.filter((plan) => !plan.alreadyImported);
  const unresolved = ready.filter((plan) => plan.missing.length > 0 || !plan.work);
  if (unresolved.length > 0) {
    throw new Error(
      `Apply stopped: ${unresolved.length} photo(s) still have unresolved fields. Update metadata.json and preview again.`,
    );
  }
  if (ready.length === 0) {
    console.log("Nothing new to apply.");
    return;
  }

  const stageDir = path.join(outputDir, `.photo-ingest-${process.pid}-${Date.now()}`);
  const moved = [];
  let worksChanged = false;
  let historyChanged = false;
  const originalHistorySource = `${JSON.stringify(history, null, 2)}\n`;

  await mkdir(stageDir, { recursive: false });
  try {
    for (const plan of ready) {
      const outputName = path.basename(plan.work.image);
      const finalPath = path.join(outputDir, outputName);
      if (await fileExists(finalPath)) {
        throw new Error(`Refusing to overwrite existing file: ${finalPath}`);
      }
      await convertPhoto(plan, path.join(stageDir, outputName));
    }

    for (const plan of ready) {
      const outputName = path.basename(plan.work.image);
      const finalPath = path.join(outputDir, outputName);
      await rename(path.join(stageDir, outputName), finalPath);
      moved.push(finalPath);
    }

    const updatedWorks = appendPhotoWorks(
      originalWorksSource,
      ready.map((plan) => plan.work),
    );
    const updatedHistory = [
      ...history,
      ...ready.map((plan) => ({
        sourceFilename: plan.filename,
        originalSha256: plan.originalSha256,
        workId: plan.work.id,
        image: plan.work.image,
      })),
    ];

    await writeFile(`${worksPath}.tmp`, updatedWorks, "utf8");
    await rename(`${worksPath}.tmp`, worksPath);
    worksChanged = true;
    await writeFile(`${historyPath}.tmp`, `${JSON.stringify(updatedHistory, null, 2)}\n`, "utf8");
    await rename(`${historyPath}.tmp`, historyPath);
    historyChanged = true;

    console.log(`Applied ${ready.length} photo(s). Incoming originals were left untouched.`);
  } catch (error) {
    if (worksChanged) await writeFile(worksPath, originalWorksSource, "utf8");
    if (historyChanged) await writeFile(historyPath, originalHistorySource, "utf8");
    await Promise.all(moved.map((filePath) => unlink(filePath).catch(() => undefined)));
    throw error;
  } finally {
    await rm(stageDir, { recursive: true, force: true });
    await unlink(`${worksPath}.tmp`).catch(() => undefined);
    await unlink(`${historyPath}.tmp`).catch(() => undefined);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const inputStats = await stat(options.inputDir).catch(() => null);
  if (!inputStats?.isDirectory()) {
    console.log(`No input directory found at ${path.relative(repoRoot, options.inputDir)}.`);
    console.log("Create it or restore the tracked public/incoming/photos folder, then add disposable photo copies.");
    return;
  }

  const manifest = normalizeManifest(await readJsonIfPresent(options.metadataPath, {}));
  const history = await readJsonIfPresent(historyPath, []);
  if (!Array.isArray(history)) throw new Error("photo-ingest-history.json must contain an array.");

  const filenames = (await readdir(options.inputDir))
    .filter((filename) => supportedExtensions.has(path.extname(filename).toLocaleLowerCase("en-US")))
    .sort((a, b) => a.localeCompare(b, "en-US", { numeric: true }));
  const selectedFilenames = options.limit ? filenames.slice(0, options.limit) : filenames;

  if (selectedFilenames.length === 0) {
    console.log(`No supported photos found in ${path.relative(repoRoot, options.inputDir)}.`);
    console.log("Supported extensions: .heic, .jpg, .jpeg, .png");
    return;
  }

  const originalWorksSource = await readFile(worksPath, "utf8");
  const state = existingPhotoState(originalWorksSource);
  const historyByHash = new Map(history.map((entry) => [entry.originalSha256, entry]));
  const plans = [];

  for (const filename of selectedFilenames) {
    const override = manifest.get(filename.toLocaleLowerCase("en-US")) ?? {};
    const plan = await inspectPhoto(
      path.join(options.inputDir, filename),
      override,
      state,
      historyByHash,
    );
    plans.push(plan);
    if (!plan.alreadyImported) {
      historyByHash.set(plan.originalSha256, {
        workId: plan.work?.id ?? `pending source ${filename}`,
      });
    }
  }

  printPreview(plans, options.metadataPath, options.apply);
  if (options.apply) {
    await applyPlans(plans, history, originalWorksSource);
  } else {
    console.log("Dry-run only: no images or portfolio data were changed.");
  }
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

export { appendPhotoWorks, convertPhoto, existingPhotoState, inspectPhoto };
