// assets/js/pages/login.js
(function () {
  window.renderLogin = function () {
    const root = document.getElementById("app-content");
    root.innerHTML = `
      <main class="max-w-md mx-auto px-6 py-20 min-h-[60vh] flex items-center justify-center">
        <div class="glass p-8 rounded-3xl w-full reveal">
          <h2 class="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
          <p class="text-gray-400 mb-6 text-center">Sign in to access extra features (demo).</p>
          <form onsubmit="event.preventDefault(); login(); updateAuthUI(); location.hash='#home';">
            <input required placeholder="Email" class="w-full p-3 rounded mb-3 bg-white/5 focus:ring-2 focus:ring-neon-blue outline-none transition-colors" />
            <input required type="password" placeholder="Password" class="w-full p-3 rounded mb-3 bg-white/5 focus:ring-2 focus:ring-neon-blue outline-none transition-colors" />
            <button class="w-full py-3 bg-neon-blue rounded-full font-semibold hover:bg-neon-blue/80 transition-colors mt-2">Sign In</button>
          </form>
          <p class="text-center text-sm text-gray-400 mt-4">Don't have an account? <a href="#register" class="text-neon-pink hover:underline">Register here</a></p>
        </div>
      </main>
    `;
    window.initReveal && window.initReveal();
    window.renderIcons && window.renderIcons();
  };
})();