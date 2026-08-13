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

    // Calculate total using FinalPrice multiplied by quantity
    const total = cartItems.reduce((sum, item) => {
      const qty = item.Quantity || 1;
      return sum + item.FinalPrice * qty;
    }, 0);

    const cartFooter = document.querySelector(".cart-footer");
    const cartTotalEl = document.querySelector(".cart-total");
    if (cartTotalEl) {
      cartTotalEl.innerHTML = `Total: $${total.toFixed(2)}`;
    }
    if (cartFooter) {
      cartFooter.classList.remove("hide");
    }
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
  // Extract image path cleanly across API schema variations (PrimaryMedium/PrimaryLarge or Image)
  const rawImagePath =
    item.Images?.PrimaryMedium ||
    item.Images?.PrimaryLarge ||
    item.Image ||
    "";

  // Format image path relative to root or base URL
  const imageSrc = formatImagePath(rawImagePath);
  const qty = item.Quantity || 1;
  const colorName = item.Colors?.[0]?.ColorName || "Default Color";

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
  <p class="cart-card__color">${colorName}</p>
  <p class="cart-card__quantity">qty: ${qty}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Function to handle removing single item instance or decrementing quantity
function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];

  const itemIndex = cartItems.findIndex((item) => item.Id === id);

  if (itemIndex !== -1) {
    if (cartItems[itemIndex].Quantity && cartItems[itemIndex].Quantity > 1) {
      cartItems[itemIndex].Quantity -= 1;
    } else {
      cartItems.splice(itemIndex, 1);
    }

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

// Back button event listener
const backBtn = document.getElementById("backBtn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (document.referrer && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "../index.html";
    }
  });
}