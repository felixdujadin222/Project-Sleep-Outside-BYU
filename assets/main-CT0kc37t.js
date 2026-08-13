import{r as y,f as b,g as w,s as x,u as I}from"./utils-C7qbLY_9.js";import{P as L}from"./ProductData-XusWQCmk.js";function u(t){var i,a;const e=((i=t==null?void 0:t.Images)==null?void 0:i.PrimaryMedium)||(t==null?void 0:t.Image)||"images/tents/marmot-ajax-tent-3-person-in-gold-sunflower~p~880rr_100.webp",s=b(e);return`<li class="product-card" style="position: relative;">
    <button 
      class="wishlist-btn" 
      data-id="${(t==null?void 0:t.Id)||""}" 
      aria-label="Save to Wishlist"
      style="position: absolute; top: 10px; right: 10px; background: white; border: 1px solid #ddd; border-radius: 50%; width: 36px; height: 36px; font-size: 1.2rem; cursor: pointer; z-index: 5; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
    >
      ♡
    </button>
    <a href="/Project-Sleep-Outside-BYU/product_pages/index.html?product=${t==null?void 0:t.Id}">
      <img src="${s}" alt="Image of ${(t==null?void 0:t.Name)||"Product"}">
      <h3 class="card__brand">${((a=t==null?void 0:t.Brand)==null?void 0:a.Name)||""}</h3>
      <h2 class="card__name">${(t==null?void 0:t.NameWithoutBrand)||(t==null?void 0:t.Name)||""}</h2>
      <p class="product-card__price">$${(t==null?void 0:t.FinalPrice)||(t==null?void 0:t.ListPrice)||"0.00"}</p>
    </a>
  </li>`}class W{constructor(e,s,i){this.category=e,this.dataSource=s,this.listElement=i,this.list=[]}async init(){const e=await this.dataSource.getData(this.category);this.list=e||[],this.renderList(this.list)}renderList(e){y(u,this.listElement,e,"afterbegin",!0)}filterList(e){const s=e.toLowerCase().trim(),i=this.list.filter(a=>{var r,o,h;const d=(r=a.Name)==null?void 0:r.toLowerCase().includes(s),f=(h=(o=a.Brand)==null?void 0:o.Name)==null?void 0:h.toLowerCase().includes(s);return d||f});this.renderList(i)}}class S{constructor(e="so-wishlist"){this.key=e}getWishlist(){return w(this.key)||[]}toggleItem(e){let s=this.getWishlist();const i=s.findIndex(a=>a.Id===e.Id);i>-1?s.splice(i,1):s.push(e),x(this.key,s),this.updateWishlistBadge()}isWishlisted(e){return this.getWishlist().some(i=>i.Id===e)}updateWishlistBadge(){const e=document.querySelector(".wishlist-count");if(e){const s=this.getWishlist();e.textContent=s.length,e.style.display=s.length>0?"inline-block":"none"}}}function P(t,e=300){let s;return(...i)=>{clearTimeout(s),s=setTimeout(()=>t.apply(this,i),e)}}const B=new L("tents"),l=document.querySelector(".product-list"),m=new W("tents",B,l),n=new S;function g(){document.querySelectorAll(".wishlist-btn").forEach(e=>{const s=n.isWishlisted(e.dataset.id);e.textContent=s?"♥":"♡",e.style.color=s?"red":"black"})}async function C(){n.updateWishlistBadge(),I(),await m.init(),g()}C();const c=document.getElementById("product-search");c&&c.addEventListener("input",P(t=>{m.filterList(t.target.value),g()},250));l&&l.addEventListener("click",t=>{if(t.target.classList.contains("wishlist-btn")){t.preventDefault();const e=t.target.dataset.id;n.toggleItem({Id:e});const s=n.isWishlisted(e);t.target.textContent=s?"♥":"♡",t.target.style.color=s?"red":"black"}});
