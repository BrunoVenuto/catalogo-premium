import { Product } from "@/config/products";

export function getCart(): Product[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function saveCart(cart: Product[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product: Product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
}

export function removeFromCart(index: number) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}
