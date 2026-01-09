import "./globals.css";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";

export const metadata: Metadata = {
  title: "Catálogo Premium",
  description: "Produtos de alta performance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white">
        <Header />

        {children}

        <Footer />

        {/* 🔥 TOAST GLOBAL (APARECE EM TODAS AS PÁGINAS) */}
        <CartToast />
      </body>
    </html>
  );
}
