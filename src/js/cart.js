import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  formatImagePath,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Calculate total using FinalPrice
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    const cartFooter = document.querySelector(".cart-footer");
    document.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  } else {
    // Hide footer and clear list when cart is empty
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    const cartFooter = document.querySelector(".cart-footer");
    if (cartFooter) {
      cartFooter.classList.add("hide");
    }
  }

  // Keep badge count updated on changes
  updateCartCount();
}

function cartItemTemplate(item) {
  // Format image path relative to GitHub Pages base URL
  const imageSrc = formatImagePath(item.Image);

  const newItem = `<li class="cart-card divider">
  <!-- "X" button to remove item -->
  <span class="cart-card__remove" data-id="${item.Id}" title="Remove item" role="button">X</span>

  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Function to handle removing single item
function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Find index of first matching item to safely delete one instance at a time
  const itemIndex = cartItems.findIndex((item) => item.Id === id);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents(); // Re-render contents & update total
  }
}

// Set up event delegation listener on product-list
const productList = document.querySelector(".product-list");
if (productList) {
  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-card__remove")) {
      const idToRemove = e.target.getAttribute("data-id");
      removeFromCart(idToRemove);
    }
  });
}

// Initial render call
renderCartContents();