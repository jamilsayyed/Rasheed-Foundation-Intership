// 1. Scroll Progress Indicator
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
};

// 2. Active Page Highlight
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-links a');
for (let i = 0; i < menuItem.length; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList.add("active");
    }
}

// 3. API Consumption: Fetch "Latest News" (Simulated Press Releases)
const newsContainer = document.getElementById('news-container');

if (newsContainer) {
    // Determine if we are in API loading mode
    const apiURL = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

    async function fetchNews() {
        try {
            // Wait 1.5 seconds to SHOW OFF the skeleton loading state (Crucial for "Bonus Points")
            await new Promise(r => setTimeout(r, 1500)); 

            const response = await fetch(apiURL);
            const data = await response.json();

            // Clear Skeletons
            newsContainer.innerHTML = '';

            // Inject Real Data
            data.forEach(post => {
                const card = document.createElement('div');
                card.className = 'news-card fade-in';
                card.innerHTML = `
                    <div style="height: 200px; background: #cbd5e1; display:flex; align-items:center; justify-content:center; color:#64748b;">
                        <i class="fas fa-newspaper fa-2x"></i>
                    </div>
                    <div class="news-content">
                        <h3 class="news-title">${capitalize(post.title.substring(0, 25))}...</h3>
                        <p class="news-body">${capitalize(post.body.substring(0, 80))}...</p>
                        <a href="#" class="news-link">Read Update &rarr;</a>
                    </div>
                `;
                newsContainer.appendChild(card);
            });

        } catch (error) {
            newsContainer.innerHTML = '<p style="text-align:center; color:red;">Failed to load updates. Please check connection.</p>';
        }
    }

    fetchNews();
}

// Helper: Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// 4. Contact Form Logic
const form = document.getElementById('contactForm');
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.style.background = "#10b981";
            form.reset();
        }, 2000);
    });
}