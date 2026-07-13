// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Nav background on scroll
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// Active nav link highlighting
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a:not(.nav-cta)");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

// Fade-in on scroll
const fadeElements = document.querySelectorAll(
  ".section-header, .about-grid, .about-highlights, .timeline-item, .skill-category, .project-card, .volunteer-card, .contact-content"
);

fadeElements.forEach((el) => el.classList.add("fade-in"));

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((el) => fadeObserver.observe(el));

// Stagger project cards
document.querySelectorAll(".project-card").forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll(".skill-category").forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
