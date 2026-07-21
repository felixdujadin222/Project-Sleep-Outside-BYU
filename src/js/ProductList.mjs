import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Strip leading dots or slashes so we can prepend BASE_URL cleanly
  const cleanImagePath = product.Image.replace(/^(\.\.\/|\.\/|\/)/, "");
  const imageSrc = `${import.meta.env.BASE_URL}${cleanImagePath}`;

  return `<li class="product-card">
    <a href="${import.meta.env.BASE_URL}product_pages/index.html?product=${product.Id}">
      <img src="${imageSrc}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.list = []; // Master copy of full product list
  }

  async init() {
    const list = await this.dataSource.getData();
    console.log("Produtos carregados:", list);

    this.list = list; // Save the fetched items to this.list
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

  // Real-Time Search Filter Logic
  filterList(query) {
    const cleanQuery = query.toLowerCase().trim();

    // Filter by product name or brand name
    const filtered = this.list.filter((product) => {
      const nameMatch = product.Name?.toLowerCase().includes(cleanQuery);
      const brandMatch = product.Brand?.Name?.toLowerCase().includes(cleanQuery);
      return nameMatch || brandMatch;
    });

    // Re-render template list with matching results
    this.renderList(filtered);
  }
}