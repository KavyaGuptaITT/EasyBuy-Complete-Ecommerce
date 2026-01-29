import { STRINGS } from "../scripts/constantStrings";
export function renderFullCart(cart, container) {
  container.innerHTML = STRINGS.EMPTY_STRING;
  if (!cart || cart.length === 0) {
    container.innerHTML =
      "<p class='empty-cart-message'>Your cart is empty.</p>";
    return;
  }
  cart.forEach((item) => {
    const div = document.createElement(STRINGS.ELEMENTS.div);
    div.className = "cart-item-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      </div>
      <div class="cart-item-actions">    
        <div class="qty-box">
          <span class="qty-display">QTY : ${item.quantity}</span>
        </div>
        <button class="remove-btn" data-remove="${item.id}">
          Remove
        </button>
      </div>
    `;
    container.appendChild(div);
  });
}
