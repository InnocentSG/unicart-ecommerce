// Filter + Search Orders
const searchBox = document.getElementById("searchBox");
const filterBox = document.getElementById("filterBox");
const ordersList = document.getElementById("ordersList");
const orders = ordersList.getElementsByClassName("order-card");

// Search Orders
searchBox.addEventListener("input", function() {
  const query = this.value.toLowerCase();
  for (let order of orders) {
    const name = order.querySelector("h3").innerText.toLowerCase();
    order.style.display = name.includes(query) ? "flex" : "none";
  }
});

// Filter Orders
filterBox.addEventListener("change", function() {
  const filter = this.value;
  for (let order of orders) {
    const status = order.getAttribute("data-status");
    order.style.display = (filter === "all" || status === filter) ? "flex" : "none";
  }
});
