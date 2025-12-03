// assets/js/pages/categories.js
(function () {
  window.renderCategories = function () {
    const root = document.getElementById("app-content");
    root.innerHTML = `
      <main class="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
        <div class="text-center mb-12 reveal">
          <h1 class="text-4xl md:text-5xl font-black">Explore All <span class="text-neon-purple">Categories</span></h1>
          <p class="text-gray-400 mt-3">Discover local shops and deals organized by category.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          ${window.categories.map((cat, i) => {
            const special = cat.special ? 'border-2 border-dashed border-neon-pink text-neon-pink' : '';
            // Added hover effects and gradient icon background
            return `
              <div class="glass p-6 rounded-2xl text-center hover-lift transition-all duration-300 ${special}" style="--delay: ${i * 0.05}s">
                <div class="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-${cat.color}/30 to-white/5 shadow-lg border border-white/10 transition-transform group-hover:scale-105">
                  <i data-lucide="${cat.icon}" class="w-7 h-7 text-white"></i>
                </div>
                <h3 class="font-bold text-lg">${cat.name}</h3>
                <p class="text-sm text-gray-400 mt-1">${cat.count} Deals</p>
                <a href="#deals" class="text-xs text-neon-blue font-semibold mt-3 inline-block hover:underline">View Deals</a>
              </div>
            `;
          }).join("")}
        </div>
      </main>
    `;
    window.initReveal && window.initReveal();
  };
})();