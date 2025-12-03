// assets/js/pages/stores.js
(function () {
  window.renderStores = function () {
    const stores = [
      { name: 'TechHub MNR', slogan: 'Gadgets & Gear', deals: 35, icon: 'cpu' },
      { name: 'The Fashion Street', slogan: 'Latest Styles', deals: 42, icon: 'hanger' },
      { name: 'Burger House', slogan: 'Best Burgers', deals: 15, icon: 'crown' },
      { name: 'Mellow Groceries', slogan: 'Fresh & Organic', deals: 28, icon: 'leaf' },
      { name: 'Apex Fitness', slogan: 'Train Hard, Win Big', deals: 10, icon: 'dumbbell' }
    ];

    const root = document.getElementById("app-content");
    root.innerHTML = `
      <main class="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
        <div class="text-center mb-12 reveal">
          <h1 class="text-4xl md:text-5xl font-black">All <span class="text-green-400">Stores</span></h1>
          <p class="text-gray-400 mt-3">Local businesses with exclusive OffersMNR deals.</p>
        </div>

        <!-- Responsive Store Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          ${stores.map(s => `
            <div class="glass p-6 rounded-2xl hover:shadow-xl hover:shadow-white/5 transition-shadow">
              <div class="flex items-center gap-4 mb-4">
                <div class="p-3 rounded-full bg-neon-purple/10">
                  <i data-lucide="${s.icon}" class="w-6 h-6 text-neon-purple"></i>
                </div>
                <div>
                  <h3 class="font-bold text-xl">${s.name}</h3>
                  <div class="text-sm text-gray-400">${s.slogan}</div>
                </div>
              </div>
              <div class="text-gray-300">Currently <span class="text-neon-pink font-semibold">${s.deals}</span> active deals.</div>
              <button class="mt-4 w-full py-2 bg-neon-blue rounded-full text-sm font-semibold hover:bg-neon-blue/80 transition-colors">View Deals</button>
            </div>
          `).join("")}
        </div>
      </main>
    `;
    window.initReveal && window.initReveal();
    window.renderIcons && window.renderIcons();
  };
})();