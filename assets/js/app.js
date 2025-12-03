// assets/js/app.js
(function () {
  // Navbar + Footer templates (kept consistent and glassy)
  function renderNav() {
    const nav = document.getElementById("app-nav");
    nav.innerHTML = `
      <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" class="text-2xl font-black">OFFERS<span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">MNR</span></a>
          
          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center gap-6">
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#deals">Deals</a>
            <a href="#stores">Stores</a>
          </div>

          <!-- Right side: Search, Cart, Auth, and Mobile Toggle -->
          <div class="flex items-center gap-4">
            <div class="hidden md:block glass px-3 py-2 rounded-full">
              <input class="bg-transparent outline-none text-sm" placeholder="Search..." />
            </div>
            <button onclick="location.hash='#checkout'" class="relative">
              <i data-lucide="shopping-cart" class="w-5 h-5"></i>
              <span id="cart-count" class="absolute -top-2 -right-2 w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center text-xs">0</span>
            </button>
            <button id="auth-button" class="hidden md:block px-4 py-2 bg-neon-purple rounded-full">Login</button>
            
            <!-- Mobile Hamburger Button -->
            <button id="mobile-menu-toggle" class="md:hidden p-2 rounded-full glass">
              <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Menu (Hidden by default) -->
        <div id="mobile-menu" class="hidden md:hidden absolute top-[64px] left-0 right-0 glass-nav p-4 shadow-xl">
            <div class="flex flex-col gap-3">
                <a href="#home" class="p-2 hover:bg-white/10 rounded">Home</a>
                <a href="#categories" class="p-2 hover:bg-white/10 rounded">Categories</a>
                <a href="#deals" class="p-2 hover:bg-white/10 rounded">Deals</a>
                <a href="#stores" class="p-2 hover:bg-white/10 rounded">Stores</a>
                <button id="mobile-auth-button" class="w-full py-2 bg-neon-purple rounded-full mt-2">Login</button>
            </div>
        </div>
      </nav>
    `;

    // Attach mobile menu toggle logic
    document.getElementById("mobile-menu-toggle").addEventListener("click", () => {
        const mobileMenu = document.getElementById("mobile-menu");
        mobileMenu.classList.toggle("hidden");
    });
    
    // Wire mobile auth button behavior (clones desktop behavior)
    document.getElementById("mobile-auth-button").addEventListener("click", () => {
        const mobileMenu = document.getElementById("mobile-menu");
        mobileMenu.classList.add("hidden"); // Close menu on action
        if (window.isLoggedIn) {
            window.logout();
            window.updateAuthUI && window.updateAuthUI();
            location.hash = "#home";
        } else {
            location.hash = "#login";
        }
    });
  }

  function renderFooter() {
    const footer = document.getElementById("app-footer");
    // This is the previous, comprehensive footer the user requested.
    footer.innerHTML = `
      <footer class="glass-nav py-8 mt-12">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Logo & Mission -->
          <div>
            <a href="#home" class="text-2xl font-black">OFFERS<span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">MNR</span></a>
            <p class="text-sm text-gray-400 mt-2">Connecting you with the best local deals.</p>
            <div class="flex gap-4 mt-4">
              <a href="#" class="text-gray-400 hover:text-neon-blue transition"><i data-lucide="facebook" class="w-5 h-5"></i></a>
              <a href="#" class="text-gray-400 hover:text-neon-blue transition"><i data-lucide="instagram" class="w-5 h-5"></i></a>
              <a href="#" class="text-gray-400 hover:text-neon-blue transition"><i data-lucide="twitter" class="w-5 h-5"></i></a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-bold mb-3">Quick Links</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#home" class="hover:text-white transition">Home</a></li>
              <li><a href="#deals" class="hover:text-white transition">Exclusive Deals</a></li>
              <li><a href="#stores" class="hover:text-white transition">All Stores</a></li>
              <li><a href="#categories" class="hover:text-white transition">Categories</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h4 class="font-bold mb-3">Support</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>

          <!-- Get Started -->
          <div>
            <h4 class="font-bold mb-3">Join Us</h4>
            <p class="text-sm text-gray-400">Sign up for exclusive early access to flash deals.</p>
            <form onsubmit="event.preventDefault(); alert('Subscribed!');" class="flex mt-3">
              <input type="email" placeholder="Your email" required class="p-2 rounded-l-lg bg-white/10 text-sm focus:outline-none w-full" />
              <button type="submit" class="bg-neon-pink p-2 rounded-r-lg hover:bg-neon-pink/80 transition">
                <i data-lucide="send" class="w-4 h-4"></i>
              </button>
            </form>
          </div>
        </div>
        <div class="max-w-7xl mx-auto px-6 border-t border-white/10 mt-8 pt-6 text-center text-xs text-gray-500">
          &copy; ${new Date().getFullYear()} OffersMNR. All rights reserved.
        </div>
      </footer>
    `;
  }

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
    setTimeout(() => {
      window.initReveal && window.initReveal();
      window.renderIcons && window.renderIcons();
      // Ensure mobile menu is hidden after route change
      const mobileMenu = document.getElementById("mobile-menu");
      if(mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
      }
    }, 30);
  }

  // Boot
  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderFooter();
    // wire auth button behavior for desktop button
    document.getElementById("auth-button").addEventListener("click", () => {
      if (window.isLoggedIn) {
        window.logout();
        window.updateAuthUI && window.updateAuthUI();
        location.hash = "#home";
      } else {
        location.hash = "#login";
      }
    });

    // expose basic UI updates
    window.updateCartUI && window.updateCartUI();
    window.updateAuthUI && window.updateAuthUI();

    // initial route
    route();
  });

  window.addEventListener("hashchange", route);

  // make updateAuthUI simple
  window.updateAuthUI = function () {
    const desktopBtn = document.getElementById("auth-button");
    const mobileBtn = document.getElementById("mobile-auth-button");
    const status = document.getElementById("auth-status");
    
    const text = window.isLoggedIn ? "Logout" : "Login";

    if (desktopBtn) desktopBtn.textContent = text;
    if (mobileBtn) mobileBtn.textContent = text;
    if (status) status.textContent = window.isLoggedIn ? "Status: Logged In" : "Status: Logged Out";
  };

  // expose renderIcons globally for pages
  window.renderIcons = () => lucide.createIcons();
})();