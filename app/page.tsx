import { Suspense } from "react";

import HeroSlider from "@/components/HeroSlider";
import Collections from "@/components/Collections";
import SocialProof from "@/components/SocialProof";
import ProductSection from "@/components/ProductSection";
import CartDrawer from "@/components/CartDrawer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Collections />
      <SocialProof />

      {/* 🔴 IMPORTANTE: Suspense aqui */}
      <Suspense fallback={null}>
        <ProductSection />
      </Suspense>

      <CartDrawer />
      <FloatingCTA />
    </>
  );
}
