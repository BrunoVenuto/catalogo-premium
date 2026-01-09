import { Product } from "@/config/products";

const KEY = "cart";

export function getCart(): Product[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function addToCart(product: Product) {
  const cart = getCart();
  cart.push(product);
  localStorage.setItem(KEY, JSON.stringify(cart));

  // 🔥 dispara evento customizado (sem alert)
  window.dispatchEvent(new Event("cart:add"));
}

export function removeFromCart(index: number) {
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart:remove"));
}
