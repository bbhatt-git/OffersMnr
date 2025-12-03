// assets/js/pages/stores.js
(function () {
  window.renderStores = function () {
    const stores = [
      { name: 'TechHub MNR', slogan: 'Gadgets & Gear', deals: 35, icon: 'cpu', color: 'neon-blue' },
      { name: 'The Fashion Street', slogan: 'Latest Styles', deals: 42, icon: 'hanger', color: 'neon-pink' },
      { name: 'Burger House', slogan: 'Best Burgers', deals: 15, icon: 'crown', color: 'yellow-500' },
      { name: 'Mellow Groceries', slogan: 'Fresh & Organic', deals: 28, icon: 'leaf', color: 'green-500' }
    ];

    const root = document.getElementById("app-content");
    root.innerHTML = `
      <main class="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
        <div class="text-center mb-12 reveal">
          <h1 class="text-4xl md:text-5xl font-black">All <span class="text-green-400">Stores</span></h1>
          <p class="text-gray-400 mt-3">Local businesses with exclusive OffersMNR deals.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          ${stores.map((s, i) => `
            <div class="glass p-6 rounded-3xl reveal hover-lift transition-all duration-300" style="--delay: ${i * 0.05}s">
              <div class="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                <div class="p-4 rounded-full bg-${s.color}/10 border border-${s.color}/30 shadow-lg shadow-${s.color}/10">
                  <i data-lucide="${s.icon}" class="w-7 h-7 text-${s.color}"></i>
                </div>
                <div>
                  <h3 class="font-bold text-xl">${s.name}</h3>
                  <div class="text-sm text-gray-400">${s.slogan}</div>
                </div>
              </div>
              <div class="text-gray-300 text-sm">Currently <span class="text-neon-pink font-extrabold">${s.deals}</span> active deals.</div>
              <button class="mt-4 w-full py-2 text-sm rounded-full bg-neon-purple hover:bg-neon-purple/90 transition duration-200 font-semibold">
                View Store Deals
              </button>
            </div>
          `).join("")}
        </div>
      </main>
    `;
    window.initReveal && window.initReveal();
    window.renderIcons && window.renderIcons();
  };
})();