const API_URL = "https://fakestoreapi.com/products";

const productsContainer = document.getElementById("productsContainer");
const cartCountElement = document.getElementById("cartCount");

let cartCount = 0;

async function loadProducts() {
    try {
        productsContainer.innerHTML = '<div class="loading">Loading products...</div>';

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);

        productsContainer.innerHTML = `
            <div class="error">
                <p>Unable to load products.</p>
                <button class="add-btn" onclick="loadProducts()">Try Again</button>
            </div>
        `;
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image-box">
                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${escapeHTML(product.title)}"
                    loading="lazy"
                >
            </div>

            <div class="product-details">
                <h3 class="product-title">${escapeHTML(product.title)}</h3>
                <div class="product-price">$${Number(product.price).toFixed(2)}</div>
                <button class="add-btn" onclick="addToCart()">
                    Add to Cart
                </button>
            </div>
        `;

        productsContainer.appendChild(card);
    });
}

function addToCart() {
    cartCount++;
    cartCountElement.textContent = cartCount;
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

loadProducts();
