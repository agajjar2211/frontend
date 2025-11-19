const api_base = "https://assignmentnaa3-image.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${api_base}/cart/get`) 
    .then(res => res.json())
    .then(items => {
      const container = document.getElementById("cart-items");
      let total = 0;

      items.forEach(item => {
        const div = document.createElement("div");
        div.className = "product";

        const price = 129.99; 
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
  fetch(`${api_base}/cart/delete/${id}`, { method: "DELETE" }) 
    .then(() => location.reload());
}

function emptyCart() {
  fetch(`${api_base}/cart/delete`, { method: "DELETE" }) 
    .then(() => location.reload());
}
