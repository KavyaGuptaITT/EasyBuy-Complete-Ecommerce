import { storage } from "./storageService.js";
import { STRINGS } from "./constantStrings.js";

const STOCK_KEY = STRINGS.KEY_STOCK;

export const stockService = {
  initializeStock(products) {
    const existing = storage.get(STOCK_KEY);
    if (existing) return;
    const initialStock = {};
    products.forEach((p) => (initialStock[p.id] = p.stock || 10));
    storage.save(STOCK_KEY, initialStock);
  },

  getStockMap() {
    return storage.get(STOCK_KEY) || {};
  },

  saveStock(map) {
    storage.save(STOCK_KEY, map);
  },

  reduceStockByOne(id) {
    const stock = this.getStockMap();
    if (stock[id] > 0) stock[id]--;
    this.saveStock(stock);
  },

  reduceStock(id, qty) {
    const stock = this.getStockMap();
    if (stock[id] >= qty) stock[id] -= qty;
    this.saveStock(stock);
  },

  increaseStockByOne(id) {
    const stock = this.getStockMap();
    stock[id]++;
    this.saveStock(stock);
  },

  increaseStock(id, qty) {
    const stock = this.getStockMap();
    stock[id] += qty;
    this.saveStock(stock);
  },
};
