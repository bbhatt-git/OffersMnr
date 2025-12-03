window.cart = JSON.parse(localStorage.getItem("cart") || "{}");

window.saveCart = () => localStorage.setItem("cart", JSON.stringify(window.cart));

window.addToCart = (product) => {
  const id = product.id;
  if (!window.cart[id]) window.cart[id] = { ...product, quantity: 1 };
  else window.cart[id].quantity++;

  saveCart();
  window.updateCartUI();
};

window.removeItem = (id) => {
  delete window.cart[id];
  saveCart();
  window.updateCartUI();
};

window.updateCartUI = () => {
  const count = Object.values(window.cart).reduce((t, i) => t + i.quantity, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
};
