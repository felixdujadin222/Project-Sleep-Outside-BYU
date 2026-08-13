import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

// Back button handler using history API with fallback
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

// add to cart button event handler
//async function addToCartHandler(e) {
//  const product = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(product);
//}

// add listener to Add to Cart button
const addToCartBtn = document.getElementById("addToCart");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", (e) => {
    // Add bounce class
    e.target.classList.add("bounce");

    // Remove class after animation finishes so it can trigger again
    setTimeout(() => {
      e.target.classList.remove("bounce");
    }, 600);
  });
}
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);
