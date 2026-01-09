"use client";

import { useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import Collections from "@/components/Collections";
import ProductSection from "@/components/ProductSection";
import ProductModal from "@/components/ProductModal";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Product } from "@/config/products";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <main className="bg-black text-white">
      <HeroSlider />
      <Collections />
      <SocialProof />
      <ProductSection onSelectProduct={setSelectedProduct} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
      <CartDrawer />
      <FloatingCTA />
    </main>
  );
}
