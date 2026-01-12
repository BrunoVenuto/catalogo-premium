"use client";

import { useState } from "react";
import { products, Product } from "@/config/products";
import { addToCart } from "@/lib/cart";

import ProductCard from "./ProductCard";
import CategoryCarousel from "./CategoryCarousel";

export default function ProductSection() {
  const categories: string[] = [
    "Todos",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = products
    .filter((p) =>
      activeCategory === "Todos" ? true : p.category === activeCategory
    )
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <section id="products" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">
          Produtos
        </h2>

        {/* BUSCA */}
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            mb-8 w-full md:w-96 px-4 py-3 rounded-lg
            bg-neutral-900 text-white
            border border-neutral-700
            focus:outline-none focus:border-yellow-400
          "
        />

        {/* CATEGORIAS (APENAS UMA VEZ) */}
        <CategoryCarousel
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        {/* GRID DE PRODUTOS */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mt-10">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={() => addToCart(p)}
              onOpen={() => setSelectedProduct(p)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
