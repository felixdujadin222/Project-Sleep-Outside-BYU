import{r as m,u as h}from"./utils-l-32sxlG.js";import{P as p}from"./ProductData-CKx_ZSv7.js";function g(t){const s=`/Project-Sleep-Outside-BYU/${t.Image.replace(/^(\.\.\/|\.\/|\/)/,"")}`;return`<li class="product-card">
    <a href="/Project-Sleep-Outside-BYU/product_pages/index.html?product=${t.Id}">
      <img src="${s}" alt="Image of ${t.Name}">
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.ListPrice}</p>
    </a>
  </li>`}class L{constructor(e,s,a){this.category=e,this.dataSource=s,this.listElement=a,this.list=[]}async init(){const e=await this.dataSource.getData();console.log("Produtos carregados:",e),this.list=e,this.renderList(this.list)}renderList(e){m(g,this.listElement,e,"afterbegin",!0)}filterList(e){const s=e.toLowerCase().trim(),a=this.list.filter(r=>{var i,n,c;const d=(i=r.Name)==null?void 0:i.toLowerCase().includes(s),u=(c=(n=r.Brand)==null?void 0:n.Name)==null?void 0:c.toLowerCase().includes(s);return d||u});this.renderList(a)}}function f(t,e=300){let s;return(...a)=>{clearTimeout(s),s=setTimeout(()=>t.apply(this,a),e)}}const $=new p("tents"),P=document.querySelector(".product-list"),l=new L("tents",$,P);l.init();h();const o=document.getElementById("product-search");o&&o.addEventListener("input",f(t=>{l.filterList(t.target.value)},250));
