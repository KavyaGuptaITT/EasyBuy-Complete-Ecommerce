import { storage } from "./storageService.js";
import { STRINGS } from "./constantStrings.js";
import { products } from "./productDetails.js";

const CART_KEY = STRINGS.KEY_CART;

export const cartService = {
  getCart() {
    return storage.get(CART_KEY) || [];
  },

  saveCart(cart) {
    storage.save(CART_KEY, cart);
  },

  addToCart(id) {
    const cart = this.getCart();
    const existing = cart.find((i) => i.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      const product = products.find((p) => p.id === id);
      cart.push({ ...product, quantity: 1 });
    }
    this.saveCart(cart);
  },

  updateQuantity(id, qty) {
    const cart = this.getCart();
    const item = cart.find((i) => i.id === id);
    if (item) item.quantity = qty;
    this.saveCart(cart);
  },

  removeItem(id) {
    let cart = this.getCart();
    cart = cart.filter((i) => i.id !== id);
    this.saveCart(cart);
  },

  clearCart() {
    storage.save(CART_KEY, []);
  },
};
