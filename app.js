(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const preloader = document.getElementById("preloader");
  const app = document.getElementById("app");
  const header = document.getElementById("siteHeader");

  // Failsafe: anche se qualcosa va storto, dopo 2s mostra il sito
  const hardTimeout = setTimeout(() => {
    if (preloader) preloader.style.display = "none";
    if (app) {
      app.classList.remove("appHidden");
      app.classList.add("appVisible");
    }
  }, 2000);

  function showApp() {
    clearTimeout(hardTimeout);

    if (preloader) {
      preloader.classList.add("out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 450);
    }

    if (app) {
      app.classList.remove("appHidden");
      app.classList.add("appVisible");
    }
  }

  // year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // header scroll
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // smooth scroll
  document.addEventListener("click", (ev) => {
    const a = ev.target.closest("a[href^='#']");
    if (!a) return;
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    ev.preventDefault();
    target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
  });

  // reveal
  try {
    const revealEls = Array.from(document.querySelectorAll(".reveal, .card"));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      }, { threshold: 0.12 });

      revealEls.forEach((el) => {
        if (el.classList.contains("card")) el.classList.add("reveal");
        io.observe(el);
      });
    } else {
      revealEls.forEach(el => el.classList.add("is-in"));
    }
  } catch (_) {}

  // bounce hover
  if (!prefersReduced) {
    document.querySelectorAll(".bounce").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.classList.remove("is-bouncing");
        void el.offsetWidth;
        el.classList.add("is-bouncing");
      });
      el.addEventListener("animationend", () => el.classList.remove("is-bouncing"));
    });
  }

  // Avvio preloader
  if (!preloader || prefersReduced) {
    showApp();
  } else {
    setTimeout(showApp, 900);
  }
})();


