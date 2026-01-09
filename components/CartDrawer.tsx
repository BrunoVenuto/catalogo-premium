"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCart, removeFromCart } from "@/lib/cart";
import { Product } from "@/config/products";
import LeadModal from "./LeadModal";

export default function CartDrawer() {
  const [items, setItems] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  function refresh() {
    setItems(getCart());
  }

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  if (items.length === 0) return null;

  return (
    <>
      {/* BOTÃO FLUTUANTE */}
      <motion.button
        data-cart-button
        onClick={() => setOpen(true)}
        className="
          fixed z-50
          bottom-6 right-6
          bg-green-600 text-black
          px-6 py-4 rounded-full
          font-bold shadow-2xl
        "
        animate={{
          scale: [1, 1.12, 1],
          boxShadow: [
            '0 0 0px rgba(34,197,94,0)',
            '0 0 35px rgba(34,197,94,0.9)',
            '0 0 0px rgba(34,197,94,0)',
          ],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.95 }}
      >
        🛒 Orçamento ({items.length})
      </motion.button>

      {/* DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="
                w-full max-w-md h-full
                bg-neutral-950
                p-6 flex flex-col
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Seu orçamento
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-neutral-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* LISTA */}
              <div className="flex-1 overflow-auto space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex gap-4
                      border-b border-white/10
                      pb-4
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-white">
                        {item.name}
                      </p>
                      <p className="text-emerald-400 font-semibold">
                        R$ {Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(index);
                        refresh();
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div
                className="
                  mt-6 pt-4
                  border-t border-white/10
                  flex justify-between
                  text-lg font-semibold
                "
              >
                <span className="text-neutral-200">
                  Total
                </span>
                <span className="text-emerald-400">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              {/* AÇÕES */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="
                    flex-1 py-3 rounded-lg
                    border border-white/30
                    text-white
                    hover:bg-white/10
                    transition
                  "
                >
                  Voltar
                </button>

                <button
                  onClick={() => setLeadOpen(true)}
                  className="
                    flex-1 py-3 rounded-lg
                    bg-green-600 text-black
                    font-bold
                    hover:brightness-110
                    transition
                  "
                >
                  Enviar pedido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE LEAD */}
      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        mode="orcamento"
        items={items}
      />
    </>
  );
}
