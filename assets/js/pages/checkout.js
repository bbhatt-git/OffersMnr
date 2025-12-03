// assets/js/pages/checkout.js
(function () {
  function format(n){ return n.toLocaleString(); }

  // IMPORTANT: The Google Apps Script Web App URL is now set.
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyWpN6JlXyUczc-UL0m8vMkKsSPWbHWO3k0RUUNCKvltwMig5CixGlJomP2U00Kqj2g/exec"; 
  
  /**
   * Handles the submission of the order form and sends data to Google Sheet.
   * @param {number} payableAmount - The final amount the user needs to pay.
   */
  window.submitOrder = async function(payableAmount) {
    const form = document.getElementById('checkout-form');
    
    // Check form validity before proceeding
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const orderData = {
        // Customer Details (Must match field names in the Google Script's HEADERS array: fullName, address, etc.)
        fullName: formData.get('fullName'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        email: formData.get('email') || 'N/A', // Use N/A if email is optional and empty
        payableAmount: payableAmount,
        // Product/Order Details
        cartItems: Object.values(window.cart || {}).map(item => ({
            title: item.title,
            price: item.price,
            store: item.store,
            quantity: item.quantity
        }))
    };
    
    // Show loading state
    const checkoutBtn = document.getElementById('checkout-button');
    const originalText = checkoutBtn.innerHTML;
    checkoutBtn.innerHTML = '<i data-lucide="loader-circle" class="w-5 h-5 animate-spin"></i> Processing...';
    checkoutBtn.disabled = true;

    // Retry logic for API calls
    const maxRetries = 3;
    let attempt = 0;
    let success = false;
    
    while (attempt < maxRetries && !success) {
      try {
        // Exponential backoff delay
        if (attempt > 0) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }

        const response = await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors', // Use 'no-cors' for simple form submissions to Google Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        // Due to 'no-cors', we can't inspect the response content directly, 
        // but a successful fetch attempt implies the request was sent.
        // We assume success here unless an error is thrown by fetch.
        success = true;

      } catch (error) {
          console.error(`Attempt ${attempt + 1} failed:`, error);
          attempt++;
          if (attempt >= maxRetries) {
            console.error("All submission attempts failed.");
          }
      }
    }


    // Handle Success/Failure UI update
    const modal = document.getElementById('checkout-modal');

    if (success) {
      // Show success message
      modal.innerHTML = `
          <div class="glass p-8 rounded-3xl text-center">
              <i data-lucide="check-circle" class="w-12 h-12 text-green-500 mx-auto mb-4"></i>
              <h2 class="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
              <p class="text-gray-400 mb-6">Your order has been recorded. We will contact you soon for delivery.</p>
              <button class="py-3 px-6 bg-neon-blue rounded-full" onclick="location.hash='#home'">Go to Home</button>
          </div>
      `;
      // Clear the cart
      window.cart = {};
      window.saveCart();
      window.updateCartUI();
      window.renderIcons && window.renderIcons();
    } else {
      // Show error message
      modal.innerHTML = `
          <div class="glass p-8 rounded-3xl text-center">
              <i data-lucide="x-circle" class="w-12 h-12 text-neon-pink mx-auto mb-4"></i>
              <h2 class="text-2xl font-bold mb-2">Order Submission Failed</h2>
              <p class="text-gray-400 mb-6">We could not submit your order. Please check your network or try again later.</p>
              <button class="py-3 px-6 bg-neon-purple rounded-full" onclick="window.renderCheckout()">Try Again</button>
          </div>
      `;
      // Reset button state (in case user clicks 'Try Again')
      checkoutBtn.innerHTML = originalText;
      checkoutBtn.disabled = false;
      window.renderIcons && window.renderIcons();
    }
  };

  window.renderCheckout = function () {
    const root = document.getElementById("app-content");
    const cartArray = Object.values(window.cart || {});
    
    if (!cartArray.length) {
      root.innerHTML = `
        <main class="max-w-7xl mx-auto px-6 py-20 min-h-[60vh]">
          <div class="text-center reveal">
            <h2 class="text-2xl font-bold">Your Cart is Empty</h2>
            <p class="text-gray-400 mt-2">Add deals from the homepage or deals page.</p>
            <a href="#deals" class="mt-6 inline-block px-6 py-3 bg-neon-purple rounded-full btn-primary">Browse Deals</a>
          </div>
        </main>
      `;
      window.initReveal && window.initReveal();
      return;
    }

    let total = 0;
    const itemsHTML = cartArray.map(item => {
      const sub = item.price * (item.quantity || 1);
      total += sub;
      return `
        <div class="flex justify-between items-center py-4 border-b border-white/10 reveal">
          <div class="flex items-center gap-4">
            <img src="${item.image}" class="w-16 h-16 rounded-md object-cover" alt="${item.title}" onerror="this.onerror=null; this.src='https://placehold.co/64x64/1e293b/FFFFFF?text=Item';" />
            <div>
              <h4 class="font-semibold">${item.title}</h4>
              <p class="text-sm text-gray-400">Store: ${item.store}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold">NPR ${format(item.price)} x ${item.quantity}</p>
            <button class="text-red-400 text-xs mt-1 hover:underline" onclick="removeItem('${item.id}'); window.renderCheckout();">Remove</button>
          </div>
        </div>
      `;
    }).join("");

    const discount = Math.round(total * 0.05); // 5% Discount
    const payable = total - discount;

    root.innerHTML = `
      <div id="checkout-modal">
        <main class="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
          <h1 class="text-4xl font-black mb-10 reveal">Secure <span class="text-neon-blue">Checkout</span></h1>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Column: Delivery Details Form -->
            <div class="lg:col-span-2 glass p-8 rounded-3xl reveal">
              <h3 class="text-2xl font-bold mb-6 border-b border-white/10 pb-3">Delivery Details</h3>
              <form id="checkout-form" onsubmit="event.preventDefault(); window.submitOrder(${payable});">
                
                <div class="mb-4">
                  <label for="fullName" class="block text-sm font-medium mb-1 text-gray-300">Full Name (Required)</label>
                  <input type="text" id="fullName" name="fullName" required 
                         class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-neon-blue outline-none transition" 
                         placeholder="Enter your full name">
                </div>

                <div class="mb-4">
                  <label for="address" class="block text-sm font-medium mb-1 text-gray-300">Delivery Address (Required)</label>
                  <textarea id="address" name="address" required rows="2"
                            class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-neon-blue outline-none transition" 
                            placeholder="Street, City, Zone"></textarea>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="mb-4">
                      <label for="phone" class="block text-sm font-medium mb-1 text-gray-300">Phone No. (Required)</label>
                      <input type="tel" id="phone" name="phone" required 
                             class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-neon-blue outline-none transition" 
                             placeholder="e.g., 98XXXXXXXX">
                    </div>

                    <div class="mb-4">
                      <label for="email" class="block text-sm font-medium mb-1 text-gray-300">Email (Optional)</label>
                      <input type="email" id="email" name="email"
                             class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-neon-blue outline-none transition" 
                             placeholder="yourname@example.com">
                    </div>
                </div>
                
                <div class="mt-6">
                    <button id="checkout-button" type="submit" class="w-full py-4 bg-neon-blue rounded-full text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-neon-blue/30">
                        Confirm Order & Pay NPR ${format(payable)}
                    </button>
                    <p class="text-xs text-gray-500 mt-2 text-center">Payment method: Cash on Delivery (COD)</p>
                </div>
              </form>
            </div>
            
            <!-- Right Column: Order Summary & Items -->
            <div class="space-y-6">
              <div class="glass p-6 rounded-3xl reveal" style="--delay: 0.1s">
                <h3 class="text-xl font-bold mb-4">Order Summary</h3>
                <div class="flex justify-between text-gray-300 mb-2"><span>Subtotal (${cartArray.length} items)</span><span>NPR ${format(total)}</span></div>
                <div class="flex justify-between text-gray-300 mb-2"><span>Discount (5% off)</span><span class="text-green-400">- NPR ${format(discount)}</span></div>
                <div class="flex justify-between text-gray-300 mb-4"><span>Shipping (COD)</span><span>Free</span></div>
                <div class="border-t border-white/10 pt-4 font-black text-2xl flex justify-between"><span>Total Payable</span><span class="text-neon-pink">NPR ${format(payable)}</span></div>
              </div>

              <div class="glass p-6 rounded-3xl reveal" style="--delay: 0.2s">
                <h3 class="text-xl font-bold mb-4">Items in Cart</h3>
                ${itemsHTML}
              </div>
            </div>
          </div>
        </main>
      </div>
    `;
    window.initReveal && window.initReveal();
    window.renderIcons && window.renderIcons();
  };
})();