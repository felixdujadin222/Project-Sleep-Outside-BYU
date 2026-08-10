import { setLocalStorage, updateCartCount } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Ensure local storage cart is cleared
  setLocalStorage("so-cart", []);
  
  // 2. Refresh cart badge in header to show 0
  updateCartCount();

  // 3. Generate and display confirmation metadata
  const orderRefEl = document.getElementById("order-ref");
  const orderDateEl = document.getElementById("order-date");

  if (orderRefEl) {
    // Generate a clean pseudo order reference ID
    const randomRef = Math.floor(100000 + Math.random() * 900000);
    orderRefEl.textContent = `#SO-${randomRef}`;
  }

  if (orderDateEl) {
    const today = new Date();
    orderDateEl.textContent = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
});