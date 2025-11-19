document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/product/get") // 🔁 Replace with your actual URL
    .then(response => response.json())
    .then(products => {
      const grid = document.getElementById("product-grid");
      products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $${product.price.toFixed(2)}</p>
          <p>SKU: ${product.sku}</p>
          <button onclick="addToCart('${product.sku}')">Add to Cart</button>
        `;
        grid.appendChild(div);
      });
    });
});

function addToCart(sku) {
  fetch("http://localhost:8080/cart/add", { // 🔁 Replace with your actual URL
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sku: sku, quantity: 1 })
  })
  .then(res => {
    if (res.ok) {
      alert("Item added to cart!");
    } else {
      alert("Failed to add item.");
    }
  });
}
