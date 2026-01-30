import { products } from "../productDetails.js";
import { STRINGS } from "../constantStrings.js";
import { stockService } from "../stockService.js";
import { cartService } from "../cartService.js";
import { weatherService } from "../weatherService.js";
import { renderProducts } from "../../renderers/productRenderer.js";
import { renderWeather } from "../../renderers/weatherRenderer.js";
import { showToast } from "../../renderers/toastRenderer.js";
import { debounce } from "../utils.js";

export function initHome() {
  const productContainer = document.getElementById("productContainer");
  const filterContainer = document.getElementById("filterContainer");
  const searchInput = document.getElementById("searchInput");
  const cartBtn = document.getElementById("cartBtn");

  stockService.initializeStock(products);

  renderProducts(products, productContainer);
  updateCartCount();

  weatherService.getWeather().then((data) => renderWeather(data.temp));

  cartBtn.addEventListener(STRINGS.EVENT_LISTENERS.clickEvent, () => {
    window.location.href = "cart.html";
  });

  loadFilters();

  function loadFilters() {
    filterContainer.innerHTML = STRINGS.EMPTY_STRING;

    const allBtn = document.createElement(STRINGS.ELEMENTS.button);
    allBtn.textContent = STRINGS.FILTER_ALL;
    allBtn.dataset.category = "all";
    filterContainer.appendChild(allBtn);

    for (const cat in STRINGS.CATEGORIES_MAP) {
      const btn = document.createElement(STRINGS.ELEMENTS.button);
      btn.dataset.category = cat;
      btn.textContent = STRINGS.CATEGORIES_MAP[cat];
      filterContainer.appendChild(btn);
    }

    filterContainer.addEventListener(
      STRINGS.EVENT_LISTENERS.clickEvent,(e) => {
        if (e.target.tagName !== "BUTTON") return;
        const cat = e.target.dataset.category;
        let filtered = products;
        if (cat !== "all") {
          filtered = products.filter((p) => p.category === cat);
        }
        renderProducts(filtered, productContainer);
      },
    );
  }

  searchInput.addEventListener(
    STRINGS.EVENT_LISTENERS.inputEvent,debounce(() => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(keyword),
      );
      renderProducts(filtered, productContainer);
    }, 300),
  );

  productContainer.addEventListener(STRINGS.EVENT_LISTENERS.clickEvent, (e) => {
    if (!e.target.classList.contains("add-cart-btn")) return;

    const id = Number(e.target.dataset.id);
    const stock = stockService.getStockMap()[id];

    if (stock <= 0) {
      showToast(STRINGS.TOAST_MESSAGE_ITEM_REMOVED,STRINGS.TOAST_TYPE_DANGER);
      return;
    }

    cartService.addToCart(id);
    stockService.reduceStockByOne(id);

    updateCartCount();
    rerenderAfterStockChange();
    showToast(STRINGS.TOAST_MESSAGE_ADDED_TO_CART);
  });

  function rerenderAfterStockChange() {
    const keyword = searchInput.value.toLowerCase();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(keyword),
    );
    renderProducts(filtered, productContainer);
  }

  function updateCartCount() {
    const cart = cartService.getCart();
    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.getElementById("cartCount").textContent = count;
  }
}
