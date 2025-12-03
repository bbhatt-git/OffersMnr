// Scroll reveal
window.initReveal = () => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && e.target.classList.add("active"));
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
};

// Render icons
window.renderIcons = () => lucide.createIcons();
