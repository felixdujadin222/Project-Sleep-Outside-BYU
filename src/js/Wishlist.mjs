import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Wishlist {
  constructor(key = "so-wishlist") {
    this.key = key;
  }

  // Get saved item IDs or objects
  getWishlist() {
    return getLocalStorage(this.key) || [];
  }

  // Toggle item in wishlist
  toggleItem(product) {
    let list = this.getWishlist();
    const index = list.findIndex((item) => item.Id === product.Id);

    if (index > -1) {
      list.splice(index, 1); // Remove if already exists
    } else {
      list.push(product); // Add if new
    }

    setLocalStorage(this.key, list);
    this.updateWishlistBadge();
  }

  // Check if item is in wishlist
  isWishlisted(productId) {
    const list = this.getWishlist();
    return list.some((item) => item.Id === productId);
  }

  // Update header count or icon
  updateWishlistBadge() {
    const countElement = document.querySelector(".wishlist-count");
    if (countElement) {
      const list = this.getWishlist();
      countElement.textContent = list.length;
      countElement.style.display = list.length > 0 ? "inline-block" : "none";
    }
  }
}