document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/cart/get") // 🔁 Replace with your actual URL
    .then(res => res.json())
    .then(items => {
      const container = document.getElementById("cart-items");
      let total = 0;

      items.forEach(item => {
        const div = document.createElement("div");
        div.className = "product";

        const price = 129.99; // You can fetch real price if needed
        total += price * item.quantity;

        div.innerHTML = `
          <h3>SKU: ${item.sku}</h3>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: $${(price * item.quantity).toFixed(2)}</p>
          <button onclick="removeItem(${item.id})">Remove</button>
        `;
        container.appendChild(div);
      });

      document.getElementById("total-cost").innerText = `Total: $${total.toFixed(2)}`;
    });
});

function removeItem(id) {
  fetch(`http://localhost:8080/cart/delete/${id}`, { method: "DELETE" }) // 🔁 Replace with your URL
    .then(() => location.reload());
}

function emptyCart() {
  fetch("http://localhost:8080/cart/delete", { method: "DELETE" }) // 🔁 Replace with your URL
    .then(() => location.reload());
}
