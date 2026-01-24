"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (name: string, city: string, phone: string) => void;
};

export default function LeadModalPedido({ open, onClose, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  function handleNameChange(value: string) {
    // aceita apenas letras, espaços e acentos
    const sanitized = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setName(sanitized);
  }

  function handleCityChange(value: string) {
    // cidade: letras, espaços, acentos, hífen (ex: Rio de Janeiro, Belo-Horizonte)
    const sanitized = value.replace(/[^a-zA-ZÀ-ÿ\s-]/g, "");
    setCity(sanitized);
  }

  function handlePhoneChange(value: string) {
    // mantém só dígitos (DDD + número)
    const digitsOnly = value.replace(/\D/g, "");
    setPhone(digitsOnly);
  }

  function handleConfirm() {
    const finalName = name.trim();
    const finalCity = city.trim();
    const finalPhone = phone.trim();

    // validações simples (DDD+cel normalmente 10 ou 11 dígitos no BR)
    if (!finalName) return;
    if (!finalCity) return;
    if (finalPhone.length < 10) return;

    onConfirm(finalName, finalCity, finalPhone);

    setName("");
    setCity("");
    setPhone("");
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
            <h2 className="text-xl font-bold mb-4">Antes de enviar o pedido</h2>

            <p className="text-neutral-300 mb-4 text-sm">
              Preencha seus dados para identificação e cálculo de frete/entrega.
            </p>

            <input
              type="text"
              inputMode="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full mb-3 bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:border-green-500"
            />

            <input
              type="text"
              inputMode="text"
              placeholder="Sua cidade (ex: Belo Horizonte)"
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full mb-3 bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:border-green-500"
            />

            <input
              type="tel"
              inputMode="tel"
              placeholder="Seu WhatsApp com DDD (ex: 31999999999)"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className="w-full mb-4 bg-black border border-white/20 rounded-lg px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:border-green-500"
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
                className="flex-1 py-3 rounded-lg bg-green-600 text-black font-bold hover:brightness-110"
              >
                Enviar pedido
              </button>
            </div>

            <p className="text-xs text-neutral-400 mt-3">
              *O telefone será usado apenas para facilitar o contato/entrega.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
