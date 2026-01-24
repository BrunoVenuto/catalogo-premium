export const siteConfig = {
  name: "Strong Suplementos",

  // 📦 Número para RECEBER PEDIDOS (somente dígitos: 55 + DDD + número)
  whatsappPedido: "5521999226564", // <-- troque pelo SEU número real de pedidos

  // 💬 Número para CONSULTORIA (Paraguai): +595 976 349138
  // wa.me exige somente dígitos:
  whatsappConsultoria: "595976349138",

  // ✅ compatibilidade: se algum lugar do projeto ainda usa siteConfig.whatsapp
  // apontamos para o número de PEDIDOS
  whatsapp: "5521999226564",

  whatsappMessage:
    "Olá! Eu vim do seu site e gostaria de fazer um pedido com os seguintes itens:",
  consultoriaMessage:
    "Olá, preciso de uma consultoria antes de fazer meu pedido.",

  hero: {
    title: "Resultados extremos para quem treina no limite",
    subtitle:
      "Produtos de alta qualidade, atendimento especializado e entrega garantida.",
    cta: "Ver produtos",

    imageDesktop: "/images/logo-desktop.jpg",
    imageMobile: "/images/logo-mobile.jpg",
  },

  menu: [
    { label: "Home", href: "#home" },
    { label: "Coleções", href: "#collections" },
    { label: "Produtos", href: "#products" },
    { label: "Contato", href: "#contact" },
  ],
};
