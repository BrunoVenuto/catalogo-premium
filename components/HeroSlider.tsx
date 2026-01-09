"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

export default function HeroSlider() {
  return (
    <section
      id="home"
      className="relative h-[85vh] min-h-[520px] w-full overflow-hidden"
    >
      {/* IMAGEM DE FUNDO */}
      <div
        className="
          absolute inset-0
          bg-cover
          bg-no-repeat
          bg-[position:75%_center]
          md:bg-center
        "
        style={{
          backgroundImage: `url(${siteConfig.hero.imageDesktop})`,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTEÚDO */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl"
          >
            {siteConfig.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-neutral-200 max-w-2xl"
          >
            {siteConfig.hero.subtitle}
          </motion.p>

          {/* BOTÃO COM PULSO */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0px rgba(250,204,21,0.0)",
                "0 0 35px rgba(250,204,21,0.9)",
                "0 0 0px rgba(250,204,21,0.0)",
              ],
            }}
            transition={{
              opacity: { duration: 0.7, delay: 0.2 },
              y: { duration: 0.7, delay: 0.2 },
              scale: {
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              boxShadow: {
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="
              inline-block mt-10
              bg-yellow-400 text-black
              px-10 py-4 rounded-xl
              font-bold text-lg
            "
          >
            {siteConfig.hero.cta}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
