import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

const SERVICES_URL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      `${this.outputSelector} #subtotal`
    );
    const countElement = document.querySelector(
      `${this.outputSelector} #num-items`
    );

    if (countElement) {
      const totalCount = this.list.reduce(
        (sum, item) => sum + (item.Quantity || 1),
        0
      );
      countElement.innerText = totalCount;
    }

    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
      0
    );

    if (summaryElement) {
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    const totalCount = this.list.reduce(
      (sum, item) => sum + (item.Quantity || 1),
      0
    );

    this.shipping = totalCount > 0 ? 10 + (totalCount - 1) * 2 : 0;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shippingEl = document.querySelector(
      `${this.outputSelector} #shipping`
    );
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const totalEl = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems() {
    return this.list.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Quantity || 1,
    }));
  }

  async checkout(form) {
    this.calculateOrderTotal();

    const orderPayload = formDataToJSON(form);
    orderPayload.orderDate = new Date().toISOString();
    orderPayload.items = this.packageItems();
    orderPayload.orderTotal = this.orderTotal.toFixed(2);
    orderPayload.shipping = this.shipping.toFixed(2);
    orderPayload.tax = this.tax.toFixed(2);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    };

    try {
      // Clear existing alert banners directly from DOM
      document.querySelectorAll(".alert").forEach((alert) => alert.remove());

      const response = await fetch(`${SERVICES_URL}checkout`, options);
      const data = await response.json();

      if (response.ok) {
        setLocalStorage(this.key, []);
        location.href = "./success.html";
        return data;
      } else {
        if (typeof data === "object") {
          for (const key in data) {
            alertMessage(`${key}: ${data[key]}`);
          }
        } else {
          alertMessage(data);
        }
        throw new Error(JSON.stringify(data));
      }
    } catch (err) {
      console.error("Checkout submission failed:", err);
      throw err;
    }
  }
}