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

// Toggle Page dropdown on click
// Toggle dropdown on click
const pagesLink = document.getElementById("pagesLink");
const pagesDropdown = document.getElementById("pagesDropdown");

pagesLink.addEventListener("click", function (e) {
  e.preventDefault(); // stop jumping to #
  pagesDropdown.classList.toggle("show-dropdown");
});

// Close Page dropdown on click
// Close dropdown if clicking outside
window.addEventListener("click", function (e) {
  if (!e.target.closest(".pages")) {
    pagesDropdown.classList.remove("show-dropdown");
  }
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
