import{r as p,g as f,s as y,u as b}from"./utils-u5oOr5gz.js";import{P as w}from"./ProductData-CKx_ZSv7.js";function L(s){const e=`/Project-Sleep-Outside-BYU/${s.Image.replace(/^(\.\.\/|\.\/|\/)/,"")}`;return`<li class="product-card" style="position: relative;">
    <button 
      class="wishlist-btn" 
      data-id="${s.Id}" 
      aria-label="Save to Wishlist"
      style="position: absolute; top: 10px; right: 10px; background: white; border: 1px solid #ddd; border-radius: 50%; width: 36px; height: 36px; font-size: 1.2rem; cursor: pointer; z-index: 5; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
    >
      ♡
    </button>
    <a href="/Project-Sleep-Outside-BYU/product_pages/index.html?product=${s.Id}">
      <img src="${e}" alt="Image of ${s.Name}">
      <h3 class="card__brand">${s.Brand.Name}</h3>
      <h2 class="card__name">${s.NameWithoutBrand}</h2>
      <p class="product-card__price">$${s.ListPrice}</p>
    </a>
  </li>`}class x{constructor(t,e,i){this.category=t,this.dataSource=e,this.listElement=i,this.list=[]}async init(){const t=await this.dataSource.getData();this.list=t,this.renderList(this.list)}renderList(t){p(L,this.listElement,t,"afterbegin",!0)}filterList(t){const e=t.toLowerCase().trim(),i=this.list.filter(a=>{var l,o,c;const g=(l=a.Name)==null?void 0:l.toLowerCase().includes(e),m=(c=(o=a.Brand)==null?void 0:o.Name)==null?void 0:c.toLowerCase().includes(e);return g||m});this.renderList(i)}}class I{constructor(t="so-wishlist"){this.key=t}getWishlist(){return f(this.key)||[]}toggleItem(t){let e=this.getWishlist();const i=e.findIndex(a=>a.Id===t.Id);i>-1?e.splice(i,1):e.push(t),y(this.key,e),this.updateWishlistBadge()}isWishlisted(t){return this.getWishlist().some(i=>i.Id===t)}updateWishlistBadge(){const t=document.querySelector(".wishlist-count");if(t){const e=this.getWishlist();t.textContent=e.length,t.style.display=e.length>0?"inline-block":"none"}}}function W(s,t=300){let e;return(...i)=>{clearTimeout(e),e=setTimeout(()=>s.apply(this,i),t)}}const S=new w("tents"),r=document.querySelector(".product-list"),h=new x("tents",S,r),n=new I;function u(){document.querySelectorAll(".wishlist-btn").forEach(t=>{const e=n.isWishlisted(t.dataset.id);t.textContent=e?"♥":"♡",t.style.color=e?"red":"black"})}async function $(){n.updateWishlistBadge(),b(),await h.init(),u()}$();const d=document.getElementById("product-search");d&&d.addEventListener("input",W(s=>{h.filterList(s.target.value),u()},250));r&&r.addEventListener("click",s=>{if(s.target.classList.contains("wishlist-btn")){s.preventDefault();const t=s.target.dataset.id;n.toggleItem({Id:t});const e=n.isWishlisted(t);s.target.textContent=e?"♥":"♡",s.target.style.color=e?"red":"black"}});
