// Updated main.js for Homepage

const addToCartButtons = document.querySelectorAll(".product-card button");

addToCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productCard = event.target.closest(".product-card");

        const product = {
            id: productCard.dataset.id || productCard.querySelector('h3').textContent.toLowerCase(),
            name: productCard.querySelector("h3").textContent,
            price: parseFloat(productCard.querySelector("p").textContent.replace("$", "")),
            quantity: 1
        };

        // Get the existing cart from localStorage or initialize an empty array
        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increment quantity
        } else {
            cart.push(product); // Add new product
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cart));

        alert(`${product.name} has been added to your cart.`);
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Form validation
const contactForm = document.querySelector(".contact form");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = contactForm.querySelector("input[type='text']").value.trim();
    const email = contactForm.querySelector("input[type='email']").value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Thank you for your message!");
    contactForm.reset();
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
