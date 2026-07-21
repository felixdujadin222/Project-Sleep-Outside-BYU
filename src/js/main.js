import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
// 1. Import the utility function
import { updateCartCount } from "./utils.mjs";

// Utility: Debounce helper to prevent rapid re-renders on keystrokes
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

productList.init();

// 2. Run the function to update the badge count on load
updateCartCount();

// 3. Hook up Search Input for real-time filtering
const searchInput = document.getElementById("product-search");
if (searchInput) {
  searchInput.addEventListener(
    "input",
    debounce((e) => {
      productList.filterList(e.target.value);
    }, 250)
  );
}