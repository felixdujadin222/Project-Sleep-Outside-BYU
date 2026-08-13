import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  animateCartIcon,
  formatImagePath,
} from "./utils.mjs";

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product?.Brand?.Name || "";
  document.querySelector("h3").textContent =
    product?.NameWithoutBrand || product?.Name || "";

  const productImage = document.getElementById("productImage");

  // Safely extract path across remote API (PrimaryLarge/PrimaryMedium) and local JSON schema
  const rawPath =
    product?.Images?.PrimaryLarge ||
    product?.Images?.PrimaryMedium ||
    product?.Image ||
    "";

  if (productImage) {
    productImage.src = formatImagePath(rawPath);
    productImage.alt =
      product?.NameWithoutBrand || product?.Name || "Product Image";
  }

  document.getElementById("productPrice").textContent = `$${
    product?.FinalPrice || product?.ListPrice || "0.00"
  }`;

  document.getElementById("productColor").textContent =
    product?.Colors?.[0]?.ColorName || "Default Color";

  document.getElementById("productDesc").innerHTML =
    product?.DescriptionHtmlSimple || product?.Description || "";

  const addToCartBtn = document.getElementById("addToCart");
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product?.Id || "";
  }
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details using the datasource
    this.product = await this.dataSource.findProductById(this.productId);

    // Render HTML details
    this.renderProductDetails();

    // Ensure cart badge count updates immediately on page load
    updateCartCount();

    // Bind event listener to the Add to Cart button
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    // Update superscript badge count
    updateCartCount();

    // Trigger backpack icon bounce animation
    animateCartIcon();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}