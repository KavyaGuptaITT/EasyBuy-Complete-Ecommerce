import { products } from "../productDetails.js";
import { getQueryParam } from "../utils.js";
import { STRINGS } from "../constantStrings.js";
import { stockService } from "../stockService.js";
import { cartService } from "../cartService.js";
import { showToast } from "../../renderers/toastRenderer.js";

export function initProductPage() {
  const id = Number(getQueryParam("id"));
  const product = products.find((p) => p.id === id);
  const container = document.getElementById("productDetailContainer");
  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }
  const stock = stockService.getStockMap()[id];
  container.innerHTML = `
    <div class="product-detail-card">
      <img src="${product.image}" class="product-detail-img">
      <div class="product-detail-info">
        <h2>${product.name}</h2>
        <p class="product-detail-price">₹${product.price}</p>
        <p class="product-detail-stock">Available Stock: ${stock}</p>
        <button 
          id="addSingleCartBtn"
          class="primary-btn"
          ${stock <= 0 ? "disabled" : STRINGS.EMPTY_STRING}
        >
          ${stock <= 0 ? "Out of Stock" : STRINGS.BTN_ADD_TO_CART}
        </button>
      </div>
    </div>
  `;
  document
    .getElementById("addSingleCartBtn")
    .addEventListener(STRINGS.EVENT_LISTENERS.clickEvent, () => {
      cartService.addToCart(id);
      stockService.reduceStockByOne(id);
      showToast(STRINGS.TOAST_MESSAGE_ADDED_TO_CART);
      location.reload();
    });
}
