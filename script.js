//////////////////////////////////////////////////////////////////
// 🛒 ECOMMERCE FULL INTERACTIVE JAVASCRIPT
// Author: Mohit Yadav
//////////////////////////////////////////////////////////////////

// =============================
// GLOBAL STATE
// =============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let viewed = JSON.parse(localStorage.getItem("viewed")) || [];

// =============================
// MOBILE NAVBAR
// =============================
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

if (bar) {
bar.addEventListener("click", () => {
nav.classList.toggle("active");
nav.style.right = nav.style.right === "0px" ? "-300px" : "0px";
});
}

// =============================
// STICKY HEADER EFFECT
// =============================
window.addEventListener("scroll", () => {
const header = document.getElementById("header");
if (window.scrollY > 80) {
header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.15)";
} else {
header.style.boxShadow = "none";
}
});

// =============================
// TOAST MESSAGE
// =============================
function showToast(msg) {
const toast = document.createElement("div");
toast.innerText = msg;
toast.style.cssText = `     position:fixed;
    bottom:20px;
    right:20px;
    background:#088178;
    color:#fff;
    padding:12px 18px;
    border-radius:6px;
    font-size:14px;
    z-index:9999;
    opacity:0;
    transition:0.4s;
  `;
document.body.appendChild(toast);
setTimeout(() => (toast.style.opacity = "1"), 100);
setTimeout(() => {
toast.style.opacity = "0";
setTimeout(() => toast.remove(), 400);
}, 2000);
}

// =============================
// ADD TO CART
// =============================
document.querySelectorAll(".cart").forEach((btn, index) => {
btn.addEventListener("click", (e) => {
e.preventDefault();

```
const product = btn.closest(".pro");
const name = product.querySelector("h5").innerText;
const price = product.querySelector("h4").innerText;
const img = product.querySelector("img").src;

const item = { name, price, img, qty: 1 };

const existing = cart.find((p) => p.name === name);

if (existing) existing.qty++;
else cart.push(item);

localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
showToast("Added to Cart 🛍️");
```

});
});

// =============================
// CART COUNT BADGE
// =============================
function updateCartCount() {
let total = cart.reduce((sum, item) => sum + item.qty, 0);

let badge = document.getElementById("cart-count");
if (!badge) {
badge = document.createElement("span");
badge.id = "cart-count";
badge.style.cssText = `       position:absolute;
      top:-8px;
      right:-10px;
      background:red;
      color:white;
      font-size:12px;
      padding:2px 6px;
      border-radius:50%;
    `;
const cartIcon = document.querySelector(".fa-shopping-bag")?.parentElement;
if (cartIcon) cartIcon.appendChild(badge);
}

badge.innerText = total;
}
updateCartCount();

// =============================
// PRODUCT QUICK VIEW
// =============================
document.querySelectorAll(".pro img").forEach((img) => {
img.addEventListener("click", () => {
const modal = document.createElement("div");
modal.style.cssText = `       position:fixed;
      inset:0;
      background:rgba(0,0,0,0.7);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:9999;
    `;

```
const box = document.createElement("div");
box.style.cssText = `
  background:white;
  padding:20px;
  border-radius:10px;
  text-align:center;
`;

const big = document.createElement("img");
big.src = img.src;
big.style.width = "300px";

box.appendChild(big);
modal.appendChild(box);
document.body.appendChild(modal);

modal.onclick = () => modal.remove();
```

});
});

// =============================
// NEWSLETTER VALIDATION
// =============================
const newsletterBtn = document.querySelector("#newsletter button");
if (newsletterBtn) {
newsletterBtn.addEventListener("click", () => {
const input = document.querySelector("#newsletter input");
const email = input.value.trim();

```
if (!email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
  showToast("Enter valid email ❌");
} else {
  showToast("Subscribed Successfully 🎉");
  input.value = "";
}
```

});
}

// =============================
// SCROLL ANIMATION
// =============================
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.style.transform = "translateY(0)";
entry.target.style.opacity = "1";
}
});
},
{ threshold: 0.1 }
);

document.querySelectorAll(".pro, .fe-box, .banner-box").forEach((el) => {
el.style.transform = "translateY(40px)";
el.style.opacity = "0";
el.style.transition = "0.6s ease";
observer.observe(el);
});

// =============================
// BUTTON RIPPLE EFFECT
// =============================
document.querySelectorAll("button").forEach((btn) => {
btn.addEventListener("click", function (e) {
const ripple = document.createElement("span");
ripple.style.cssText = `       position:absolute;
      width:10px;height:10px;
      background:white;
      border-radius:50%;
      transform:scale(0);
      animation:ripple 0.6s linear;
      top:${e.offsetY}px;
      left:${e.offsetX}px;
    `;
this.style.position = "relative";
this.appendChild(ripple);
setTimeout(() => ripple.remove(), 600);
});
});

// =============================
// DARK MODE
// =============================
const darkToggle = document.createElement("button");
darkToggle.innerText = "🌙";
darkToggle.style.cssText = `  position:fixed;
  bottom:20px;
  left:20px;
  padding:10px;
  border-radius:50%;
  border:none;
  background:#222;
  color:white;
  z-index:9999;`;
document.body.appendChild(darkToggle);

darkToggle.onclick = () => {
document.body.classList.toggle("dark");
};

// =============================
// RECENTLY VIEWED PRODUCTS
// =============================
document.querySelectorAll(".pro").forEach((card) => {
card.addEventListener("click", () => {
const name = card.querySelector("h5").innerText;
viewed.unshift(name);
viewed = [...new Set(viewed)].slice(0, 5);
localStorage.setItem("viewed", JSON.stringify(viewed));
});
});

