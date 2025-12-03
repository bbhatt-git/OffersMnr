// assets/js/pages/deals.js
(function () {
  // Global state for filtering and sorting
  window.dealsState = {
    currentCategory: 'All',
    currentSort: 'default', // 'default', 'price-low-high', 'price-high-low', 'discount-high-low'
    searchQuery: ''
  };

  /**
   * Generates the HTML card for a single product.
   * @param {Object} p - The product object.
   * @returns {string} The product card HTML.
   */
  function productCardHTML(p) {
    const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    const discountBadge = discount > 0 ? `<div class="absolute top-3 right-3 bg-neon-pink text-white text-xs font-bold px-2 py-1 rounded shadow-md">${discount}% OFF</div>` : '';

    return `
      <div class="group relative glass rounded-3xl p-4 reveal hover:shadow-2xl hover:border-neon-blue transition-all duration-300 border border-transparent">
        <div class="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
          <img src="${p.image}" alt="${p.title}" class="object-cover w-full h-full transition-transform group-hover:scale-105">
          <div class="absolute top-3 left-3 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">${p.category}</div>
          ${discountBadge}
        </div>
        <h3 class="text-xl font-bold mb-1 group-hover:text-neon-blue transition-colors">${p.title}</h3>
        <p class="text-sm text-gray-400 mb-3">${p.store}</p>
        <div class="flex items-center justify-between border-t border-white/10 pt-3">
          <div>
            ${p.oldPrice ? `<span class="text-xs text-gray-500 line-through">NPR ${p.oldPrice.toLocaleString()}</span>` : ''}
            <div class="text-xl font-black">NPR ${p.price.toLocaleString()}</div>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-2 rounded-full glass border border-white/10 hover:bg-white/10 transition-colors" onclick='window.addToCart(${JSON.stringify(p)})'>
                <i data-lucide="shopping-bag" class="w-5 h-5"></i>
            </button>
            <button class="px-4 py-2 rounded-full bg-neon-blue font-semibold hover:bg-blue-600 transition-colors" onclick='window.addToCart(${JSON.stringify(p)}); location.hash="#checkout"'>
                Buy Now
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Applies current filters and sorting to the product list.
   * @returns {Array} The filtered and sorted array of products.
   */
  function getFilteredAndSortedDeals() {
    let filtered = window.products;
    const state = window.dealsState;

    // 1. Filtering by Category
    if (state.currentCategory !== 'All') {
      filtered = filtered.filter(p => p.category === state.currentCategory);
    }

    // 2. Filtering by Search Query (Title/Store)
    if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.store.toLowerCase().includes(query)
        );
    }

    // 3. Sorting
    filtered.sort((a, b) => {
      switch (state.currentSort) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'discount-high-low':
          // Calculate discount percentage for sorting
          const discountA = a.oldPrice ? (1 - a.price / a.oldPrice) : 0;
          const discountB = b.oldPrice ? (1 - b.price / b.oldPrice) : 0;
          return discountB - discountA;
        case 'default':
        default:
          return 0; // Maintain original order
      }
    });

    return filtered;
  }

  /**
   * Rerenders only the product grid based on the current state.
   */
  window.updateDealsGrid = function() {
    const dealsGrid = document.getElementById('deals-grid');
    if (!dealsGrid) return;

    const filteredProducts = getFilteredAndSortedDeals();
    
    if (filteredProducts.length === 0) {
        dealsGrid.innerHTML = `
            <div class="col-span-full text-center py-16 glass rounded-2xl">
                <i data-lucide="frown" class="w-12 h-12 text-neon-pink mx-auto mb-4"></i>
                <h3 class="text-xl font-bold">No Deals Found</h3>
                <p class="text-gray-400">Try adjusting your filters, sorting, or search query.</p>
            </div>
        `;
    } else {
        dealsGrid.innerHTML = filteredProducts.map(productCardHTML).join("");
    }
    
    // Ensure icons are re-rendered and new elements reveal
    window.renderIcons && window.renderIcons();
    window.initReveal && window.initReveal();
  };

  /**
   * Handlers for user interaction (called from HTML)
   */
  window.setDealCategory = function(category) {
    window.dealsState.currentCategory = category;
    
    // Update active category button styles
    document.querySelectorAll('#category-filters button').forEach(btn => {
        btn.classList.remove('bg-neon-blue', 'text-white');
        btn.classList.add('glass');
    });
    document.getElementById(`cat-btn-${category.replace(/\s/g, '-')}`).classList.remove('glass');
    document.getElementById(`cat-btn-${category.replace(/\s/g, '-')}`).classList.add('bg-neon-blue', 'text-white');

    window.updateDealsGrid();
  };

  window.setDealSort = function(sortValue) {
    window.dealsState.currentSort = sortValue;
    window.updateDealsGrid();
  };

  window.setDealSearch = function(event) {
    window.dealsState.searchQuery = event.target.value;
    window.updateDealsGrid();
  };


  window.renderDeals = function () {
    const root = document.getElementById("app-content");
    
    // Ensure initial state is applied
    const initialCategory = window.dealsState.currentCategory;
    const allCategories = ['All', ...window.categories.map(c => c.name)];

    // HTML for Category Filter Buttons
    const categoryFiltersHTML = allCategories.map(cat => {
        const id = `cat-btn-${cat.replace(/\s/g, '-')}`;
        const isActive = cat === initialCategory ? 'bg-neon-blue text-white' : 'glass';
        return `<button id="${id}" class="px-4 py-2 rounded-full ${isActive} hover:scale-105 transition-transform duration-200" onclick="window.setDealCategory('${cat}')">${cat}</button>`;
    }).join('');
    
    // Set up the full page layout
    root.innerHTML = `
      <main class="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
        <div class="text-center mb-12 reveal">
          <h1 class="text-4xl md:text-5xl font-black">Exclusive <span class="text-neon-blue">Deals</span></h1>
          <p class="text-gray-400 mt-3">Hot offers and flash sales you can't miss.</p>
        </div>

        <!-- Filter, Sort, and Search Controls -->
        <div class="mb-10 space-y-6 reveal">
            <!-- Search Bar -->
            <div class="w-full">
                <div class="glass p-3 rounded-full flex items-center shadow-lg">
                    <i data-lucide="search" class="w-5 h-5 text-gray-400 ml-2"></i>
                    <input 
                        id="deal-search-input"
                        type="text"
                        placeholder="Search deals by title or store..."
                        value="${window.dealsState.searchQuery}"
                        oninput="window.setDealSearch(event)"
                        class="bg-transparent outline-none w-full px-4 text-white placeholder-gray-500"
                    />
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <!-- Category Filters -->
                <div id="category-filters" class="flex flex-wrap gap-3">
                    ${categoryFiltersHTML}
                </div>

                <!-- Sort Dropdown -->
                <div class="flex items-center gap-3">
                    <label for="deal-sort" class="text-gray-400 whitespace-nowrap">Sort by:</label>
                    <select id="deal-sort" onchange="window.setDealSort(this.value)" 
                            class="glass p-2 rounded-xl border border-white/10 bg-transparent outline-none focus:ring-1 focus:ring-neon-purple text-sm appearance-none cursor-pointer">
                        <option value="default" class="bg-dark-bg" ${window.dealsState.currentSort === 'default' ? 'selected' : ''}>Default</option>
                        <option value="price-low-high" class="bg-dark-bg" ${window.dealsState.currentSort === 'price-low-high' ? 'selected' : ''}>Price: Low to High</option>
                        <option value="price-high-low" class="bg-dark-bg" ${window.dealsState.currentSort === 'price-high-low' ? 'selected' : ''}>Price: High to Low</option>
                        <option value="discount-high-low" class="bg-dark-bg" ${window.dealsState.currentSort === 'discount-high-low' ? 'selected' : ''}>Best Discount</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Product Grid -->
        <div id="deals-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Product cards will be injected here by updateDealsGrid() -->
        </div>
      </main>
    `;

    // Initial render of the product grid based on state
    window.updateDealsGrid();

    // Initialize UI features
    window.initReveal && window.initReveal();
    window.renderIcons && window.renderIcons();
  };
})();