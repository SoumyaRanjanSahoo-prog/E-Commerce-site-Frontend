// Sample products
const products = [
    {
        id: 1,
        name: "Classic Sneakers",
        description: "Comfortable and stylish sneakers for everyday wear.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1517263904808-5dcbb1b2e1c2?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "Leather Backpack",
        description: "Spacious and durable leather backpack.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        description: "Noise-cancelling headphones with long battery life.",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "Smart Watch",
        description: "Track your fitness and stay connected.",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    }
];

let cart = [];

// Render products
function renderProducts() {
    const productsEl = document.getElementById('products');
    productsEl.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        card.querySelector('button').onclick = () => addToCart(product.id);
        productsEl.appendChild(card);
    });
}

// Add product to cart
function addToCart(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({...product, quantity: 1});
    }
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Render cart sidebar
function renderCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const cartItemsEl = document.getElementById('cart-items');
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button data-id="${item.id}" style="background:#e74c3c;color:#fff;border:none;padding:2px 6px;border-radius:3px;cursor:pointer;">Remove</button>
        `;
        li.querySelector('button').onclick = () => removeFromCart(item.id);
        cartItemsEl.appendChild(li);
    });
    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Show/Hide cart sidebar
document.getElementById('cart-btn').onclick = () => {
    document.getElementById('cart-sidebar').classList.remove('hidden');
    renderCart();
};

document.getElementById('close-cart').onclick = () => {
    document.getElementById('cart-sidebar').classList.add('hidden');
};

// Initial render
renderProducts();
updateCartCount();