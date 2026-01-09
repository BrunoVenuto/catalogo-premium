"use client";

import { Product } from "@/config/products";
import { motion } from "framer-motion";

export default function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="cursor-pointer bg-neutral-900 border border-white/10 p-4 rounded-lg hover:border-white/30 transition"
    >
      <div className="overflow-hidden rounded-lg">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <h3 className="mt-4 font-medium">{product.name}</h3>
      <p className="text-emerald-400 font-bold">R$ {product.price}</p>
    </motion.div>
  );
}
