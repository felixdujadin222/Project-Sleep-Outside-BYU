// Wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage safely
export function getLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return [];
  }
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// Get the parameter from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Helper function to format image paths cleanly across local JSON and remote backend API
export function formatImagePath(path) {
  if (!path) return "";

  // Return absolute external URLs as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Strip all leading slashes, dot-slashes, and dot-dot-slashes
  const cleanPath = path.replace(/^(\.\/|\.\.\/|\/)+/, "");

  // Safely retrieve BASE_URL or fallback to root "/"
  const rawBaseUrl =
    (import.meta && import.meta.env && import.meta.env.BASE_URL) || "/";
  const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl : `${rawBaseUrl}/`;

  return `${baseUrl}${cleanPath}`;
}

// Render list items using a provided template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (!parentElement || !Array.isArray(list)) return;

  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Update superscript cart badge count (supports both item counts and item quantities)
export function updateCartCount() {
  const cart = getLocalStorage("so-cart");
  const badge = document.querySelector(".cart-count");

  if (!badge) return;

  const totalCount = cart.reduce((sum, item) => sum + (item.Quantity || 1), 0);

  if (totalCount > 0) {
    badge.textContent = totalCount;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

// Remove alert banners
export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => alert.remove());
}

// Display alert banner at top of main
export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.querySelector("span").addEventListener("click", () => {
    alert.remove();
  });

  const main = document.querySelector("main");
  if (main) main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}

// Trigger backpack icon bounce animation
export function animateCartIcon() {
  const cartIcon =
    document.querySelector(".cart a") ||
    document.querySelector(".cart svg") ||
    document.querySelector(".cart");

  if (cartIcon) {
    // Reset state
    cartIcon.classList.remove("cart-animate");

    // Force DOM reflow to restart CSS animation keyframes
    void cartIcon.offsetWidth;

    // Apply animation class
    cartIcon.classList.add("cart-animate");

    // Clean up animation class after 600ms matching CSS transition
    setTimeout(() => {
      cartIcon.classList.remove("cart-animate");
    }, 600);
  }
}

// API #2: Frankfurter Currency Exchange API (Secondary External API)
export async function getCurrencyRate(targetCurrency = "EUR") {
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=USD&to=${targetCurrency}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.rates[targetCurrency];
    } else {
      throw new Error("Failed to fetch rate");
    }
  } catch (error) {
    console.error("Secondary API Error:", error);
    return 1; // Fallback 1:1 rate if offline
  }
}