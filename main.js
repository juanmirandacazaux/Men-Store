function renderProducts(list) {
  $("#products-container").html("");

  list.forEach(p => {
    $("#products-container").append(`
      <div class="product-card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `);
  });
}

function applyFilters() {
  const category = $("#filter-category").val();
  const maxPrice = $("#filter-price").val();
  $("#price-value").text(maxPrice);

  const filtered = products.filter(p =>
    (category === "all" || p.category === category) && p.price <= maxPrice
  );

  renderProducts(filtered);
}

$(document).ready(function () {
  if ($("#products-container").length) {
    renderProducts(products);
    $("#filter-category, #filter-price").on("change input", applyFilters);
  }
});
