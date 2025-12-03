window.isLoggedIn = localStorage.getItem("logged") === "true";

window.login = () => {
  localStorage.setItem("logged", "true");
  window.isLoggedIn = true;
};

window.logout = () => {
  localStorage.setItem("logged", "false");
  window.isLoggedIn = false;
};

window.updateAuthUI = () => {
  const btn = document.getElementById("auth-button");
  if (btn) btn.textContent = window.isLoggedIn ? "Logout" : "Login";
};
