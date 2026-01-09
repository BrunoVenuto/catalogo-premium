"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-neutral-950 border-t border-white/10 py-20"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-neutral-400">
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Catálogo Premium
          </h3>
          <p>
            Catálogo profissional com sistema de orçamento direto pelo WhatsApp.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Navegação</h4>
          <ul className="space-y-2">
            <li><a href="#home">Home</a></li>
            <li><a href="#collections">Coleções</a></li>
            <li><a href="#products">Produtos</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contato</h4>
          <p>Solicite seu orçamento pelo WhatsApp.</p>
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Catálogo Premium. Todos os direitos reservados.
      </div>
    </motion.footer>
  );
}
