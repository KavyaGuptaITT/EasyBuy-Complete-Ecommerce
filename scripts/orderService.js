import { storage } from "./storageService.js";
import { STRINGS } from "./strings.js";

const ORDERS_KEY = STRINGS.KEY_ORDERS;

export const orderService = {
  getOrders() {
    const orders = storage.get(ORDERS_KEY);
    return Array.isArray(orders) ? orders : [];
  },

  saveOrder(order) {
    const orders = this.getOrders();
    orders.push(order);
    storage.save(ORDERS_KEY, orders);
  },
};
