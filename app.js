document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const app = document.getElementById("app");
  const year = document.getElementById("year");
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const glassCards = document.querySelectorAll(".glassInteractive");
  const reveals = document.querySelectorAll(".reveal");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // PRELOADER
  setTimeout(() => {
    if (preloader) preloader.classList.add("hide");
    if (app) {
      app.classList.remove("appHidden");
      app.classList.add("appVisible");
    }
  }, 1100);

  // HEADER ON SCROLL
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // MOBILE MENU
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // REVEAL ON SCROLL
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("show"));
  }

  // GLASS HIGHLIGHT FOLLOW
  glassCards.forEach(card => {
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
  });

  function handleMouseMove(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const specular = this.querySelector(".glassSpecular");
    if (specular) {
      specular.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255,255,255,0.18) 0%,
          rgba(255,255,255,0.08) 22%,
          rgba(255,255,255,0.03) 40%,
          rgba(255,255,255,0) 64%
        )
      `;
    }
  }

  function handleMouseLeave() {
    const specular = this.querySelector(".glassSpecular");
    if (specular) {
      specular.style.background = "none";
    }
  }
});

