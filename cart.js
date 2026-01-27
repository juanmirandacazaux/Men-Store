let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty += 1;
  else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  Swal.fire("Added!", "Product added to cart", "success");
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCheckout();
}

function changeQty(id, qty) {
  const item = cart.find(p => p.id === id);
  item.qty = parseInt(qty);
  saveCart();
  renderCheckout();
}

function renderCheckout() {
  const container = document.getElementById("checkout-items");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    container.innerHTML += `
      <div class="checkout-item">
        <p>${item.name}</p>
        <input type="number" min="1" value="${item.qty}" onchange="changeQty(${item.id}, this.value)">
        <p>$${item.price * item.qty}</p>
        <button onclick="removeItem(${item.id})">❌</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "$" + total;
}
