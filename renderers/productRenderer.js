import { STRINGS } from "../scripts/constantStrings.js";
import { stockService } from "../scripts/stockService.js";

export function renderProducts(list, container) {
  container.innerHTML = STRINGS.EMPTY_STRING;
  const stockMap = stockService.getStockMap();
  if (!list || list.length === 0) {
    container.innerHTML = `<p class="no-products">No products found.</p>`;
    return;
  }
  list.forEach((product) => {
    const currentStock = stockMap[product.id];
    const div = document.createElement(STRINGS.ELEMENTS.div);
    div.className = "product";
    div.innerHTML = `
      <!-- Stock Badge -->
      <span class="stock-badge" id="stock-${product.id}">
        Stock: ${currentStock}
      </span>
      <!-- Product Image -->
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button 
          class="add-cart-btn"
          data-id="${product.id}"
          ${currentStock <= 0 ? "disabled" : STRINGS.EMPTY_STRING}
        >
          ${currentStock <= 0 ? "Out of Stock" : STRINGS.BTN_ADD_TO_CART}
        </button>
        <button onclick="window.location.href='product.html?id=${product.id}'">
          View Details
        </button>
      </div>
    `;
    container.appendChild(div);
  });
}