// =============================
// FAKE CHECKOUT
// =============================
window.checkout = function () {
if (cart.length === 0) return showToast("Cart Empty ❌");

showToast("Processing Payment...");
setTimeout(() => {
cart = [];
localStorage.removeItem("cart");
updateCartCount();
showToast("Order Placed Successfully 🎉");
}, 1500);
};

// ============================================================
// 🔥 EXTRA ADVANCED FEATURES — ADD BELOW YOUR CURRENT CODE
// ============================================================

// =============================
// SCROLL PROGRESS BAR
// =============================
const progress = document.createElement("div");
progress.style.cssText = `position:fixed;
top:0;
left:0;
height:4px;
width:0%;
background:#088178;
z-index:99999;`;
document.body.appendChild(progress);

window.addEventListener("scroll", () => {
const totalHeight = document.body.scrollHeight - window.innerHeight;
const progressHeight = (window.scrollY / totalHeight) * 100;
progress.style.width = progressHeight + "%";
});

// =============================
// LIVE PRODUCT SEARCH
// =============================
const searchBox = document.createElement("input");
searchBox.placeholder = "🔍 Search products...";
searchBox.style.cssText = `position:fixed;
top:90px;
right:20px;
padding:10px 15px;
border-radius:25px;
border:1px solid #ccc;
z-index:9999;`;
document.body.appendChild(searchBox);

searchBox.addEventListener("keyup", () => {
const val = searchBox.value.toLowerCase();
document.querySelectorAll(".pro").forEach((product) => {
const name = product.innerText.toLowerCase();
product.style.display = name.includes(val) ? "block" : "none";
});
});

// =============================
// SORT PRODUCTS BY PRICE
// =============================
const sortBtn = document.createElement("button");
sortBtn.innerText = "Sort ₹";
sortBtn.style.cssText = `position:fixed;
top:140px;
right:20px;
padding:10px 15px;
background:#088178;
color:white;
border:none;
border-radius:20px;
z-index:9999;`;
document.body.appendChild(sortBtn);

let asc = true;
sortBtn.onclick = () => {
const container = document.querySelector(".pro-container");
const items = Array.from(container.children);

items.sort((a, b) => {
const priceA = parseInt(a.querySelector("h4").innerText.replace(/\D/g,""));
const priceB = parseInt(b.querySelector("h4").innerText.replace(/\D/g,""));
return asc ? priceA - priceB : priceB - priceA;
});

asc = !asc;
items.forEach(el => container.appendChild(el));
};

// =============================
// ❤️ WISHLIST SYSTEM
// =============================
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".pro").forEach((card) => {
const heart = document.createElement("span");
heart.innerHTML = "❤";
heart.style.cssText = `   position:absolute;
  top:10px;
  left:10px;
  color:white;
  font-size:20px;
  cursor:pointer;
  text-shadow:0 0 5px black;
  `;
card.appendChild(heart);

heart.onclick = (e) => {
e.stopPropagation();
const name = card.querySelector("h5").innerText;

```
if (wishlist.includes(name)) {
  wishlist = wishlist.filter(p => p !== name);
  heart.style.color = "white";
} else {
  wishlist.push(name);
  heart.style.color = "red";
}

localStorage.setItem("wishlist", JSON.stringify(wishlist));
```

};
});

// =============================
// COUPON SYSTEM
// =============================
const couponBtn = document.createElement("button");
couponBtn.innerText = "Apply Coupon";
couponBtn.style.cssText = `position:fixed;
bottom:80px;
right:20px;
padding:10px 15px;
background:black;
color:white;
border:none;
border-radius:20px;
z-index:9999;`;
document.body.appendChild(couponBtn);

couponBtn.onclick = () => {
const code = prompt("Enter Coupon Code");

if (code === "MOHIT50") showToast("50% Discount Applied 🎉");
else if (code === "WELCOME10") showToast("10% Discount Applied 🎉");
else showToast("Invalid Coupon ❌");
};

// =============================
// ESTIMATED DELIVERY DATE
// =============================
function deliveryDate() {
const date = new Date();
date.setDate(date.getDate() + Math.floor(Math.random() * 5 + 3));
return date.toDateString();
}

document.querySelectorAll(".pro").forEach(card => {
const d = document.createElement("p");
d.style.fontSize = "11px";
d.style.color = "gray";
d.innerText = "Delivery by: " + deliveryDate();
card.appendChild(d);
});

// =============================
// AUTO HERO TEXT SLIDER
// =============================
const heroTexts = [
"Super Deals Today 🔥",
"Limited Time Offer ⏰",
"New Collection Arrived 👕",
"Flat 70% OFF 💸"
];

let i = 0;
setInterval(() => {
const hero = document.querySelector("#hero h2");
if(hero){
hero.innerText = heroTexts[i];
i = (i + 1) % heroTexts.length;
}
}, 2500);

// =============================
// KEYBOARD SHORTCUTS (PRO LEVEL)
// =============================
document.addEventListener("keydown", (e) => {
if (e.key === "/") searchBox.focus();
if (e.key === "c") showToast("Cart Shortcut Pressed 🛒");
if (e.key === "d") document.body.classList.toggle("dark");
});

// =============================
// HIGHLIGHT NEW PRODUCTS
// =============================
document.querySelectorAll(".pro").forEach((card, index) => {
if(index < 2){
const tag = document.createElement("span");
tag.innerText = "NEW";
tag.style.cssText = `     position:absolute;
    top:10px;
    right:10px;
    background:red;
    color:white;
    padding:3px 6px;
    font-size:10px;
    border-radius:4px;
    `;
card.appendChild(tag);
}
});

console.log("🚀 Extra features loaded successfully!");
