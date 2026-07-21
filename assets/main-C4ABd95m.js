import{r as m,u as h}from"./utils-l-32sxlG.js";import{P as p}from"./ProductData-uEx2lcmc.js";function g(t){const a=`./${t.Image.replace(/^(\.\.\/|\.\/|\/)/,"")}`;return`<li class="product-card">
    <a href="./product_pages/index.html?product=${t.Id}">
      <img src="${a}" alt="Image of ${t.Name}">
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.ListPrice}</p>
    </a>
  </li>`}class L{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s,this.list=[]}async init(){const e=await this.dataSource.getData();console.log("Produtos carregados:",e),this.list=e,this.renderList(this.list)}renderList(e){m(g,this.listElement,e,"afterbegin",!0)}filterList(e){const a=e.toLowerCase().trim(),s=this.list.filter(r=>{var i,n,c;const d=(i=r.Name)==null?void 0:i.toLowerCase().includes(a),u=(c=(n=r.Brand)==null?void 0:n.Name)==null?void 0:c.toLowerCase().includes(a);return d||u});this.renderList(s)}}function f(t,e=300){let a;return(...s)=>{clearTimeout(a),a=setTimeout(()=>t.apply(this,s),e)}}const $=new p("tents"),I=document.querySelector(".product-list"),l=new L("tents",$,I);l.init();h();const o=document.getElementById("product-search");o&&o.addEventListener("input",f(t=>{l.filterList(t.target.value)},250));
