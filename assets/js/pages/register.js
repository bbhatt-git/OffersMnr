// assets/js/pages/register.js
(function () {
  window.renderRegister = function () {
    const root = document.getElementById("app-content");
    root.innerHTML = `
      <main class="max-w-md mx-auto px-6 py-20 min-h-[60vh] flex items-center justify-center">
        <div class="glass p-8 rounded-3xl w-full reveal">
          <h2 class="text-3xl font-bold mb-2 text-center">Create Account</h2>
          <p class="text-gray-400 mb-6 text-center">Join OffersMNR (demo).</p>
          <form onsubmit="event.preventDefault(); alert('Registered (demo). Please login.'); location.hash='#login'">
            <input required placeholder="Full name" class="w-full p-3 rounded mb-3 bg-white/5 focus:ring-2 focus:ring-neon-pink outline-none transition-colors" />
            <input required placeholder="Email" class="w-full p-3 rounded mb-3 bg-white/5 focus:ring-2 focus:ring-neon-pink outline-none transition-colors" />
            <input required type="password" placeholder="Password" class="w-full p-3 rounded mb-3 bg-white/5 focus:ring-2 focus:ring-neon-pink outline-none transition-colors" />
            <button class="w-full py-3 bg-neon-pink rounded-full font-semibold hover:bg-neon-pink/80 transition-colors mt-2">Create Account</button>
          </form>
          <p class="text-center text-sm text-gray-400 mt-4">Already have an account? <a href="#login" class="text-neon-blue hover:underline">Sign In</a></p>
        </div>
      </main>
    `;
    window.initReveal && window.initReveal();
    window.renderIcons && window.renderIcons();
  };
})();