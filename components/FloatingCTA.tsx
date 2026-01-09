"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function FloatingCTA() {
  const link = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    siteConfig.consultoriaMessage
  )}`;

  return (
    <motion.a
      href={link}
      target="_blank"
      className="
        hidden md:flex
        fixed z-40
        bottom-24 right-6
        bg-yellow-400 text-black
        px-6 py-4 rounded-full
        font-bold shadow-2xl
        items-center gap-2
      "
      animate={{
        scale: [1, 1.12, 1],
        boxShadow: [
          "0 0 0px rgba(250,204,21,0.0)",
          "0 0 40px rgba(250,204,21,1)",
          "0 0 0px rgba(250,204,21,0.0)",
        ],
      }}
      transition={{
        duration: 1.3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      💬 Solicitar consultoria
    </motion.a>
  );
}
