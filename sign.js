// blogdetail.js
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

// --- Mobile menu toggle ---
const mobileToggle = document.getElementById("menuToggle");
const menuItems = document.getElementById("menuItems");

mobileToggle.addEventListener("click", () => {
  menuItems.classList.toggle("show-menu");
});

// Eye Toggle
function togglePassword(id, el) {
  const input = document.getElementById(id);
  const icon = el.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  }
}

function togglePassword(id, el) {
  const input = document.getElementById(id);
  const icon = el.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

// Confirm password validation
document.querySelector("form").addEventListener("submit", function (e) {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    e.preventDefault();
    alert("Passwords do not match!");
  }
});
