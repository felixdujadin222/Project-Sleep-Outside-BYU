import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const checkout = new CheckoutProcess("so-cart", "#order-summary");
  checkout.init();

  // Recalculate tax & shipping when zip code is entered
  const zipInput = document.getElementById("zip");
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      if (zipInput.checkValidity()) {
        checkout.calculateOrderTotal();
      }
    });
  }

  // Handle Form Submission
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Calculate final totals before submitting
      checkout.calculateOrderTotal();
      
      const orderPayload = {
        orderDate: new Date().toISOString(),
        fname: form.fname.value,
        lname: form.lname.value,
        street: form.street.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value,
        cardNumber: form.cardNumber.value,
        expiration: form.expiration.value,
        code: form.code.value,
        items: checkout.packageItems(),
        orderTotal: checkout.orderTotal.toFixed(2),
        shipping: checkout.shipping.toFixed(2),
        tax: checkout.tax.toFixed(2),
      };

      console.log("Submitting Order Payload:", orderPayload);
      
      // Clear cart & redirect to confirmation page
      localStorage.removeItem("so-cart");
      window.location.href = "./success.html";
    });
  }
});