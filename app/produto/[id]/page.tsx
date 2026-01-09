"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/config/products";
import { addToCart } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import FloatingCTA from "@/components/FloatingCTA";
import { motion } from "framer-motion";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const product = products.find((p) => String(p.id) === params.id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Produto não encontrado
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Botão Voltar */}
        <button
          onClick={() => router.back()}
          className="mb-10 inline-flex items-center gap-2 text-neutral-300 hover:text-white transition"
        >
          ← Voltar
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-xl"
            />
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-emerald-400 text-2xl font-semibold">
              R$ {product.price}
            </p>

            <p className="mt-8 text-neutral-300 text-lg">
              {product.description}
            </p>

            <motion.button
              onClick={() => {
                addToCart(product);
                alert("Produto adicionado ao orçamento");
              }}
              className="mt-10 bg-emerald-600 px-10 py-4 rounded-lg text-black font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(16,185,129,0.0)",
                  "0 0 30px rgba(16,185,129,0.8)",
                  "0 0 0px rgba(16,185,129,0.0)",
                ],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Adicionar ao orçamento
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Botões globais */}
      <CartDrawer />
      <FloatingCTA />
    </main>
  );
}
