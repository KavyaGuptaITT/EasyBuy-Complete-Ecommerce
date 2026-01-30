export function showToast(message, type = "success") {
  const toastContainerId = "toast-container";
  let container = document.getElementById(toastContainerId);
  if (!container) {
    container = document.createElement(STRINGS.ELEMENTS.div);
    container.id = toastContainerId;
    container.className = "toast-container position-fixed top-0 end-0 p-3";
    document.body.appendChild(container);
  }
  const toast = document.createElement(STRINGS.ELEMENTS.div);
  toast.className = `toast align-items-center text-bg-${type} border-0 show`;
  toast.role = "alert";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"></button>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 1000);
}
