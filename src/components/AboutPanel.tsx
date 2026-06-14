"use client";

import { motion } from "framer-motion";

export default function AboutPanel() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none p-4 sm:p-6">
      <div className="relative w-full h-full max-w-6xl mx-auto pointer-events-auto">
        {/* 卡片一：照片 + 个人信息 — 左上 */}
        <motion.div
          className="glass p-6 sm:p-8 absolute left-0 top-[6%] w-80 sm:w-[26rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-white/20">
              <img src="/avatar.jpg" alt="LvkkSyringa" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-light tracking-wide text-white/90">LvkkSyringa</h2>
              <p className="text-lg text-white/50 mt-1">Fengqiao Shi</p>
              <p className="text-base text-white/40 mt-2">Born in 2009, Shanghai, China</p>
            </div>
          </div>
        </motion.div>

        {/* 卡片二：宣言 + 兴趣 + 社交媒体 — 左下 */}
        <motion.div
          className="glass p-6 sm:p-8 absolute left-0 bottom-[4%] w-[22rem] sm:w-[30rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xl leading-relaxed text-white/70 italic mb-5">
            I take photos to capture beauty.<br />
            I develop games to create beauty.
          </p>
          <div className="mb-5">
            <h3 className="text-base tracking-widest text-white/45 uppercase mb-2">Other Interests</h3>
            <p className="text-lg text-white/55 leading-relaxed">
              Sports · Car Racing · Writing Short Stories · Music · Traveling · Playing Games
            </p>
          </div>
          <div>
            <h3 className="text-base tracking-widest text-white/45 uppercase mb-2">Social Media</h3>
            <p className="text-lg text-white/55">
              Douyin / Bilibili / Instagram: <span className="text-white/70">Lvkk_Syringa</span>
            </p>
          </div>
        </motion.div>

        {/* 卡片三：梦想 + slogan — 右侧 */}
        <motion.div
          className="glass p-6 sm:p-8 absolute right-[-1.5rem] top-[28%] w-80 sm:w-[26rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-xl tracking-widest text-white/45 uppercase mb-4">My Dreams</h3>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            Establish a little studio and develop more interesting and meaningful games with my friends. My ultimate goal is to spread kindness and seek beautiful things in the world.
          </p>
          <div className="border-t border-white/8 pt-4">
            <p className="text-xl italic text-white/55">
              &ldquo;May all the beauty be blessed.&rdquo;
            </p>
            <p className="text-base text-white/35 mt-1">— Honkai Impact 3rd</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
