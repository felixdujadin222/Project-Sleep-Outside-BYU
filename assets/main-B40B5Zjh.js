import{r as m,u as h}from"./utils-l-32sxlG.js";import{P as p}from"./ProductData-uEx2lcmc.js";function L(t){return`<li class="product-card">
    <a href="product_pages/index.html?product=${t.Id}">
      <img src="${t.Image}" alt="Image of ${t.Name}">
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.ListPrice}</p>
    </a>
  </li>`}class f{constructor(e,s,r){this.category=e,this.dataSource=s,this.listElement=r,this.list=[]}async init(){const e=await this.dataSource.getData();console.log("Produtos carregados:",e),this.list=e,this.renderList(this.list)}renderList(e){m(L,this.listElement,e,"afterbegin",!0)}filterList(e){const s=e.toLowerCase().trim(),r=this.list.filter(a=>{var i,n,c;const d=(i=a.Name)==null?void 0:i.toLowerCase().includes(s),u=(c=(n=a.Brand)==null?void 0:n.Name)==null?void 0:c.toLowerCase().includes(s);return d||u});this.renderList(r)}}function g(t,e=300){let s;return(...r)=>{clearTimeout(s),s=setTimeout(()=>t.apply(this,r),e)}}const _=new p("tents"),$=document.querySelector(".product-list"),l=new f("tents",_,$);l.init();h();const o=document.getElementById("product-search");o&&o.addEventListener("input",g(t=>{l.filterList(t.target.value)},250));
