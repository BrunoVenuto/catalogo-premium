"use client";

import { useEffect, useState } from "react";
import LeadModalConsultoria from "./LeadModalConsultoria";
import { siteConfig } from "@/config/site";

export default function ConsultoriaController() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function openModal() {
      setOpen(true);
    }

    window.addEventListener("open-consultoria", openModal);
    return () => {
      window.removeEventListener("open-consultoria", openModal);
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
    <LeadModalConsultoria
      open={open}
      onClose={() => setOpen(false)}
      onSubmit={handleSubmit}
    />
  );
}
