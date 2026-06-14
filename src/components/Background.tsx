"use client";

import { Aurora } from "@/components/Aurora";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: "#020611" }}>
      <Aurora
        colorStops={["#1E3A5F", "#7C8EB4", "#A78BFA"]}
        amplitude={0.55}
        blend={0.35}
        speed={0.2}
      />
    </div>
  );
}
