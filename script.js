// 1. Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if(burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. Highlight Active Page
const currentPath = window.location.pathname.split("/").pop();
const menuItems = document.querySelectorAll('.nav-links a');

menuItems.forEach(item => {
    // If href matches current path (or if root and href is index.html)
    if(item.getAttribute('href') === currentPath || (currentPath === '' && item.getAttribute('href') === 'index.html')) {
        item.classList.add('active');
    }
});

// 3. Form Simulation
const form = document.getElementById('contactForm');
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = "Processing...";
        btn.style.opacity = "0.7";

        setTimeout(() => {
            btn.innerText = "Success! We'll reach out.";
            btn.style.background = "#fff";
            btn.style.color = "#000";
            form.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = ""; // Reset to gradient
                btn.style.color = "";
                btn.style.opacity = "1";
            }, 3000);
        }, 1500);
    });
}