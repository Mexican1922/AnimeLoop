// blog.js

// Simulate loading time
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  loader.style.display = "none"; // hide loader
  content.style.display = "block"; // show content
});

// JavaScript for toggling the navigation menu on smaller screens
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const icon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");

  // toggle icon between bars and X
  if (navbar.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// filter list dropdown
document.addEventListener("click", function (e) {
  const dropdowns = document.querySelectorAll(".dropdown-content");
  dropdowns.forEach((dd) => {
    if (!dd.parentElement.contains(e.target)) {
      dd.style.display = "none";
    }
  });
});

document.querySelectorAll(".drop-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const content = this.nextElementSibling;
    const isVisible = content.style.display === "block";

    // Close all dropdowns first
    document
      .querySelectorAll(".dropdown-content")
      .forEach((dd) => (dd.style.display = "none"));

    // Toggle the clicked one
    content.style.display = isVisible ? "none" : "block";
  });
});

// JavaScript for dropdown menus
document.querySelectorAll(".menu-icon").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    const menu = icon.parentElement;
    menu.classList.toggle("open");

    // close others
    document.querySelectorAll(".menu").forEach((m) => {
      if (m !== menu) m.classList.remove("open");
    });
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".menu").forEach((m) => m.classList.remove("open"));
});

// Back to top button
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
