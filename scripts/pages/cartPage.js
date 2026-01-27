import { cartService } from "../cartService.js";
import { stockService } from "../stockService.js";
import { renderFullCart } from "../../renderers/cartRenderer.js";
import { showToast } from "../../renderers/toastRenderer.js";

export function initCartPage() {
  const container = document.getElementById("fullCartContainer");
  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  renderEverything();

  function renderEverything() {
    const cart = cartService.getCart();
    renderFullCart(cart, container);
    updateTotal(cart);
  }

  function updateTotal(cart) {
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    totalEl.textContent = `Total: ₹${total}`;
  }

  container.addEventListener("input", (e) => {
    if (e.target.classList.contains("cart-qty-input")) {
      const id = Number(e.target.dataset.id);
      const qty = Number(e.target.value);

      const cart = cartService.getCart();
      const item = cart.find((i) => i.id === id);

      if (!item) return;

      const prevQty = item.quantity;
      const diff = qty - prevQty;

      if (diff > 0) stockService.reduceStock(id, diff);
      else stockService.increaseStock(id, Math.abs(diff));

      cartService.updateQuantity(id, qty);

      renderEverything();
    }
  });

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = Number(e.target.dataset.remove);

      const cart = cartService.getCart();
      const item = cart.find((i) => i.id === id);

      stockService.increaseStock(id, item.quantity);

      cartService.removeItem(id);

      showToast("Item removed", "warning");
      renderEverything();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
}
