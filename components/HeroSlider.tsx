"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSlider() {
  return (
    <section className="relative h-screen md:h-[90vh] bg-black overflow-hidden">
      
      {/* IMAGEM DESKTOP */}
      <img
        src={siteConfig.hero.imageDesktop}
        alt="Hero desktop"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          hidden md:block
        "
      />

      {/* IMAGEM MOBILE – MOSTRAR MAIS O ATLETA */}
      <img
        src={siteConfig.hero.imageMobile}
        alt="Hero mobile"
        className="
          absolute inset-0
          w-full h-full
          object-contain
          md:hidden
        "
      />

      {/* OVERLAY (MAIS LEVE NO MOBILE) */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/60" />

      {/* CONTEÚDO */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              text-4xl md:text-6xl
              font-bold
              text-white
              leading-tight
              max-w-3xl
              drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]
            "
          >
            {siteConfig.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-200 max-w-xl mt-6"
          >
            {siteConfig.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <Link
              href="#products"
              className="
                inline-block
                bg-green-600 text-black
                px-10 py-4
                rounded-xl
                font-bold
                hover:brightness-110
                transition
                animate-pulse
              "
            >
              {siteConfig.hero.cta}
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
