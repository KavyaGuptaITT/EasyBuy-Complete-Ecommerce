import { orderService } from "../orderService.js";
import { renderOrders } from "../../renderers/orderRenderer.js";

export function initOrdersPage() {
  const container = document.getElementById("ordersContainer");
  const orders = orderService.getOrders();
  renderOrders(orders, container);
}
