import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Wishlist from "./Wishlist.mjs";
import { updateCartCount } from "./utils.mjs";

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);
const wishlist = new Wishlist();

// Helper to update active heart states on product cards
function syncWishlistButtons() {
  const buttons = document.querySelectorAll(".wishlist-btn");
  buttons.forEach((btn) => {
    const isSaved = wishlist.isWishlisted(btn.dataset.id);
    btn.textContent = isSaved ? "♥" : "♡";
    btn.style.color = isSaved ? "red" : "black";
  });
}

async function initApp() {
  // 1. Initial renders
  wishlist.updateWishlistBadge();
  updateCartCount();
  
  // 2. Fetch and render products
  await productList.init();
  syncWishlistButtons();
}

initApp();

// Search Filtering
const searchInput = document.getElementById("product-search");
if (searchInput) {
  searchInput.addEventListener(
    "input",
    debounce((e) => {
      productList.filterList(e.target.value);
      syncWishlistButtons(); // Re-sync hearts when search changes rendered list
    }, 250)
  );
}

// Event Delegation for Wishlist Heart Clicks
if (listElement) {
  listElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("wishlist-btn")) {
      e.preventDefault();
      const productId = e.target.dataset.id;
      
      // Save/Remove from LocalStorage
      wishlist.toggleItem({ Id: productId });
      
      // Update UI state
      const isSaved = wishlist.isWishlisted(productId);
      e.target.textContent = isSaved ? "♥" : "♡";
      e.target.style.color = isSaved ? "red" : "black";
    }
  });
}

export function animateCartIcon() {
  // Target the cart container from your header layout
  const cartIcon = document.querySelector(".cart a") || document.querySelector(".cart");

  if (!cartIcon) return;

  // Add the animation class
  cartIcon.classList.add("cart-animate");

  // Remove class after 500ms so it can trigger again on subsequent clicks
  setTimeout(() => {
    cartIcon.classList.remove("cart-animate");
  }, 500);
}