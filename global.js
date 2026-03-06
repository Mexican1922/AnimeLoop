/**
 * global.js
 * Shared logic across all AnimeLoop pages.
 * Handles sticky navbar shadow, mobile menu toggle,
 * pages dropdown, and back-to-top button.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ─── STICKY NAVBAR SHADOW ON SCROLL ───
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ─── MOBILE HAMBURGER MENU TOGGLE ───
  const menuToggle = document.querySelector(".menu-toggle");
  const icon = menuToggle ? menuToggle.querySelector("i") : null;

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
      if (navbar.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
      } else {
        icon.classList.replace("fa-xmark", "fa-bars");
      }
    });
  }

  // ─── PAGES DROPDOWN (MOBILE/TOUCH) ───
  const pagesLink = document.getElementById("pagesLink");
  const pagesDropdown = document.getElementById("pagesDropdown");

  if (pagesLink && pagesDropdown) {
    pagesLink.addEventListener("click", (e) => {
      // Prevent default link jump
      e.preventDefault();
      pagesDropdown.classList.toggle("show-dropdown");
    });

    // Close dropdown if clicking outside
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".pages")) {
        pagesDropdown.classList.remove("show-dropdown");
      }
    });
  }

  // ─── BACK TO TOP BUTTON ───
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      // Show button after 300px scroll
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
