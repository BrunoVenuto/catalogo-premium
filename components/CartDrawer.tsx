"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCart, clearCart, removeFromCart } from "@/lib/cart";
import { siteConfig } from "@/config/site";
import LeadModalPedido from "./LeadModalPedido";
import { Product } from "@/config/products";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    function update() {
      setItems(getCart());
    }

    update();
    window.addEventListener("cart:update", update);
    return () => window.removeEventListener("cart:update", update);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  function handleConfirm(name: string) {
    const message =
      `Olá, meu nome é ${name}.\n\n` +
      `Gostaria de fazer o seguinte pedido:\n\n` +
      items
        .map(
          (item) =>
            `• ${item.name} — R$ ${Number(item.price).toFixed(2)}`
        )
        .join("\n") +
      `\n\nTotal: R$ ${total.toFixed(2)}\n\n` +
      `Pode me enviar a chave PIX para pagamento?`;

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );

    clearCart();
    setLeadOpen(false);
    setOpen(false);

    setTimeout(() => {
      router.push("/#products");
    }, 300);
  }

  // 👉 se carrinho esvaziar, fecha automaticamente
  useEffect(() => {
    if (items.length === 0) {
      setOpen(false);
    }
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* BOTÃO DO CARRINHO */}
      <button
        data-cart-button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-50
          bg-green-600 w-14 h-14 rounded-full
          flex items-center justify-center
        "
      >
        🛒
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {items.length}
        </span>
      </button>

      {/* DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
                absolute right-0 top-0 h-full w-full max-w-md
                bg-neutral-950 p-6 text-white
                flex flex-col
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Seu orçamento</h2>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>

              {/* LISTA DE PRODUTOS */}
              <div className="flex-1 space-y-4 overflow-auto">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center justify-between
                      border-b border-white/10 pb-2
                    "
                  >
                    <div>
                      <p>{item.name}</p>
                      <p className="text-green-400 text-sm">
                        R$ {Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* BOTÃO REMOVER */}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="
                        text-red-500 text-sm
                        hover:text-red-400 transition
                      "
                      aria-label="Remover produto"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* TOTAL + ENVIAR */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex justify-between font-bold mb-4">
                  <span>Total</span>
                  <span className="text-green-400">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setLeadOpen(true)}
                  className="
                    w-full bg-green-600 text-black
                    py-3 rounded-lg font-bold
                  "
                >
                  Enviar pedido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE PEDIDO (PIX) */}
      <LeadModalPedido
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
