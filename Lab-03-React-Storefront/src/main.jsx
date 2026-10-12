import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import products from "./products";
import "./style.css";
const money=n=>"₹"+n.toLocaleString("en-IN");
function ProductCard({product,onAdd}){return <article className="card"><div className="icon">{product.image}</div><h3>{product.name}</h3><p>{money(product.price)}</p><button onClick={()=>onAdd(product)}>Add to Cart</button></article>}
function App(){
 const [cart,setCart]=useState([]);
 const [cartOpen,setCartOpen]=useState(true);
 const [form,setForm]=useState({name:"",address:"",pincode:"",phone:"",payment:"Cash on Delivery"});
 const [notice,setNotice]=useState("");
 const addToCart=product=>setCart(current=>{const found=current.find(i=>i.product.id===product.id);return found?current.map(i=>i.product.id===product.id?{...i,quantity:i.quantity+1}:i):[...current,{product,quantity:1}]});
 const removeFromCart=id=>setCart(current=>current.filter(i=>i.product.id!==id));
 const total=useMemo(()=>cart.reduce((s,i)=>s+i.product.price*i.quantity,0),[cart]);
 const count=cart.reduce((s,i)=>s+i.quantity,0);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 function checkout(e){e.preventDefault();if(!cart.length){setNotice("Add at least one product before checkout.");return}if(!/^\d{6}$/.test(form.pincode)||!/^\d{10}$/.test(form.phone)){setNotice("Enter a 6-digit pincode and 10-digit phone number.");return}setNotice("Demo order placed. No payment was processed.");setCart([])}
 return <><header><strong>Anurag Store</strong><nav><a href="#products">Products</a><button onClick={()=>setCartOpen(v=>!v)}>Cart ({count})</button></nav></header><main><section className="hero"><p>FULL STACK DEVELOPMENT · LAB 3</p><h1>React Storefront</h1><p>Reusable components, props, state and conditional rendering.</p></section><section id="products"><h2>Products</h2><div className="grid">{products.map(p=><ProductCard key={p.id} product={p} onAdd={addToCart}/>)}</div></section>{cartOpen&&<section><h2>Your Cart</h2>{cart.length===0?<p className="muted">Your cart is empty.</p>:cart.map(i=><div className="cart-row" key={i.product.id}><span>{i.product.image} {i.product.name} × {i.quantity}</span><strong>{money(i.product.price*i.quantity)}</strong><button className="remove" onClick={()=>removeFromCart(i.product.id)}>Remove</button></div>)}<h3>Grand total: {money(total)}</h3></section>}<section><h2>Checkout</h2><form onSubmit={checkout}><label>Name<input name="name" value={form.name} onChange={change} required/></label><label>Address<input name="address" value={form.address} onChange={change} required/></label><label>Pincode<input name="pincode" value={form.pincode} onChange={change} required maxLength="6"/></label><label>Phone<input name="phone" value={form.phone} onChange={change} required maxLength="10"/></label><label>Payment<select name="payment" value={form.payment} onChange={change}><option>Cash on Delivery</option><option>UPI (demo)</option></select></label><button>Place Demo Order</button></form>{notice&&<p role="status">{notice}</p>}</section></main><footer>© 2026 Anurag Store · React lab demonstration</footer></>
}
createRoot(document.getElementById("root")).render(<App/>);
