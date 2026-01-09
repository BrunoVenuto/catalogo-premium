"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  mode: "consultoria" | "orcamento";
  items?: { name: string; price: number }[];
}

export default function LeadModal({
  open,
  onClose,
  mode,
  items = [],
}: LeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("Ganho de massa");

  function handleSubmit() {
    if (!name || !phone) {
      alert("Preencha nome e WhatsApp");
      return;
    }

    let message = "";

    if (mode === "consultoria") {
      message = `Olá! Meu nome é ${name}. Meu WhatsApp é ${phone}. Quero uma consultoria. Meu objetivo é: ${goal}.`;
    } else {
      let total = 0;
      let list = "";

      items.forEach((item) => {
        total += Number(item.price);
        list += `• ${item.name} - R$ ${item.price}\n`;
      });

      message =
        `Olá! Meu nome é ${name}. Meu WhatsApp é ${phone}.\n\n` +
        `Quero fazer um pedido com os seguintes itens:\n${list}\n` +
        `Total: R$ ${total.toFixed(2)}\n\n` +
        `Pode me enviar a chave PIX para pagamento?`;
    }

    const link = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
      message
    )}`;

    window.open(link, "_blank");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="
              w-full max-w-md rounded-2xl p-6
              bg-neutral-900
              border border-white/20
              shadow-2xl
            "
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
          >
            {/* TÍTULO */}
            <h2 className="text-xl font-bold mb-2 text-white">
              Quase lá 💪
            </h2>
            <p className="text-neutral-300 mb-6">
              Preencha seus dados para continuarmos:
            </p>

            {/* FORM */}
            <div className="space-y-4">
              <input
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-neutral-800
                  border border-white/20
                  text-white
                  placeholder:text-neutral-400
                  focus:outline-none focus:border-yellow-400
                "
              />

              <input
                placeholder="Seu WhatsApp"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-neutral-800
                  border border-white/20
                  text-white
                  placeholder:text-neutral-400
                  focus:outline-none focus:border-yellow-400
                "
              />

              {mode === "consultoria" && (
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="
                    w-full px-4 py-3 rounded-lg
                    bg-neutral-800
                    border border-white/20
                    text-white
                    focus:outline-none focus:border-yellow-400
                  "
                >
                  <option>Ganho de massa</option>
                  <option>Definição</option>
                  <option>Performance</option>
                  <option>Outro</option>
                </select>
              )}
            </div>

            {/* BOTÕES */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={onClose}
                className="
                  flex-1 py-3 rounded-lg
                  border border-white/30
                  text-white
                  hover:bg-white/10 transition
                "
              >
                Voltar
              </button>

              <button
                onClick={handleSubmit}
                className="
                  flex-1 py-3 rounded-lg
                  bg-green-600 text-black
                  font-bold
                  hover:brightness-110 transition
                "
              >
                Continuar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
