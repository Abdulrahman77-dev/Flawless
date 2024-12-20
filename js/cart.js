// Updated cart.js for Cart Page

const cartItemsContainer = document.getElementById("cart-items");
const totalItemsElement = document.getElementById("total-items");
const totalPriceElement = document.getElementById("total-price");

// Retrieve cart from localStorage or initialize as an empty array
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function renderCart() {
    cartItemsContainer.innerHTML = ""; // Clear existing items
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td class="counter">
                <button class="quantity-btn" data-id="${item.id}" data-change="1">+</button>
                ${item.quantity}
                <button class="quantity-btn" data-id="${item.id}" data-change="-1">-</button>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
            <td><button class="remove-btn" data-id="${item.id}"><img src="imgs/del.png" alt=""></button></td>
        `;

        cartItemsContainer.appendChild(row);

        totalItems += item.quantity;
        totalPrice += item.quantity * item.price;
    });

    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toFixed(2);

    saveCart();
}

function updateQuantity(id, change) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            renderCart();
        }
    }
}

function removeItem(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    renderCart();
}

// Event delegation for cart actions
cartItemsContainer.addEventListener("click", event => {
    const target = event.target;

    if (target.classList.contains("quantity-btn")) {
        const id = target.dataset.id;
        const change = parseInt(target.dataset.change, 10);
        updateQuantity(id, change);
    }

    if (target.classList.contains("remove-btn")) {
        const id = target.dataset.id;
        removeItem(id);
    }
});

// Initial render
renderCart();

// Checkout button functionality
document.getElementById("checkout-button").addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Proceeding to checkout!");
        // Additional checkout logic can go here
    }
});
