"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeadModalConsultoria from "./LeadModalConsultoria";
import { siteConfig } from "@/config/site";

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  // 🔥 ESCUTA O EVENTO VINDO DO MENU MOBILE
  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }

    document.addEventListener("open-consultoria", handleOpen);
    return () => {
      document.removeEventListener("open-consultoria", handleOpen);
    };
  }, []);

  function handleSubmit(data: {
    name: string;
    phone: string;
    goal: string;
  }) {
    const message =
      `Olá, meu nome é ${data.name}.\n` +
      `Telefone: ${data.phone}\n` +
      `Objetivo: ${data.goal}\n\n` +
      `Gostaria de uma consultoria antes de fazer meu pedido.`;

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setOpen(false);
  }

  return (
    <>
      {/* BOTÃO FLUTUANTE (SÓ DESKTOP) */}
      <motion.button
        onClick={() => setOpen(true)}
        className="
          hidden md:flex
          fixed bottom-24 right-6 z-50
          bg-yellow-400 text-black
          px-5 py-3 rounded-full
          font-extrabold
          shadow-[0_0_25px_rgba(250,204,21,0.6)]
        "
        animate={{
          scale: [1, 1.12, 1],
          boxShadow: [
            "0 0 15px rgba(250,204,21,0.4)",
            "0 0 30px rgba(250,204,21,0.9)",
            "0 0 15px rgba(250,204,21,0.4)",
          ],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.15 }}
        aria-label="Solicitar consultoria"
      >
        💬 Solicitar consultoria
      </motion.button>

      {/* MODAL DE CONSULTORIA */}
      <AnimatePresence>
        {open && (
          <LeadModalConsultoria
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
}
