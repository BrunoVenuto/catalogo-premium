"use client";

import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import LeadModal from "./LeadModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  const mobileLinkClass = `
    block w-full px-4 py-3 rounded-lg
    text-white text-lg font-medium
    transition
    hover:bg-white/10 hover:text-yellow-400
    active:bg-white/20
  `;

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
          <nav className="hidden md:flex gap-8 text-sm text-neutral-200">
            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
            <Link href="/#collections" className="hover:text-yellow-400 transition">
              Coleções
            </Link>
            <Link href="/#products" className="hover:text-yellow-400 transition">
              Produtos
            </Link>
            <Link href="/#contact" className="hover:text-yellow-400 transition">
              Contato
            </Link>
          </nav>

          {/* HAMBURGUER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-3xl"
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>
      </motion.header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-neutral-950 p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* TOPO */}
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
                  aria-label="Fechar menu"
                >
                  ✕
                </button>
              </div>

              {/* LINKS MOBILE */}
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  Home
                </Link>
                <Link href="/#collections" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  Coleções
                </Link>
                <Link href="/#products" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  Produtos
                </Link>
                <Link href="/#contact" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  Contato
                </Link>
              </nav>

              {/* CTA CONSULTORIA (AGORA ABRE MODAL) */}
              <div className="mt-auto pt-8">
                <button
                  onClick={() => {
                    setOpen(false);
                    setLeadOpen(true);
                  }}
                  className="
                    w-full text-center
                    bg-yellow-400 text-black
                    py-4 rounded-xl
                    font-bold text-lg
                    shadow-lg
                    hover:brightness-110 transition
                  "
                >
                  💬 Solicitar consultoria
                </button>
              </div>

              {/* BOTÃO ORÇAMENTO */}
              <button
                onClick={() => {
                  setOpen(false);
                  const btn = document.querySelector(
                    "button[data-cart-button]"
                  ) as HTMLButtonElement | null;
                  btn?.click();
                }}
                className="
                  mt-4
                  w-full
                  bg-green-600 text-black
                  py-4 rounded-xl
                  font-bold text-lg
                  hover:brightness-110 transition
                "
              >
                🛒 Ver Orçamento
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE LEAD (CONSULTORIA) */}
      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        mode="consultoria"
      />
    </>
  );
}
