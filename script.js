// 1. Mobile Navigation Toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// 2. Bonus: Public API Consumption (Motivational Quote)
// We will fetch a quote to display on the hero section
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const loadingSpinner = document.getElementById('loading');

async function fetchQuote() {
    try {
        // Fetching from a free Quote API
        const response = await fetch('https://api.quotable.io/random?tags=inspirational');
        const data = await response.json();

        // Remove loading state
        loadingSpinner.style.display = 'none';

        // Update UI
        quoteText.innerText = `"${data.content}"`;
        quoteAuthor.innerText = `- ${data.author}`;
    } catch (error) {
        loadingSpinner.style.display = 'none';
        quoteText.innerText = "Empowering lives, one step at a time.";
        console.log("API Error:", error);
    }
}

// Call the function on load
window.addEventListener('load', fetchQuote);


// 3. Form Validation
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('success-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop actual submission
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;

    // Validate Name
    if (name.value.trim() === '') {
        setError(name);
        isValid = false;
    } else {
        removeError(name);
    }

    // Validate Email
    if (email.value.trim() === '' || !isValidEmail(email.value)) {
        setError(email);
        isValid = false;
    } else {
        removeError(email);
    }

    // Validate Message
    if (message.value.trim() === '') {
        setError(message);
        isValid = false;
    } else {
        removeError(message);
    }

    // If all valid, show success
    if (isValid) {
        successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }
});

function setError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
}

function isValidEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}