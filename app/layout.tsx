import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Catálogo Premium",
  description: "Catálogo profissional com orçamento via WhatsApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-black text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}
