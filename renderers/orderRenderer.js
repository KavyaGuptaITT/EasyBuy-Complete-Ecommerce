export function renderOrders(orders, container) {
  container.innerHTML = "";

  if (!orders || orders.length === 0) {
    container.innerHTML = `<p class="empty-cart-message">No orders placed yet.</p>`;
    return;
  }
  orders
    .slice()
    .reverse()
    .forEach((order) => {
      const card = document.createElement("div");
      card.className = "order-card";
      let itemsHTML = "";
      order.items.forEach((item) => {
        itemsHTML += `
        <div class="order-item">
          <img src="${item.image}">
          <p>${item.name} × ${item.quantity}</p>
        </div>
      `;
      });
      card.innerHTML = `
      <h3>Order #${order.id}</h3>
      <p><strong>Date:</strong> ${order.date} • ${order.time}</p>

      <div class="order-items-box">${itemsHTML}</div>

      <p class="order-total"><strong>Total Paid:</strong> ₹${order.total}</p>
    `;
      container.appendChild(card);
    });
}
