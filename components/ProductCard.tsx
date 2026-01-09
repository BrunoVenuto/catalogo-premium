"use client";

import { Product } from "@/config/products";
import { addToCart } from "@/lib/cart";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="
        bg-neutral-900
        border border-white/10
        rounded-xl
        overflow-hidden
        transition
        hover:border-yellow-400/40
      "
    >
      {/* IMAGEM → PÁGINA DO PRODUTO */}
      <Link href={`/produto/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </Link>

      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2">
          {product.name}
        </h3>

        <p className="text-emerald-400 font-bold mb-4">
          R$ {Number(product.price).toFixed(2)}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="
            w-full
            bg-green-600
            text-black
            py-3 rounded-lg
            font-bold
            hover:brightness-110 transition
          "
        >
          Adicionar ao orçamento
        </button>
      </div>
    </motion.div>
  );
}
