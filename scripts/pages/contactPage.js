import { showToast } from "../../renderers/toastRenderer.js";
import { STRINGS } from "../constantStrings.js";

export function initContactPage() {
  const form = document.getElementById("contactForm");
  form.addEventListener(STRINGS.EVENT_LISTENERS.submitEvent, (e) => {
    e.preventDefault();
    showToast(STRINGS.TOAST_MESSAGE_MESSAGE_SENT);
    form.reset();
  });
}
