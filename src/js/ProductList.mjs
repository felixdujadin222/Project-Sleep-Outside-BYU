import { renderListWithTemplate, formatImagePath } from "./utils.mjs";

function productCardTemplate(product) {
  // Safely extract image path across both local JSON and remote API structures
  const rawImagePath =
    product?.Images?.PrimaryMedium ||
    product?.Image ||
    "images/tents/marmot-ajax-tent-3-person-in-gold-sunflower~p~880rr_100.webp";

  const imageSrc = formatImagePath(rawImagePath);

  return `<li class="product-card" style="position: relative;">
    <button 
      class="wishlist-btn" 
      data-id="${product?.Id || ""}" 
      aria-label="Save to Wishlist"
      style="position: absolute; top: 10px; right: 10px; background: white; border: 1px solid #ddd; border-radius: 50%; width: 36px; height: 36px; font-size: 1.2rem; cursor: pointer; z-index: 5; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
    >
      ♡
    </button>
    <a href="${import.meta.env.BASE_URL}product_pages/index.html?product=${product?.Id}">
      <img src="${imageSrc}" alt="Image of ${product?.Name || "Product"}">
      <h3 class="card__brand">${product?.Brand?.Name || ""}</h3>
      <h2 class="card__name">${product?.NameWithoutBrand || product?.Name || ""}</h2>
      <p class="product-card__price">$${product?.FinalPrice || product?.ListPrice || "0.00"}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.list = [];
  }

  async init() {
    // Pass category parameter if dataSource expects it
    const list = await this.dataSource.getData(this.category);
    this.list = list || [];
    this.renderList(this.list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }

  filterList(query) {
    const cleanQuery = query.toLowerCase().trim();
    const filtered = this.list.filter((product) => {
      const nameMatch = product.Name?.toLowerCase().includes(cleanQuery);
      const brandMatch = product.Brand?.Name?.toLowerCase().includes(cleanQuery);
      return nameMatch || brandMatch;
    });

    this.renderList(filtered);
  }
}