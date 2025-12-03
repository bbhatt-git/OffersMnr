// assets/js/app.js
(function () {
  // Navbar + Footer templates (updated for sleek design)
  function renderNav() {
    const nav = document.getElementById("app-nav");
    nav.innerHTML = `
      <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <!-- Logo -->
          <a href="#home" class="text-2xl font-black transition duration-300 hover:opacity-80">
            OFFERS<span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">MNR</span>
          </a>
          
          <!-- Navigation Links -->
          <div class="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" class="hover:text-neon-pink transition duration-200">Home</a>
            <a href="#categories" class="hover:text-neon-pink transition duration-200">Categories</a>
            <a href="#deals" class="hover:text-neon-pink transition duration-200">Deals</a>
            <a href="#stores" class="hover:text-neon-pink transition duration-200">Stores</a>
          </div>
          
          <!-- Actions & Cart -->
          <div class="flex items-center gap-3">
            <!-- Search Icon (Mobile) -->
            <button class="md:hidden p-2 rounded-full glass hover-lift">
              <i data-lucide="search" class="w-5 h-5"></i>
            </button>
            
            <!-- Search Bar (Desktop) -->
            <div class="hidden md:block glass px-4 py-2 rounded-full border border-white/20">
              <div class="flex items-center gap-2">
                <i data-lucide="search" class="w-4 h-4 text-gray-400"></i>
                <input class="bg-transparent outline-none text-sm placeholder-gray-500" placeholder="Search deals..." />
              </div>
            </div>

            <!-- Cart Button -->
            <button onclick="location.hash='#checkout'" class="relative p-2 rounded-full glass hover-lift">
              <i data-lucide="shopping-cart" class="w-5 h-5"></i>
              <span id="cart-count" class="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs bg-neon-pink rounded-full flex items-center justify-center font-bold text-black border-2 border-dark-bg">0</span>
            </button>
            
            <!-- Auth Button -->
            <button id="auth-button" class="px-4 py-2 rounded-full text-sm font-semibold btn-secondary"></button>
            
            <!-- Mobile Menu Toggle -->
            <button class="md:hidden p-2 rounded-full glass hover-lift">
              <i data-lucide="menu" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
      </nav>
    `;
  }

  function renderFooter() {
    const footer = document.getElementById("app-footer");
    footer.innerHTML = `
      <footer class="mt-20 border-t border-white/10 py-12">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div class="col-span-2 md:col-span-2">
            <a href="#home" class="text-2xl font-black">OFFERS<span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">MNR</span></a>
            <p class="text-gray-400 mt-3 text-sm">Discover the best local offers, curated for you.</p>
            <div class="flex gap-4 mt-4">
                <i data-lucide="twitter" class="w-5 h-5 text-gray-400 hover:text-neon-blue transition duration-200"></i>
                <i data-lucide="instagram" class="w-5 h-5 text-gray-400 hover:text-neon-pink transition duration-200"></i>
                <i data-lucide="linkedin" class="w-5 h-5 text-gray-400 hover:text-neon-purple transition duration-200"></i>
            </div>
          </div>
          <div class="text-sm">
            <h4 class="font-bold mb-3 text-white">Quick Links</h4>
            <a href="#home" class="block text-gray-400 hover:text-white mb-1">Home</a>
            <a href="#deals" class="block text-gray-400 hover:text-white mb-1">Deals</a>
            <a href="#categories" class="block text-gray-400 hover:text-white mb-1">Categories</a>
            <a href="#stores" class="block text-gray-400 hover:text-white mb-1">Stores</a>
          </div>
          <div class="text-sm">
            <h4 class="font-bold mb-3 text-white">Support</h4>
            <a href="#" class="block text-gray-400 hover:text-white mb-1">Help Center</a>
            <a href="#" class="block text-gray-400 hover:text-white mb-1">Contact Us</a>
            <a href="#" class="block text-gray-400 hover:text-white mb-1">Privacy Policy</a>
            <a href="#" class="block text-gray-400 hover:text-white mb-1">Terms of Service</a>
          </div>
          <div class="col-span-2 md:col-span-1 text-sm">
            <h4 class="font-bold mb-3 text-white">Join Us</h4>
            <p class="text-gray-400">Get weekly deal updates directly to your inbox.</p>
            <form onsubmit="event.preventDefault(); console.log('Subscribed (demo)!')" class="mt-3">
                <input class="w-full p-2 rounded-lg bg-white/10 text-sm border-white/20 border outline-none focus:border-neon-purple" placeholder="Your Email" required>
                <button class="w-full mt-2 py-2 text-xs rounded-lg btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div class="text-center text-xs text-gray-500 mt-10 border-t border-white/5 pt-6">
            &copy; ${new Date().getFullYear()} OffersMNR. All rights reserved. (Sleek UI Demo)
        </div>
      </footer>
    `;
  }

  // Define routes for hash-based routing
  const routes = {
    "#home": window.renderHome,
    "#categories": window.renderCategories,
    "#deals": window.renderDeals,
    "#stores": window.renderStores,
    "#checkout": window.renderCheckout,
    "#login": window.renderLogin,
    "#register": window.renderRegister
  };

  function route() {
    const hash = window.location.hash || "#home";
    const fn = routes[hash] || window.renderHome;
    fn();
    // Use a slight delay to ensure the DOM is fully updated before initialization
    setTimeout(() => {
      window.initReveal && window.initReveal();
      window.renderIcons && window.renderIcons();
    }, 50); // Increased delay slightly
  }

  // Boot
  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderFooter();

    // wire auth button behavior
    const authButton = document.getElementById("auth-button");
    if (authButton) {
      authButton.addEventListener("click", () => {
        if (window.isLoggedIn) {
          window.logout();
          window.updateAuthUI && window.updateAuthUI();
          location.hash = "#home";
        } else {
          location.hash = "#login";
        }
      });
    }

    // expose basic UI updates
    window.updateCartUI && window.updateCartUI();
    window.updateAuthUI && window.updateAuthUI();

    // initial route
    route();
  });

  window.addEventListener("hashchange", route);

  // make updateAuthUI simple (updated to use new icons/text)
  window.updateAuthUI = function () {
    const btn = document.getElementById("auth-button");
    if (btn) {
      if (window.isLoggedIn) {
        btn.textContent = "Logout";
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      } else {
        btn.textContent = "Login";
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
      }
    }
  };

})();