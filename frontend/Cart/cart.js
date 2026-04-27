// Update Quantity
function updateQty(button, change) {
  let qtyEl = button.parentElement.querySelector(".qty");
  let qty = parseInt(qtyEl.innerText);
  qty = Math.max(1, qty + change); // Prevent 0 or negative
  qtyEl.innerText = qty;
  updateSummary();
}


// Remove Item
function removeItem(button) {
  button.closest(".cart-item").remove();
  updateSummary();
}

// Update Summary
function updateSummary() {
  let items = document.querySelectorAll(".cart-item");
  let total = 0;

  items.forEach(item => {
    let price = parseInt(item.querySelector("p").innerText.replace("₹",""));
    let qty = parseInt(item.querySelector(".qty").innerText);
    total += price * qty;
  });

  document.getElementById("total-price").innerText = "₹" + total;

  // Example discount logic: 10% off if total > 500
  let discount = total > 500 ? Math.floor(total * 0.1) : 0;
  let finalPrice = total - discount;

  document.querySelector(".discount").innerText = "−₹" + discount;
  document.getElementById("final-price").innerText = "₹" + finalPrice;
}


// Initial Load
updateSummary();
