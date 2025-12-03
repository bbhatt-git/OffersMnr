// assets/js/pages/home.js
(function () {
  function productCardHTML(p) {
    // Determine the color class for the category badge
    let categoryColorClass = 'border-white/10';
    const categoryData = window.categories.find(c => c.name === p.category);
    if (categoryData && categoryData.color) {
      categoryColorClass = `bg-${categoryData.color}/50 border-${categoryData.color}`;
    }

    return `
      <div class="group relative glass rounded-3xl p-4 reveal hover:shadow-2xl transition-shadow">
        <div class="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
          <img src="${p.image}" alt="${p.title}" class="object-cover w-full h-full transition-transform group-hover:scale-105">
          <div class="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full border ${categoryColorClass} shadow-md">${p.category}</div>
          ${p.oldPrice ? `<div class="absolute top-3 right-3 bg-neon-pink text-white text-xs font-bold px-2 py-1 rounded shadow-md">${Math.round((1 - p.price / p.oldPrice) * 100)}% OFF</div>` : ''}
        </div>
        <h3 class="text-xl font-bold mb-1">${p.title}</h3>
        <p class="text-sm text-gray-400 mb-3">${p.store}</p>
        <div class="flex items-center justify-between border-t border-white/10 pt-3">
          <div>
            ${p.oldPrice ? `<span class="text-xs text-gray-500 line-through">NPR ${p.oldPrice.toLocaleString()}</span>` : ''}
            <div class="text-2xl font-black text-neon-pink">NPR ${p.price.toLocaleString()}</div>
          </div>
          <button onclick='addToCart(${JSON.stringify(p)})' class="px-5 py-2 bg-neon-purple rounded-full font-semibold shadow-lg hover:bg-neon-purple/80 transition-colors">
            Add <i data-lucide="plus" class="w-4 h-4 inline-block ml-1"></i>
          </button>
        </div>
      </div>
    `;
  }

  window.renderHome = function () {
    const root = document.getElementById("app-content");
    root.innerHTML = `
      <section class="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="reveal">
            <h1 class="text-6xl md:text-8xl font-black leading-tight">
              Local Deals,<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Instantly Yours.</span>
            </h1>
            <p class="text-xl text-gray-300 mt-6">
              Exclusive offers from local businesses, delivered right to your pocket. Save big on everything from gadgets to groceries.
            </p>
            <div class="mt-8 flex gap-4">
              <a href="#deals" class="px-8 py-3 bg-neon-pink rounded-full font-semibold text-lg shadow-2xl shadow-neon-pink/40 hover:scale-[1.03] transition-transform">Get Started</a>
              <a href="#stores" class="px-8 py-3 glass rounded-full font-semibold text-lg hover:scale-[1.03] transition-transform">Browse Stores</a>
            </div>
          </div>
          <div class="hidden lg:block reveal">
            <img src="hero.png" alt="Illustration" class="w-full rounded-3xl shadow-2xl border border-white/5">
          </div>
        </div>
      </section>

      <main class="max-w-7xl mx-auto px-6 pb-20">
        <div class="mb-8 reveal">
          <div class="flex flex-wrap gap-3 items-center">
            <button class="px-4 py-2 glass rounded-full">All Deals</button>
            <button class="px-4 py-2 glass rounded-full">Electronics</button>
            <button class="px-4 py-2 glass rounded-full">Fashion</button>
            <button class="px-4 py-2 glass rounded-full">Food & Beverages</button><!-- Corrected category name -->
            <button class="px-4 py-2 glass rounded-full">Student Specials</button>
          </div>
        </div>

        <section>
          <div class="flex items-center justify-between mb-6 reveal">
            <div>
              <h2 class="text-3xl font-bold">Trending <span class="text-neon-blue">Now</span></h2>
              <p class="text-gray-400">Handpicked deals expiring soon.</p>
            </div>
            <a href="#deals" class="text-neon-pink font-semibold">View All</a>
          </div>

          <!-- Product list is correctly limited to 8 items (max 2 rows on desktop) -->
          <div id="home-products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
            ${window.products.slice(0, 8).map(productCardHTML).join("")}
          </div>
        </section>

        <section class="mt-20">
          <div class="flex items-center justify-between mb-6 reveal">
            <div>
              <h2 class="text-3xl font-bold">Top <span class="text-neon-purple">Categories</span></h2>
              <p class="text-gray-400">Quick access to popular deal types.</p>
            </div>
            <a href="#categories" class="text-neon-pink font-semibold">View All</a>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 reveal">
            ${window.categories.slice(0, 5).map(cat => {
              const special = cat.special ? 'border-2 border-dashed border-indigo-500' : '';
              return `
                <a href="#deals?category=${cat.name}" class="glass p-6 rounded-2xl text-center ${special} hover:scale-[1.02] transition-transform">
                  <div class="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4" style="background:rgba(255,255,255,0.02);">
                    <i data-lucide="${cat.icon}" class="w-6 h-6 text-white"></i>
                  </div>
                  <h3 class="font-bold">${cat.name}</h3>
                  <p class="text-xs text-gray-400 mt-1">${cat.count} deals</p>
                </a>
              `;
            }).join("")}
          </div>
        </section>
      </main>
    `;
    window.initReveal && window.initReveal();
    window.renderIcons && window.renderIcons();
  };
})();