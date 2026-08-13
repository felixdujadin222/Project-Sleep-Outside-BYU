// ProductData.mjs
const API_BASE_URL = "https://wdd330-backend.onrender.com/";

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
  }

  // API #1 Call: Fetch products by category from remote backend
  async getData() {
    const response = await fetch(`${API_BASE_URL}products/search/${this.category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // API #1 Call: Fetch single product details by ID
  async findProductById(id) {
    const response = await fetch(`${API_BASE_URL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}