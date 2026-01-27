import { cartService } from "../cartService.js";
import { orderService } from "../orderService.js";
import { stockService } from "../stockService.js";
import { showToast } from "../../renderers/toastRenderer.js";

export function initCheckoutPage() {
  const container = document.getElementById("checkoutContainer");
  
  const cart = cartService.getCart();

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  container.innerHTML = `
    <form id="checkoutForm">
      <label>Full Name</label>
      <input type="text" id="fullName" required>

      <label>Address</label>
      <textarea id="address" required></textarea>

      <label>Phone Number</label>
      <input type="text" id="phone" required>

      <button class="primary-btn" type="submit">Place Order</button>
    </form>
  `;

  const form = document.getElementById("checkoutForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    const now = new Date();
    const order = {
      id: Date.now(),
      items: cart,
      total,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    orderService.saveOrder(order);
    cartService.clearCart();

    showToast("Order placed successfully!", "success");

    setTimeout(() => {
      window.location.href = "orders.html";
    }, 800);
  });
}
