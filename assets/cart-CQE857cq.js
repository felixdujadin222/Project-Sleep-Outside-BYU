import{g as s,s as l,u as d}from"./utils-l-32sxlG.js";function n(){const t=s("so-cart")||[];if(t.length>0){const e=t.map(c=>m(c));document.querySelector(".product-list").innerHTML=e.join("");const r=t.reduce((c,i)=>c+i.FinalPrice,0),a=document.querySelector(".cart-footer");document.querySelector(".cart-total").innerHTML=`Total: $${r.toFixed(2)}`,a.classList.remove("hide")}else{document.querySelector(".product-list").innerHTML="<p>Your cart is empty.</p>";const e=document.querySelector(".cart-footer");e&&e.classList.add("hide")}d()}function m(t){return`<li class="cart-card divider">
  <!-- "X" button to remove item -->
  <span class="cart-card__remove" data-id="${t.Id}" title="Remove item" role="button">X</span>

  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}function u(t){let e=s("so-cart")||[];const r=e.findIndex(a=>a.Id===t);r!==-1&&(e.splice(r,1),l("so-cart",e),n())}const o=document.querySelector(".product-list");o&&o.addEventListener("click",t=>{if(t.target.classList.contains("cart-card__remove")){const e=t.target.getAttribute("data-id");u(e)}});n();
