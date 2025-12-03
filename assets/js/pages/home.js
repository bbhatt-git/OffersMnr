// assets/js/pages/home.js
(function () {
  function productCardHTML(p) {
    return `
      <div class="group relative glass rounded-3xl p-4 reveal hover:shadow-2xl transition-shadow">
        <div class="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
          <img src="${p.image}" alt="${p.title}" class="object-cover w-full h-full transition-transform group-hover:scale-105">
          <div class="absolute top-3 left-3 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">${p.category}</div>
          ${p.oldPrice ? `<div class="absolute top-3 right-3 bg-neon-pink text-white text-xs font-bold px-2 py-1 rounded shadow-md">${Math.round((1 - p.price / p.oldPrice) * 100)}% OFF</div>` : ''}
        </div>
        <h3 class="text-xl font-bold mb-1">${p.title}</h3>
        <p class="text-sm text-gray-400 mb-3">${p.store}</p>
        <div class="flex items-center justify-between border-t border-white/10 pt-3">
          <div>
            ${p.oldPrice ? `<span class="text-xs text-gray-500 line-through">NPR ${p.oldPrice.toLocaleString()}</span>` : ''}
            <div class="text-2xl font-black text-neon-blue">NPR ${p.price.toLocaleString()}</div>
          </div>
          <button onclick='addToCart(${JSON.stringify(p)})' class="p-3 rounded-full bg-neon-purple/20 hover:bg-neon-purple transition hover:shadow-lg">
            <i data-lucide="shopping-cart" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    `;
  }

  function categoryPillHTML(c) {
    const color = c.color || "gray-500";
    return `
      <div class="flex flex-col items-center glass p-6 rounded-2xl reveal hover:shadow-xl hover:scale-[1.02] transition-transform cursor-pointer">
        <div class="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 bg-white/5">
          <i data-lucide="${c.icon}" class="w-6 h-6 text-${c.color}"></i>
        </div>
        <h3 class="font-bold">${c.name}</h3>
        <p class="text-xs text-gray-400 mt-1">${c.count}</p>
      </div>
    `;
  }

  window.renderHome = function () {
    const root = document.getElementById("app-content");
    root.innerHTML = `
      <!-- Hero Section -->
      <section class="max-w-7xl mx-auto px-6 pt-10 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[70vh]">
        <div class="reveal">
          <h1 class="text-6xl md:text-8xl font-black leading-tight">
            Find <span class="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Local Deals</span> Instantly.
          </h1>
          <p class="text-xl text-gray-400 mt-6 max-w-lg">
            OffersMNR connects you with the best discounts and exclusive coupons from businesses in your neighborhood.
          </p>
          <div class="mt-8 flex gap-4">
            <a href="#deals" class="px-8 py-3 bg-neon-blue rounded-full font-bold hover:bg-neon-blue/80 transition shadow-lg">Browse Deals</a>
            <a href="#stores" class="px-8 py-3 glass rounded-full font-bold hover:bg-white/10 transition">Find Stores</a>
          </div>
        </div>
        <div class="reveal md:order-last order-first">
          <img src="hero.png" alt="Map Illustration" class="w-full rounded-3xl shadow-2xl glass p-4" onerror="this.onerror=null; this.src='https://placehold.co/600x400/1e293b/FFFFFF?text=Local+Map';" />
        </div>
      </section>

      <main class="max-w-7xl mx-auto px-6 pb-20">
        <!-- CATEGORY FILTER BAR REMOVED FROM HERE -->

        <section class="mt-12">
          <div class="flex items-center justify-between mb-6 reveal">
            <div>
              <h2 class="text-3xl font-bold">Top <span class="text-neon-purple">Categories</span></h2>
              <p class="text-gray-400">Shop by our most popular deal types.</p>
            </div>
            <a href="#categories" class="text-neon-pink font-semibold">View All</a>
          </div>
          <div id="home-categories" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            ${window.categories.slice(0, 5).map(categoryPillHTML).join("")}
          </div>
        </section>

        <section class="mt-12">
          <div class="flex items-center justify-between mb-6 reveal">
            <div>
              <h2 class="text-3xl font-bold">Trending <span class="text-neon-blue">Now</span></h2>
              <p class="text-gray-400">Handpicked deals expiring soon.</p>
            </div>
            <a href="#deals" class="text-neon-pink font-semibold">View All</a>
          </div>

          <div id="home-products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
            ${window.products.slice(0, 8).map(productCardHTML).join("")}
          </div>
        </section>
      </main>
    `;

    window.initReveal && window.initReveal();
    window.renderIcons && window.renderIcons();
  };
})();