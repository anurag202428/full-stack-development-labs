const products = [
 {id:1,name:"Wireless Headphones",price:1499,icon:"🎧"},{id:2,name:"Mechanical Keyboard",price:2199,icon:"⌨️"},
 {id:3,name:"Gaming Mouse",price:899,icon:"🖱️"},{id:4,name:"College Backpack",price:799,icon:"🎒"},
 {id:5,name:"Phone Stand",price:299,icon:"📱"},{id:6,name:"Desk Lamp",price:699,icon:"💡"},
 {id:7,name:"USB Hub",price:599,icon:"🔌"},{id:8,name:"Portable SSD",price:4299,icon:"💾"}
];
const KEY="anurag-store-cart";
const money=n=>"₹"+n.toLocaleString("en-IN");
const getCart=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return []}};
const saveCart=cart=>{localStorage.setItem(KEY,JSON.stringify(cart));updateBadge();renderCart()};
function updateBadge(){document.querySelector("#cart-count").textContent=getCart().reduce((s,i)=>s+i.quantity,0)}
function addToCart(id){const cart=getCart();const item=cart.find(i=>i.id===id);if(item)item.quantity++;else cart.push({id,quantity:1});saveCart(cart);showMessage("Product added to cart.","success")}
function showMessage(text,type){const el=document.querySelector("#message");el.textContent=text;el.className=type}
function renderProducts(){document.querySelector("#product-list").innerHTML=products.map(p=>`<article class="card"><div style="font-size:42px">${p.icon}</div><h3>${p.name}</h3><p class="price">${money(p.price)}</p><button data-add="${p.id}">Add to Cart</button></article>`).join("");document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(Number(b.dataset.add))))}
function renderCart(){const cart=getCart();const body=document.querySelector("#cart-items");if(!body)return;document.querySelector("#empty-cart").hidden=cart.length>0;body.innerHTML=cart.map(i=>{const p=products.find(p=>p.id===i.id);return `<tr><td>${p.name}</td><td><input type="number" min="1" max="99" value="${i.quantity}" data-qty="${i.id}" aria-label="Quantity"></td><td>${money(p.price)}</td><td>${money(p.price*i.quantity)}</td><td><button data-remove="${i.id}">Remove</button></td></tr>`}).join("");document.querySelector("#cart-total").textContent=money(cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.quantity,0));body.querySelectorAll("[data-qty]").forEach(input=>input.addEventListener("change",()=>{const c=getCart();const i=c.find(i=>i.id===Number(input.dataset.qty));i.quantity=Math.max(1,Math.min(99,Number(input.value)||1));saveCart(c)}));body.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>saveCart(getCart().filter(i=>i.id!==Number(b.dataset.remove)))))}
document.querySelector("#checkout-form").addEventListener("submit",e=>{e.preventDefault();const f=e.currentTarget;const data=Object.fromEntries(new FormData(f));const errors=[];if(!data.name.trim())errors.push("Name is required");if(!data.address.trim())errors.push("Address is required");if(!/^\d{6}$/.test(data.pincode.trim()))errors.push("Pincode must be exactly 6 digits");if(!/^\d{10}$/.test(data.phone.trim()))errors.push("Phone must be exactly 10 digits");if(errors.length)showMessage(errors.join(". "),"error");else{localStorage.removeItem(KEY);updateBadge();renderCart();f.reset();showMessage("Demo order validated; no payment was processed.","success")}});
renderProducts();updateBadge();renderCart();
