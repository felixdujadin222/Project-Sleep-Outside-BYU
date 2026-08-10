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

// Helper function to format image paths cleanly with safe base URL checks
export function formatImagePath(path) {
  if (!path) return "";
  const cleanPath = path.replace(/^(\.\/|\.\.\/)+/, "");
  
  // Safely retrieve BASE_URL or fallback to root "/"
  const rawBaseUrl = (import.meta && import.meta.env && import.meta.env.BASE_URL) || "/";
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
  const cartIcon = document.querySelector(".cart a svg, .cart svg, .cart a");
  if (cartIcon) {
    cartIcon.classList.remove("cart-animate");
    // Trigger reflow to restart CSS animation if clicked rapidly
    void cartIcon.offsetWidth; 
    cartIcon.classList.add("cart-animate");

    // Clean up class after animation ends
    setTimeout(() => {
      cartIcon.classList.remove("cart-animate");
    }, 600);
  }
}