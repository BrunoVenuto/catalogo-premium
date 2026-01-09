"use client";

import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="
              text-xl md:text-2xl font-extrabold tracking-wide
              bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
              bg-clip-text text-transparent
              drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]
            "
          >
            {siteConfig.name}
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex gap-8 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/#collections" className="hover:text-white transition">
              Coleções
            </Link>
            <Link href="/#products" className="hover:text-white transition">
              Produtos
            </Link>
            <Link href="/#contact" className="hover:text-white transition">
              Contato
            </Link>
          </nav>

          {/* HAMBURGUER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-3xl"
          >
            ☰
          </button>
        </div>
      </motion.header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute top-0 right-0 w-72 h-full bg-neutral-950 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-10">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="
                    text-lg font-extrabold
                    bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
                    bg-clip-text text-transparent
                  "
                >
                  {siteConfig.name}
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col gap-6 text-lg">
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
                <Link href="/#collections" onClick={() => setOpen(false)}>
                  Coleções
                </Link>
                <Link href="/#products" onClick={() => setOpen(false)}>
                  Produtos
                </Link>
                <Link href="/#contact" onClick={() => setOpen(false)}>
                  Contato
                </Link>

                {/* BOTÃO ORÇAMENTO */}
                <button
                  onClick={() => {
                    setOpen(false);
                    const btn = document.querySelector(
                      "button[data-cart-button]"
                    ) as HTMLButtonElement | null;
                    btn?.click();
                  }}
                  className="mt-6 bg-green-600 text-black py-3 rounded-lg font-semibold"
                >
                  🛒 Ver Orçamento
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
