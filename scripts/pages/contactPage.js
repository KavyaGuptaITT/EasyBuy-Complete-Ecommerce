import { showToast } from "../../renderers/toastRenderer.js";

export function initContactPage() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    showToast("Message Sent Successfully!", "success");

    form.reset();
  });
}
