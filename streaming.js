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
// Episode Elements
const playOverlay = document.getElementById("playEpisodeOverlay");
const posterImage = document.getElementById("posterImage");
const episodeEmbed = document.getElementById("episodeEmbed");
const episodeFrame = document.getElementById("episodeFrame");
const episodeVideo = document.getElementById("episodeVideo");
const closeEpisode = document.getElementById("closeEpisode");
const episodeContainer = document.getElementById("episodeContainer");

const seasonDropdown = document.getElementById("seasonDropdown");
const dropdownBtn = seasonDropdown.querySelector(".dropdown-btn");
const dropdownMenu = seasonDropdown.querySelector(".dropdown-menu");

// Example episodes per season
// type: "video" = MP4 (Dropbox), "iframe" = streaming embed
const episodeSources = {
  7: [
    {
      type: "video",
      src: "https://www.dropbox.com/scl/fi/xr5dthbm2lcb7z5z266k6/videoplayback.mp4?rlkey=vziizti083glhm02e8d2ne5hr&raw=1",
      download:
        "https://www.dropbox.com/scl/fi/xr5dthbm2lcb7z5z266k6/videoplayback.mp4?rlkey=vziizti083glhm02e8d2ne5hr&dl=1",
    }, // Episode 1 (Dropbox file)
    {
      type: "iframe",
      src: "https://animekai.bz/watch/my-hero-academia-season-6-lgxl#ep=2",
    },
    {
      type: "iframe",
      src: "https://animekai.bz/watch/my-hero-academia-season-6-lgxl#ep=3",
    },
    {
      type: "iframe",
      src: "https://animekai.bz/watch/my-hero-academia-season-6-lgxl#ep=4",
    },
  ],
  6: [
    {
      type: "video",
      src: "https://www.dropbox.com/scl/fi/xr5dthbm2lcb7z5z266k6/videoplayback.mp4?rlkey=vziizti083glhm02e8d2ne5hr&raw=1",
      download:
        "https://www.dropbox.com/scl/fi/xr5dthbm2lcb7z5z266k6/videoplayback.mp4?rlkey=vziizti083glhm02e8d2ne5hr&dl=1",
    }, // Episode 1
    {
      type: "iframe",
      src: "https://animekai.bz/watch/my-hero-academia-season-6-lgxl#ep=2",
    },
    {
      type: "iframe",
      src: "https://animekai.bz/watch/my-hero-academia-season-6-lgxl#ep=3",
    },
    {
      type: "iframe",
      src: "https://animekai.bz/watch/my-hero-academia-season-6-lgxl#ep=4",
    },
  ],
  5: [
    {
      type: "iframe",
      src: "https://animekai.bz/watch/my-hero-academia-season-5-lgxl#ep=1",
    },
    {
      type: "iframe",
      src: "https://animekai.bz/watch/my-hero-academia-season-5-lgxl#ep=2",
    },
  ],
};

// Grab the download button
const downloadBtn = document.getElementById("downloadBtn");

// Function that runs when an episode is selected
function loadEpisode(season, episodeIndex) {
  const source = episodeSources[season][episodeIndex];

  if (!source) return;

  if (source.type === "video") {
    // Set up the download link
    downloadBtn.href = source.download;
    downloadBtn.setAttribute("download", `Episode-${episodeIndex + 1}.mp4`);
    downloadBtn.style.display = "inline-flex"; // show
  } else {
    // Hide for iframe/streaming episodes
    downloadBtn.style.display = "none";
  }

  // TODO: Add your video/iframe player switching code here
}

// ▶ Load an episode (handles both video & iframe)
function loadEpisode(ep) {
  posterImage.style.display = "none";
  playOverlay.style.display = "none";
  episodeEmbed.style.display = "block";

  // Reset both players
  episodeFrame.style.display = "none";
  episodeVideo.style.display = "none";
  episodeFrame.src = "";
  episodeVideo.pause();

  if (ep.type === "iframe") {
    episodeFrame.style.display = "block";
    episodeFrame.src = ep.src;
  } else if (ep.type === "video") {
    episodeVideo.style.display = "block";
    episodeVideo.src = ep.src;
    episodeVideo.play();
  }
}

// ▶ Show first episode when play overlay is clicked
playOverlay.addEventListener("click", () => {
  const firstEp = episodeSources[6][0];
  loadEpisode(firstEp);
});

// ❌ Close episode player
closeEpisode.addEventListener("click", () => {
  episodeFrame.src = "";
  episodeVideo.pause();
  episodeVideo.src = "";

  episodeEmbed.style.display = "none";
  posterImage.style.display = "block";
  playOverlay.style.display = "flex";
});

// ✅ Toggle dropdown with .show class
dropdownBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("show");
});

// ✅ Season selection
dropdownMenu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    const season = item.getAttribute("data-value");
    dropdownBtn.textContent = item.textContent + " ▾";
    dropdownMenu.classList.remove("show");
    loadEpisodes(season);
  });
});

// ✅ Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!seasonDropdown.contains(e.target)) {
    dropdownMenu.classList.remove("show");
  }
});

// Load episodes dynamically
function loadEpisodes(season) {
  episodeContainer.innerHTML = "";
  if (!episodeSources[season]) return;

  episodeSources[season].forEach((ep, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = `Episode ${String(index + 1).padStart(2, "0")}`;

    if (index === 0) a.classList.add("active");

    a.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".episode-list a")
        .forEach((el) => el.classList.remove("active"));
      a.classList.add("active");
      loadEpisode(ep);
    });

    li.appendChild(a);
    episodeContainer.appendChild(li);
  });
}

// Default load Season 6
loadEpisodes(6);

// === Trailer Play (YouTube) ===
const playTrailerOverlay = document.getElementById("playTrailerOverlay");
const trailerPosterImage = document.getElementById("trailerPosterImage");
const trailerWrapper = document.getElementById("trailerWrapper");
const trailerIframe = document.getElementById("trailerIframe");
const closeTrailerBtn = document.getElementById("closeTrailerBtn");

playTrailerOverlay.addEventListener("click", () => {
  posterImage.style.display = "none";
  playTrailerOverlay.style.display = "none";
  trailerWrapper.style.display = "block";

  // Load YouTube embed with autoplay
  trailerIframe.src = "https://www.youtube.com/embed/bSt5YwdNlxk?autoplay=1";
});

// === Close trailer ===
closeTrailerBtn.addEventListener("click", () => {
  trailerWrapper.style.display = "none";
  trailerIframe.src = ""; // stop the video
  posterImage.style.display = "block";
  playTrailerOverlay.style.display = "block";
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
