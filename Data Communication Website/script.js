const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const progressBar = document.getElementById("progressBar");
const backToTop = document.querySelector(".back-to-top");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const savedTheme = localStorage.getItem("signal-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "Light";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "Light" : "Dark";
  localStorage.setItem("signal-theme", isDark ? "dark" : "light");
});

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  backToTop.classList.toggle("show", window.scrollY > 520);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const body = button.nextElementSibling;
    const isOpen = button.classList.contains("open");

    document.querySelectorAll(".accordion-btn").forEach((item) => {
      item.classList.remove("open");
      item.nextElementSibling.classList.remove("open");
    });

    if (!isOpen) {
      button.classList.add("open");
      body.classList.add("open");
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach((section) => {
  revealObserver.observe(section);
});

document.querySelectorAll(".stat strong[data-target]").forEach((item) => {
  const target = Number(item.dataset.target);
  let current = 0;
  const timer = setInterval(() => {
    current += 1;
    item.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 90);
});
