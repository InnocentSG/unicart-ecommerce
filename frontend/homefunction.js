// =======================
// Auto-detect location
// =======================
function fetchLocation() {
    const locationText = document.getElementById("location-text");
    if (!locationText) return;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else locationText.textContent = "Location not supported";

    function success(pos) {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(res => res.json())
            .then(data => {
                const city = data.address.city || data.address.town || data.address.village || "Your Location";
                const fullAddress = data.display_name || city;

                // Show short name in header
                locationText.textContent = city.split(",")[0];

                // Save full address in localStorage
                localStorage.setItem("fullAddress", fullAddress);

                // Add to saved locations
                let saved = JSON.parse(localStorage.getItem("savedLocations") || "[]");
                if (!saved.includes(fullAddress)) {
                    saved.unshift(fullAddress);
                    if (saved.length > 5) saved.pop(); // max 5
                    localStorage.setItem("savedLocations", JSON.stringify(saved));
                }
            })
            .catch(() => locationText.textContent = "Unknown Location");
    }

    function error() { locationText.textContent = "Location Denied"; }
}

// =======================
// Location Dropdown + Saved Locations + Pincode Search
// =======================
function initLocationDropdown() {
    const wrapper = document.getElementById("location-wrapper");
    const locationText = document.getElementById("location-text");
    const dropdown = document.getElementById("location-dropdown");
    const searchInput = document.getElementById("autocomplete-input");
    const useCurrentBtn = document.getElementById("use-current");

    // Saved Locations section
    const savedList = document.createElement("div");
    savedList.style.marginBottom = "10px";
    savedList.style.maxHeight = "120px";
    savedList.style.overflowY = "auto";
    dropdown.prepend(savedList);

    function updateSavedList() {
        savedList.innerHTML = "";
        const saved = JSON.parse(localStorage.getItem("savedLocations") || "[]");
        saved.forEach(loc => {
            const div = document.createElement("div");
            div.textContent = loc;
            div.style.cursor = "pointer";
            div.style.padding = "5px 0";
            div.addEventListener("click", () => {
                locationText.textContent = loc.split(",")[0];
                localStorage.setItem("fullAddress", loc);
                dropdown.style.display = "none";
            });
            savedList.appendChild(div);
        });
    }
    updateSavedList();

    // Google Autocomplete for pincode / city
    const autocomplete = new google.maps.places.Autocomplete(searchInput, { types: ["(cities)"] });
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
            const fullAddress = place.formatted_address;
            locationText.textContent = fullAddress.split(",")[0];
            localStorage.setItem("fullAddress", fullAddress);

            let saved = JSON.parse(localStorage.getItem("savedLocations") || "[]");
            saved.unshift(fullAddress);
            if (saved.length > 5) saved.pop();
            localStorage.setItem("savedLocations", JSON.stringify(saved));
            updateSavedList();
        }
    });

    // Toggle dropdown on header click
    wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        searchInput.focus();
    });

    // Use current location button
    useCurrentBtn.addEventListener("click", () => {
        fetchLocation();
        dropdown.style.display = "none";
    });

    // Prevent closing dropdown when clicking inside
    dropdown.addEventListener("click", (e) => e.stopPropagation());

    // Close dropdown on outside click
    document.addEventListener("click", () => {
        dropdown.style.display = "none";
    });

    // Load last saved location on page load
    const lastAddress = localStorage.getItem("fullAddress");
    if (lastAddress) locationText.textContent = lastAddress.split(",")[0];
}

// =======================
// Menu Dropdown
// =======================
const menuWrapper = document.querySelector(".menu-wrapper");
const menuDropdown = document.querySelector(".menu-dropdown");

if (menuWrapper && menuDropdown) {
    menuWrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        menuDropdown.style.display = menuDropdown.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
        menuDropdown.style.display = "none";
    });
}

// =======================
// Poster Carousel
// =======================
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const slides = Array.from(track.children);
    let index = 0;

    setInterval(() => {
        index = (index + 1) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    }, 3000);
}

// =======================
// Featured Brands
// =======================
function initFeaturedBrands() {
    const brandTrack = document.querySelector('.brands-track');
    if (!brandTrack) return;

    let brandIndex = 0;
    setInterval(() => {
        brandIndex = (brandIndex + 1) % brandTrack.children.length;
        brandTrack.style.transform = `translateX(-${brandIndex * 110}px)`;
    }, 3000);
}

// =======================
// Product Fetch for Swipable Track
// =======================
function fetchProducts(sectionClass, apiEndpoint) {
    fetch(apiEndpoint)
        .then(res => res.json())
        .then(products => {
            const container = document.querySelector(sectionClass);
            if (!container) return;
            container.innerHTML = '';
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.onclick = () => window.location = `/Product/product.html?id=${product._id}`;
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <p class="price">₹${product.price}</p>
                    <h3>${product.name}</h3>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => console.error(`Error fetching products for ${sectionClass}:`, err));
}

// =======================
// Initialize all
// =======================
document.addEventListener("DOMContentLoaded", () => {
    // Login/User Dropdown
    const headerRight = document.getElementById("header-right");
    const userDropdown = document.getElementById("user-dropdown");
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");

    if (token && userName) {
        headerRight.innerHTML = `<button id="user-name-btn" class="user-btn">${userName}</button>`;
        const userBtn = document.getElementById("user-name-btn");
        userBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
        });

        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.reload();
        });

        document.addEventListener("click", () => {
            userDropdown.style.display = "none";
        });
    }

    // Other initializations
    fetchLocation();
    initLocationDropdown();
    initCarousel();
    initFeaturedBrands();

    // Product sections fetch
    fetchProducts('.product-section:nth-of-type(1) .product-track', '/api/products?type=suggested');
    fetchProducts('.product-section:nth-of-type(2) .product-track', '/api/products?type=previously-bought');
    fetchProducts('.product-section:nth-of-type(3) .product-track', '/api/products?type=latest-tech');
    fetchProducts('.product-section:nth-of-type(4) .product-track', '/api/products?type=top-deals');
});
