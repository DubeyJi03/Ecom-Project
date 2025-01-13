// Cart Array
let cart = [];

// Load cart from localStorage
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }
});

// Function to add product to cart
function addToCart(productId, productName, productPrice) {
    // Check if product already exists in the cart
    const existingProduct = cart.find(product => product.id === productId);
    
    if (existingProduct) {
        // Increment quantity if the product is already in the cart
        existingProduct.quantity++;
    } else {
        // Add new product to cart
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Show alert to confirm product is added to cart
    alert(`${productName} has been added to the cart.`);

    // Save to localStorage and update cart
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    cartItemsElement.innerHTML = ''; // Clear the cart table

    let total = 0;

    // Loop through cart and generate HTML for each item
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="changeQuantity(${item.id}, this.value)"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        `;
        cartItemsElement.appendChild(row);
        total += item.price * item.quantity;
    });

    // Update total price in the cart
    cartTotalElement.textContent = total.toFixed(2);
}

// Function to change quantity
function changeQuantity(productId, quantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(quantity);
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    }
}

// Function to remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to proceed to checkout
function proceedToCheckout() {
    const checkoutPage = document.getElementById('checkoutPage');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const cartTotal = document.getElementById('cartTotal').textContent;

    if (cart.length === 0) {
        alert("Your cart is empty! Please add some products.");
        return;
    }

    // Display checkout page and total
    checkoutPage.style.display = 'block';
    checkoutTotal.textContent = cartTotal;
}

// Function to validate checkout form
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const paymentMethod = document.getElementById('paymentMethod');

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    // Simple validation checks
    if (!name.value.trim()) {
        isValid = false;
        document.getElementById('nameError').textContent = 'Name is required';
    }
    if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
        isValid = false;
        document.getElementById('emailError').textContent = 'Valid email is required';
    }
    if (!phone.value.trim() || !/^\d{10}$/.test(phone.value)) {
        isValid = false;
        document.getElementById('phoneError').textContent = 'Valid 10-digit phone number is required';
    }
    if (!address.value.trim()) {
        isValid = false;
        document.getElementById('addressError').textContent = 'Address is required';
    }
    if (!paymentMethod.value) {
        isValid = false;
        document.getElementById('paymentError').textContent = 'Please select a payment method';
    }

    if (isValid) {
        completePurchase();
    }
});

// Function to complete the purchase
function completePurchase() {
    alert("Purchase Completed! Thank you for shopping.");
    cart = []; // Clear the cart
    localStorage.removeItem('cart'); // Clear
 updateCart();
    
    // Redirect or refresh (for demonstration purposes, we just reload)
    location.reload();
}
