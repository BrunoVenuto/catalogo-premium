"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
};

export default function LeadModalPedido({
  open,
  onClose,
  onConfirm,
}: Props) {
  const [name, setName] = useState("");

  function handleConfirm() {
    if (!name) return;
    onConfirm(name);
    setName("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-sm bg-neutral-950 text-white rounded-xl p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-3">
              Antes de enviar o pedido
            </h2>

            <p className="text-sm text-neutral-300 mb-4">
              Informe seu nome. O pagamento será feito via PIX.
            </p>

            <input
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 bg-black border border-white/20 rounded-lg px-4 py-3"
            />

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-lg border border-white/30"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-lg bg-green-600 text-black font-bold"
              >
                Enviar pedido
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
