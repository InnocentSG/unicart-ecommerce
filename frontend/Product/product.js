const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const token = localStorage.getItem('token'); // Assume user is logged in if token exists

async function fetchProduct() {
  try {
    const res = await fetch(`/api/products/${id}`);
    const product = await res.json();

    if (!product) {
      document.getElementById('product-name').innerText = "Product Not Found";
      return;
    }

    // --- Fill product details ---
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-name-detail').innerText = product.name;
    document.getElementById('product-price').innerText = '₹' + product.price;
    document.getElementById('product-discount').innerText = product.discount ? `Discount: ${product.discount}%` : '';
    document.getElementById('product-category').innerText = 'Category: ' + product.category;
    document.getElementById('product-box').innerText = 'In-box: ' + (product.boxContents || 'N/A');
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-purchases').innerText = 'Purchased: ' + (product.purchases || 0);

    // --- Images Carousel ---
    const mainImage = document.getElementById('main-image').querySelector('img');
    const thumbnails = document.getElementById('thumbnail-images');
    thumbnails.innerHTML = '';
    product.images.forEach((imgSrc, index) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      if(index === 0) mainImage.src = imgSrc;
      img.addEventListener('click', () => mainImage.src = imgSrc);
      thumbnails.appendChild(img);
    });

    // --- Wishlist / Save Button ---
    document.getElementById('save-product').addEventListener('click', () => {
      if(!token){
        alert('Please login to save this product.');
        return;
      }
      // Here you can call your API to save product for user
      alert('Saved to Wishlist');
    });

    // --- Buy Now Button ---
    document.getElementById('buy-now').addEventListener('click', () => {
      if(!token){
        alert('Please login to buy this product.');
        return;
      }
      // Implement buy logic or redirect to checkout
      alert('Buy Now clicked');
    });

    // --- Add to Cart Button ---
    document.getElementById('add-to-cart').addEventListener('click', () => {
      if(!token){
        alert('Please login to add to cart.');
        return;
      }
      // Implement add to cart logic
      alert('Added to Cart');
    });

    // --- Reviews ---
    const reviewContainer = document.getElementById('product-comments');
    reviewContainer.innerHTML = '<h3>Customer Reviews</h3>';
    if(product.comments && product.comments.length > 0){
      product.comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `<strong>${c.user}</strong> (${c.rating}/5)<br>${c.comment}`;
        reviewContainer.appendChild(div);
      });
    } else {
      reviewContainer.innerHTML += '<p>No reviews yet.</p>';
    }

    // --- Review Submission (only if user purchased) ---
    if(token && product.userPurchased){
      const reviewForm = document.createElement('div');
      reviewForm.id = 'review-form';
      reviewForm.innerHTML = `
        <h4>Submit Your Review</h4>
        <label>Rating (1-5): </label>
        <input type="number" id="review-rating" min="1" max="5" value="5"><br>
        <textarea id="review-comment" placeholder="Write your review here"></textarea><br>
        <button id="submit-review">Submit Review</button>
      `;
      reviewContainer.appendChild(reviewForm);

      document.getElementById('submit-review').addEventListener('click', async () => {
        const rating = document.getElementById('review-rating').value;
        const comment = document.getElementById('review-comment').value.trim();
        if(!rating || !comment){
          alert('Please provide rating and comment');
          return;
        }

        try {
          const res = await fetch(`/api/products/${id}/reviews`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ rating, comment })
          });
          if(res.ok){
            alert('Review submitted!');
            fetchProduct(); // Refresh reviews
          } else {
            alert('Error submitting review');
          }
        } catch(err){
          console.error(err);
          alert('Error submitting review');
        }
      });
    }

    // --- Related Products ---
    const relatedContainer = document.getElementById('related-products');
    relatedContainer.innerHTML = '';
    const relatedRes = await fetch(`/api/products/related/${product.category}`);
    const related = await relatedRes.json();
    related.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `<img src="${p.images[0]}" alt="${p.name}"><p>${p.name}</p><p>₹${p.price}</p>`;
      div.addEventListener('click', () => window.location.href = `/Product/product.html?id=${p._id}`);
      relatedContainer.appendChild(div);
    });

  } catch(err) {
    console.error(err);
    document.getElementById('product-name').innerText = "Error loading product";
  }
}

fetchProduct();
