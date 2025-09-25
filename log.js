// blogdetail.js
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

// Password Toggle
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
