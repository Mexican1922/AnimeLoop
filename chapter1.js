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

// Toggle dropdown for chapter
const btn = document.getElementById("chapterBtn");
const menu = document.getElementById("dropdownMenu");

btn.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".chapter-dropdown")) {
    menu.classList.remove("open");
  }
});

// Toggle Replies
document.querySelectorAll(".view-replies").forEach((btn) => {
  btn.addEventListener("click", () => {
    const replies = btn.nextElementSibling;
    replies.style.display =
      replies.style.display === "block" ? "none" : "block";
    btn.classList.toggle("open");
  });
});

// Load more comments
const loadMoreBtn = document.querySelector(".load-more");
const commentsSection = document.querySelector(".comments-section");

loadMoreBtn.addEventListener("click", () => {
  // Dummy comment to append
  const newComment = document.createElement("div");
  newComment.classList.add("comment");
  newComment.innerHTML = `
        <img src="Images/comment-img-sm-3.png" alt="User">
        <div class="comment-body">
          <div class="comment-header">
            @newuser <span>just now</span>
          </div>
          <div class="comment-text">
            This is a newly loaded comment example!
          </div>
          <div class="comment-actions">
            <div><i class="fa-solid fa-thumbs-up"></i> Like</div>
            <div><i class="fa-solid fa-reply"></i> Reply</div>
          </div>
        </div>
      `;
  // Insert before load more button
  commentsSection.insertBefore(newComment, loadMoreBtn);
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
