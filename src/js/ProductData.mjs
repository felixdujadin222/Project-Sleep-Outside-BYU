function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    
    // Ensure baseUrl always ends with a single trailing slash
    const baseUrl = import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;

    // Construct the path
    this.path = `${baseUrl}json/${this.category}.json`;
  }

  async getData() {
    const response = await fetch(this.path);
    return await convertToJson(response);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}