"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCart, clearCart, removeFromCart } from "@/lib/cart";
import LeadModalPedido from "./LeadModalPedido";
import LeadModalConsultoria from "./LeadModalConsultoria";
import { Product } from "@/config/products";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [pedidoOpen, setPedidoOpen] = useState(false);
  const [consultoriaOpen, setConsultoriaOpen] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const router = useRouter();

  // ✅ Sempre usar só dígitos no wa.me (evita erro de número inválido)
  const whatsappTo = useMemo(() => {
    return String(siteConfig.whatsapp || "").replace(/\D/g, "");
  }, []);

  useEffect(() => {
    function update() {
      setItems(getCart());
    }

    update();
    window.addEventListener("cart:update", update);
    window.addEventListener("cart:add", update);

    return () => {
      window.removeEventListener("cart:update", update);
      window.removeEventListener("cart:add", update);
    };
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.price), 0);
  }, [items]);

  function openWhatsApp(message: string) {
    // Regra prática: BR completo costuma ter 12 ou 13 dígitos (55 + DDD + número)
    if (!whatsappTo || whatsappTo.length < 12) {
      console.error(
        "Número do WhatsApp inválido em siteConfig.whatsapp. Use apenas dígitos no formato 55DDDNUMERO. Ex: 5531999999999"
      );
      alert(
        "Número do WhatsApp está inválido no site. Corrija em config/site.ts (formato: 55DDDNUMERO)."
      );
      return;
    }

    window.open(
      `https://wa.me/${whatsappTo}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  function handleRemove(index: number) {
    removeFromCart(index);
    // ✅ Atualiza o estado imediatamente (não depende do evento)
    setItems(getCart());
  }

  function handleClear() {
    clearCart();
    setItems([]);
  }

  // ✅ AGORA RECEBE: nome, cidade, whatsapp com DDD
  function handleConfirmPedido(name: string, city: string, phone: string) {
    const productsText = items
      .map((item) => `• ${item.name} — R$ ${Number(item.price).toFixed(2)}`)
      .join("\n");

    const message =
      `NOVO PEDIDO\n\n` +
      `Nome do cliente: ${name}\n` +
      `Cidade: ${city}\n` +
      `WhatsApp (DDD): ${phone}\n\n` +
      `Produtos:\n${productsText}\n\n` +
      `Total: R$ ${total.toFixed(2)}\n\n` +
      `Por favor, me envie a chave PIX para pagamento.`;

    openWhatsApp(message);

    handleClear();
    setPedidoOpen(false);
    setOpen(false);

    setTimeout(() => {
      router.push("/#products");
    }, 300);
  }

  function handleConsultoriaSubmit(data: {
    name: string;
    phone: string;
    goal: string;
  }) {
    const message =
      `Olá, meu nome é ${data.name}.\n` +
      `Telefone: ${data.phone}\n` +
      `Objetivo: ${data.goal}\n\n` +
      `Gostaria de uma consultoria antes de fazer meu pedido.`;

    openWhatsApp(message);
    setConsultoriaOpen(false);
  }

  // mantém o comportamento original: se carrinho vazio, não mostra o botão
  if (items.length === 0) return null;

  return (
    <>
      {/* BOTÃO DO CARRINHO */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 w-14 h-14 rounded-full flex items-center justify-center"
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
              className="absolute right-0 top-0 h-full w-full max-w-md bg-neutral-950 p-6 text-white flex flex-col"
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

              <div className="flex-1 space-y-4 overflow-auto">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-white/10 pb-2"
                  >
                    <div>
                      <p>{item.name}</p>
                      <p className="text-green-400 text-sm">
                        R$ {Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 space-y-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-400">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setPedidoOpen(true)}
                  className="w-full bg-green-600 py-3 rounded-lg font-bold text-black"
                >
                  Enviar pedido
                </button>

                <button
                  onClick={() => setConsultoriaOpen(true)}
                  className="w-full bg-yellow-400 py-3 rounded-lg font-bold text-black"
                >
                  💬 Solicitar consultoria
                </button>

                <button
                  onClick={handleClear}
                  className="w-full border border-white/20 py-3 rounded-lg font-bold"
                >
                  Limpar carrinho
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAIS */}
      <LeadModalPedido
        open={pedidoOpen}
        onClose={() => setPedidoOpen(false)}
        onConfirm={handleConfirmPedido}
      />

      <LeadModalConsultoria
        open={consultoriaOpen}
        onClose={() => setConsultoriaOpen(false)}
        onSubmit={handleConsultoriaSubmit}
      />
    </>
  );
}
