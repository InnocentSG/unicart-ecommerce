// =========================
// Modal Utilities
// =========================
function openModal(modalId) { document.getElementById(modalId).classList.remove("hidden"); }
function closeModal(modalId) { document.getElementById(modalId).classList.add("hidden"); }
document.querySelectorAll(".close-modal").forEach(btn => btn.addEventListener("click", () => closeModal(btn.dataset.target)));

// =========================
// Admin Login
// =========================
const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const adminPanel = document.getElementById("admin-panel");
const ADMIN_ID = "admin";
const ADMIN_PASS = "1234";

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const id = document.getElementById("admin-id").value.trim();
  const pass = document.getElementById("admin-pass").value.trim();
  if (id === ADMIN_ID && pass === ADMIN_PASS) {
    loginModal.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    loginForm.reset();
    loginError.textContent = "";
    loadProducts();
    loadUsers();
  } else loginError.textContent = "Invalid ID or password!";
});

document.getElementById("logout-btn").addEventListener("click", () => {
  adminPanel.classList.add("hidden");
  loginModal.classList.remove("hidden");
});

// =========================
// Sidebar Navigation
// =========================
const navItems = document.querySelectorAll(".nav-item");
const tabPanes = document.querySelectorAll(".tab-pane");
navItems.forEach(item => item.addEventListener("click", () => {
  navItems.forEach(i => i.classList.remove("active"));
  tabPanes.forEach(p => p.classList.remove("active"));
  item.classList.add("active");
  document.getElementById(item.dataset.tab).classList.add("active");
}));

// =========================
// API URL
// =========================
const API = "http://localhost:5000/api";

// =========================
// PRODUCTS
// =========================
const productForm = document.getElementById("product-form");
const productsTable = document.querySelector("#products-table tbody");

async function loadProducts() {
  const res = await fetch(`${API}/products`);
  const products = await res.json();
  productsTable.innerHTML = "";
  products.forEach(p => {
    const row = productsTable.insertRow();
    row.innerHTML = `
      <td>${p._id}</td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${p.price}</td>
      <td>${p.stock}</td>
      <td>
        <button class="edit-btn" data-id="${p._id}">Edit</button>
        <button class="delete-btn" data-id="${p._id}">Delete</button>
      </td>
    `;
    row.querySelector(".delete-btn").addEventListener("click", () => deleteProduct(p._id));
    row.querySelector(".edit-btn").addEventListener("click", () => editProduct(p));
  });
}

productForm.addEventListener("submit", async e => {
  e.preventDefault();
  const formData = new FormData(productForm);
  const productData = Object.fromEntries(formData.entries());
  try {
    let method = "POST";
    let url = `${API}/products`;
    if (productData._id) {
      method = "PUT";
      url = `${API}/products/${productData._id}`;
      delete productData._id;
    }
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(productData) });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to save product");
    closeModal("product-modal");
    productForm.reset();
    loadProducts();
  } catch (err) {
    alert(err.message);
  }
});

async function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;
  await fetch(`${API}/products/${id}`, { method: "DELETE" });
  loadProducts();
}

function editProduct(p) {
  openModal("product-modal");
  Object.keys(p).forEach(k => { if (productForm[k]) productForm[k].value = p[k]; });
}

// =========================
// USERS
// =========================
const userForm = document.getElementById("user-form");
const usersTable = document.querySelector("#users-table tbody");

async function loadUsers() {
  const res = await fetch(`${API}/users`);
  const users = await res.json();
  usersTable.innerHTML = "";
  users.forEach(u => {
    const row = usersTable.insertRow();
    row.innerHTML = `
      <td>${u._id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.phone || ""}</td>
      <td>
        <button class="edit-btn" data-id="${u._id}">Edit</button>
        <button class="delete-btn" data-id="${u._id}">Delete</button>
      </td>
    `;
    row.querySelector(".delete-btn").addEventListener("click", () => deleteUser(u._id));
    row.querySelector(".edit-btn").addEventListener("click", () => editUser(u));
  });
}

userForm.addEventListener("submit", async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(userForm).entries());
  try {
    let method = "POST";
    let url = `${API}/users`;
    if (data._id) {
      method = "PUT";
      url = `${API}/users/${data._id}`;
      delete data._id;
    }
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to save user");
    closeModal("user-modal");
    userForm.reset();
    loadUsers();
  } catch (err) { alert(err.message); }
});

async function deleteUser(id) {
  if (!confirm("Delete this user?")) return;
  await fetch(`${API}/users/${id}`, { method: "DELETE" });
  loadUsers();
}

function editUser(u) {
  openModal("user-modal");
  Object.keys(u).forEach(k => { if (userForm[k]) userForm[k].value = u[k]; });
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  if (!loginModal.classList.contains("hidden")) return; // admin not logged in
  loadProducts();
  loadUsers();
});
