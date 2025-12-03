// assets/js/pages/login.js
(function () {
  window.renderLogin = function () {
    const root = document.getElementById("app-content");
    root.innerHTML = `
      <main class="max-w-lg mx-auto px-6 py-28 min-h-[60vh]">
        <div class="glass p-10 rounded-3xl reveal hover-lift">
          <div class="text-center mb-6">
            <i data-lucide="fingerprint" class="w-10 h-10 mx-auto text-neon-blue mb-2"></i>
            <h2 class="text-3xl font-bold">Welcome Back</h2>
            <p class="text-gray-400 mt-2">Sign in to access your saved deals and profile (demo).</p>
          </div>
          <form onsubmit="event.preventDefault(); login(); updateAuthUI(); location.hash='#home';" class="space-y-4">
            <input required placeholder="Email Address" type="email" class="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:border-neon-blue transition duration-200" />
            <input required type="password" placeholder="Password" class="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:border-neon-blue transition duration-200" />
            <button class="w-full py-3 text-lg rounded-xl btn-primary">
              Sign In
            </button>
          </form>
          <p class="text-center text-sm text-gray-400 mt-6">
            Don't have an account? 
            <a href="#register" class="text-neon-pink font-semibold hover:underline">Register Here</a>
          </p>
        </div>
      </main>
    `;
    window.initReveal && window.initReveal();
  };
})();