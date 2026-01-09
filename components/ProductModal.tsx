"use client";

import { Product } from "@/config/products";
import { addToCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  if (!product) return null;

  function handleAdd() {
    addToCart(product);
    alert("Produto adicionado ao orçamento");
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-neutral-900 max-w-3xl w-full rounded-xl overflow-hidden grid md:grid-cols-2"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <div className="p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="mt-2 text-emerald-400 text-xl font-semibold">
              R$ {product.price}
            </p>

            <p className="mt-6 text-neutral-300">
              {product.description}
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAdd}
                className="flex-1 bg-emerald-600 py-4 rounded-lg text-black font-semibold hover:brightness-110 transition"
              >
                Adicionar ao orçamento
              </button>

              <Link
                href={`/produto/${product.id}`}
                className="flex-1 border border-white/20 py-4 rounded-lg text-center hover:border-white"
              >
                Ver detalhes
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
