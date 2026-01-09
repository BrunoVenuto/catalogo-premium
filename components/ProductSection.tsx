"use client";

import { useEffect, useState } from "react";
import { products, Product } from "@/config/products";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import { useSearchParams } from "next/navigation";

export default function ProductSection() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("Todos");
    }
  }, [categoryFromUrl]);

  const filtered =
    (activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory)
    ).filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <section id="products" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Produtos
        </h2>

        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full md:w-96 px-4 py-3 rounded-lg bg-neutral-900 border border-white/10"
        />

        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mt-12">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
