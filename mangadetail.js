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

// Example chapter data (you can replace with real data)
const chapters = [
  { chapter: "Chapter 179", date: "Sunday 01 Jan 2023" },
  { chapter: "Chapter 178", date: "Sunday 02 Jan 2023" },
  { chapter: "Chapter 177", date: "Monday 03 Jan 2023" },
  { chapter: "Chapter 176", date: "Tuesday 04 Jan 2023" },
  { chapter: "Chapter 175", date: "Wednesday 05 Jan 2023" },
  { chapter: "Chapter 174", date: "Thursday 06 Jan 2023" },
  { chapter: "Chapter 173", date: "Friday 07 Jan 2023" },
  { chapter: "Chapter 172", date: "Saturday 08 Jan 2023" },
  { chapter: "Chapter 171", date: "Sunday 09 Jan 2023" },
  { chapter: "Chapter 170", date: "Monday 10 Jan 2023" },
  { chapter: "Chapter 169", date: "Tuesday 11 Jan 2023" },
  { chapter: "Chapter 168", date: "Wednesday 12 Jan 2023" },
  { chapter: "Chapter 167", date: "Thursday 13 Jan 2023" },
  { chapter: "Chapter 166", date: "Friday 14 Jan 2023" },
];

const releaseList = document.getElementById("release-list");
const showMoreBtn = document.getElementById("showMoreBtn");

let visibleCount = 10; // Show first 10
function renderChapters() {
  releaseList.innerHTML = "";
  for (let i = 0; i < visibleCount && i < chapters.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${chapters[i].chapter}</span><span>${chapters[i].date}</span>`;
    releaseList.appendChild(li);
  }
  if (visibleCount >= chapters.length) {
    showMoreBtn.style.display = "none"; // Hide button if no more chapters
  }
}

showMoreBtn.addEventListener("click", () => {
  visibleCount += 5; // Show 5 more on each click
  renderChapters();
});

// Initial render
renderChapters();

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
