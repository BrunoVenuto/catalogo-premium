"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

export default function HeroSlider() {
  return (
    <section
      id="home"
      className="relative h-[80vh] bg-[url('/images/hero.jpg')] bg-cover bg-center overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Leve zoom contínuo no fundo */}
      <motion.div
        className="absolute inset-0 bg-[url('/images/logo.jpg')] bg-cover bg-top"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              {siteConfig.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-neutral-300 text-lg"
            >
              {siteConfig.hero.subtitle}
            </motion.p>

            {/* CTA PULSANTE */}
            <motion.a
              href="#products"
              className="inline-block mt-10 bg-emerald-500 px-12 py-5 rounded-xl text-black font-bold text-lg"
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 0px rgba(16,185,129,0.0)",
                  "0 0 30px rgba(16,185,129,0.9)",
                  "0 0 0px rgba(16,185,129,0.0)",
                ],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
            >
              {siteConfig.hero.cta}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
