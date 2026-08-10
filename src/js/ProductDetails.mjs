import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  animateCartIcon,
} from "./utils.mjs";

// Helper function to format image paths cleanly for GitHub Pages
function formatImagePath(path) {
  if (!path) return "";
  // Strip relative dots (./ or ../) if present
  const cleanPath = path.replace(/^(\.\/|\.\.\/)+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = formatImagePath(product.Image);
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;
  document.getElementById("productColor").textContent =
    product.Colors?.[0]?.ColorName || "Default Color";
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
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

    // Bind event listener to the Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
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