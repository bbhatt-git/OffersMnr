// assets/js/pages/register.js
(function () {
  window.renderRegister = function () {
    const root = document.getElementById("app-content");
    
    // Custom non-alert feedback function
    window.handleRegisterSubmit = () => {
        // In a real app, this is where you'd call an API
        console.log('Registration submitted (demo). Redirecting to login.');
        // Show a temporary UI message instead of alert if needed, but for now, just console.log and redirect
        window.login(); // Simulate quick sign up and login
        window.updateAuthUI();
        location.hash = '#home';
    };

    root.innerHTML = `
      <main class="max-w-lg mx-auto px-6 py-28 min-h-[60vh]">
        <div class="glass p-10 rounded-3xl reveal hover-lift">
          <div class="text-center mb-6">
            <i data-lucide="user-plus" class="w-10 h-10 mx-auto text-neon-pink mb-2"></i>
            <h2 class="text-3xl font-bold">Create Account</h2>
            <p class="text-gray-400 mt-2">Join OffersMNR and start saving instantly (demo).</p>
          </div>
          <form onsubmit="event.preventDefault(); handleRegisterSubmit();" class="space-y-4">
            <input required placeholder="Full Name" class="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:border-neon-pink transition duration-200" />
            <input required placeholder="Email Address" type="email" class="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:border-neon-pink transition duration-200" />
            <input required type="password" placeholder="Password (min 6 characters)" class="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:border-neon-pink transition duration-200" />
            <button class="w-full py-3 text-lg rounded-xl btn-secondary">
              Create Account
            </button>
          </form>
          <p class="text-center text-sm text-gray-400 mt-6">
            Already have an account? 
            <a href="#login" class="text-neon-blue font-semibold hover:underline">Sign In</a>
          </p>
        </div>
      </main>
    `;
    window.initReveal && window.initReveal();
  };
})();