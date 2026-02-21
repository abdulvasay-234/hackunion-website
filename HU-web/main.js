const navMarkup = `
  <header class="header-shell">
    <div class="container navbar">
      <a class="brand" href="index.html" aria-label="HackUnion home">
        HackUnion
        <small>Affiliated with Lords Skill Academy</small>
      </a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="siteNav" aria-label="Toggle navigation menu">☰</button>
      <ul class="nav-links" id="siteNav">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="programs.html">Programs</a></li>
        <li><a href="community.html">Community</a></li>
        <li><a href="insights.html">Insights</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </header>
`;

const footerMarkup = `
  <footer>
    <div class="container footer-wrap">
      <div>
        <h2 class="section-title">HackUnion</h2>
        <p class="footer-note">Independent builders community affiliated with Lords Skill Academy. We help students ship meaningful digital projects through guided practice and peer collaboration.</p>
      </div>
      <div>
        <h2 class="section-title">Sitemap</h2>
        <ul class="footer-nav">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="programs.html">Programs</a></li>
          <li><a href="community.html">Community</a></li>
          <li><a href="insights.html">Insights</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <p class="footer-note">© 2026 HackUnion · Lords Skill Academy Affiliation Note: Academic mentorship and community collaboration support.</p>
      </div>
    </div>
  </footer>
`;

function mountSharedLayout() {
  const headerRoot = document.getElementById("site-header");
  const footerRoot = document.getElementById("site-footer");

  if (headerRoot) {
    headerRoot.innerHTML = navMarkup;
  }

  if (footerRoot) {
    footerRoot.innerHTML = footerMarkup;
  }

  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      nav.classList.toggle("open");
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .footer-nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", mountSharedLayout);

// Scroll-triggered counter animation for stats
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  if (statNumbers.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = "true";
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target, 0, 1200);
      }
    });
  }, observerOptions);

  statNumbers.forEach((el) => {
    observer.observe(el);
  });
}

function animateCounter(element, target, current, duration) {
  const increment = target / (duration / 16);
  const startTime = Date.now();
  
  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(current + progress * (target - current));
    
    element.textContent = value + "+";
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  };
  
  updateCounter();
}

document.addEventListener("DOMContentLoaded", () => {
  initCounterAnimation();
});
