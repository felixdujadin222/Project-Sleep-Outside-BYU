import{g as u,s as p,u as y,f as g}from"./utils-C7qbLY_9.js";function f(){const t=u("so-cart")||[];if(t.length>0){const e=t.map(n=>I(n));document.querySelector(".product-list").innerHTML=e.join("");const a=t.reduce((n,c)=>{const s=c.Quantity||1;return n+c.FinalPrice*s},0),r=document.querySelector(".cart-footer"),o=document.querySelector(".cart-total");o&&(o.innerHTML=`Total: $${a.toFixed(2)}`),r&&r.classList.remove("hide")}else{document.querySelector(".product-list").innerHTML="<p>Your cart is empty.</p>";const e=document.querySelector(".cart-footer");e&&e.classList.add("hide")}y()}function I(t){var c,s,i,l;const e=((c=t.Images)==null?void 0:c.PrimaryMedium)||((s=t.Images)==null?void 0:s.PrimaryLarge)||t.Image||"",a=g(e),r=t.Quantity||1,o=((l=(i=t.Colors)==null?void 0:i[0])==null?void 0:l.ColorName)||"Default Color";return`<li class="cart-card divider">
  <!-- "X" button to remove item -->
  <span class="cart-card__remove" data-id="${t.Id}" title="Remove item" role="button">X</span>

  <a href="#" class="cart-card__image">
    <img
      src="${a}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${o}</p>
  <p class="cart-card__quantity">qty: ${r}</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}function h(t){let e=u("so-cart")||[];const a=e.findIndex(r=>r.Id===t);a!==-1&&(e[a].Quantity&&e[a].Quantity>1?e[a].Quantity-=1:e.splice(a,1),p("so-cart",e),f())}const d=document.querySelector(".product-list");d&&d.addEventListener("click",t=>{if(t.target.classList.contains("cart-card__remove")){const e=t.target.getAttribute("data-id");h(e)}});f();const m=document.getElementById("backBtn");m&&m.addEventListener("click",()=>{document.referrer&&window.history.length>1?window.history.back():window.location.href="../index.html"});
