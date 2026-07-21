// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// Helper function to format image paths cleanly across all subpages on GitHub Pages
export function formatImagePath(path) {
  if (!path) return "";
  // Strip relative dots (./ or ../) if present
  const cleanPath = path.replace(/^(\.\/|\.\.\/)+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const badge = document.querySelector(".cart-count");

  if (!badge) return;

  if (cart.length > 0) {
    badge.textContent = cart.length;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}