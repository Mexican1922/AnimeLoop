// script.js
// Homepage logic: slider, schedule, API integration, countdown, dynamic date, toast

// ─── Loading Screen ───────────────────────────────────────────
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  loader.style.display = "none";
  content.style.display = "block";
});

// ─── Dynamic "Today's Date" under RECENTLY UPDATED ────────────
(function setTodayDate() {
  const el = document.getElementById("today-date");
  if (!el) return;
  const now = new Date();
  const opts = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  el.textContent = now.toLocaleDateString("en-US", opts).toUpperCase();
})();

// Logic moved to global.js

// ─── Hero Slideshow ───────────────────────────────────────────
const slides = document.querySelectorAll(".header-slide");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");
const dots = document.querySelectorAll(".slide-dots .dot");
let current = 0;

function showSlide(index) {
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

if (nextBtn)
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });
if (prevBtn)
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

// Click on dots to jump to slide
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    current = parseInt(dot.dataset.index);
    showSlide(current);
  });
});

// Auto-advance every 9 seconds
const autoSlide = setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 9000);

// ─── Weekly Schedule Navigation ───────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.querySelector(".days");
  const navBtns = document.querySelectorAll(".nav-btn");
  if (daysContainer && navBtns.length >= 2) {
    navBtns[0].addEventListener("click", () =>
      daysContainer.scrollBy({ left: -200, behavior: "smooth" }),
    );
    navBtns[1].addEventListener("click", () =>
      daysContainer.scrollBy({ left: 200, behavior: "smooth" }),
    );
  }
  autoHighlightToday();
});

// ─── Auto-highlight today's day in schedule ───────────────────
function autoHighlightToday() {
  const dayEls = document.querySelectorAll(".day");
  if (!dayEls.length) return;
  // Try to match a day that contains today's date substring
  const now = new Date();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const todayStr = `${monthNames[now.getMonth()]} ${now.getDate()}`;
  let found = false;
  dayEls.forEach((d) => {
    const dateEl = d.querySelector(".date");
    if (dateEl && dateEl.textContent.trim() === todayStr) {
      dayEls.forEach((x) => x.classList.remove("active"));
      d.classList.add("active");
      found = true;
      const animeList = document.querySelector(".anime-list");
      if (animeList) renderScheduleDay(todayStr, animeList);
    }
  });
}

// ─── Anime Schedule Data ───────────────────────────────────────
const animeSchedule = {
  "JAN 1": [
    {
      time: "10:00",
      img: "Images/hero.jpeg",
      title: "My Hero Academia",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
    {
      time: "11:00",
      img: "Images/aot.jpeg",
      title: "Attack on Titan",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
    {
      time: "13:00",
      img: "Images/Demon Slayer Posters.jpeg",
      title: "Demon Slayer",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
    {
      time: "15:00",
      img: "Images/One.jpeg",
      title: "One Piece",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
    {
      time: "16:00",
      img: "Images/download.jpeg",
      title: "Jujutsu Kaisen",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
  ],
  "JAN 2": [
    {
      time: "12:00",
      img: "Images/anime-img-1.png",
      title: "Darling in the Franxx",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
    {
      time: "14:00",
      img: "Images/anime-img-2.png",
      title: "Plastic Memories",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 06"],
    },
    {
      time: "15:00",
      img: "Images/download.jpeg",
      title: "Jujutsu Kaisen",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 06"],
    },
  ],
  "JAN 3": [
    {
      time: "15:00",
      img: "Images/Rezero.jpeg",
      title: "Re:Zero - Starting Life in Another World",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 06"],
    },
    {
      time: "16:00",
      img: "Images/anime-img-4.png",
      title: "Assassination Classroom",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 06"],
    },
    {
      time: "17:00",
      img: "Images/aot.jpeg",
      title: "Attack on Titan",
      tags: ["DUB 6", "SUB 12"],
      info: ["OVA", "Episode 10"],
    },
    {
      time: "18:00",
      img: "Images/anime-img-5.png",
      title: "Chainsaw Man",
      tags: ["SUB 500"],
      info: ["TV", "Episode 20"],
    },
  ],
  "JAN 4": [
    {
      time: "17:00",
      img: "Images/anime-img-3.png",
      title: "That Time I Got Reincarnated as a Slime",
      tags: ["SUB 500"],
      info: ["TV", "Episode 220"],
    },
    {
      time: "18:00",
      img: "Images/Shippuden.jpeg",
      title: "Naruto Shippuden",
      tags: ["SUB 500"],
      info: ["TV", "Episode 220"],
    },
  ],
  "JAN 5": [
    {
      time: "20:00",
      img: "Images/bleach.jpeg",
      title: "Bleach",
      tags: ["SUB 366"],
      info: ["TV", "Episode 150"],
    },
    {
      time: "21:00",
      img: "Images/broth.jpeg",
      title: "Fullmetal Alchemist: Brotherhood",
      tags: ["SUB 64"],
      info: ["TV", "Episode 64"],
    },
  ],
  "JAN 6": [
    {
      time: "19:30",
      img: "Images/Tokyo Ghoul (Season 1) [2014].jpeg",
      title: "Tokyo Ghoul",
      tags: ["SUB 37"],
      info: ["TV", "Episode 37"],
    },
    {
      time: "22:00",
      img: "Images/dt.jpeg",
      title: "Death Note",
      tags: ["SUB 37"],
      info: ["TV", "Episode 37"],
    },
  ],
  "JAN 7": [
    {
      time: "20:00",
      img: "Images/Steins; Gate (2011).jpeg",
      title: "Steins;Gate",
      tags: ["SUB 24"],
      info: ["TV", "Episode 24"],
    },
    {
      time: "22:30",
      img: "Images/Code Geass.jpeg",
      title: "Code Geass",
      tags: ["SUB 50"],
      info: ["TV", "Episode 50"],
    },
  ],
  "JAN 8": [
    {
      time: "09:00",
      img: "Images/cowboy.jpeg",
      title: "Cowboy Bebop",
      tags: ["SUB 26"],
      info: ["TV", "Episode 26"],
    },
    {
      time: "09:30",
      img: "Images/MHA Season 5 Key Art 5.jpeg",
      title: "My Hero Academia",
      tags: ["SUB 26"],
      info: ["TV", "Episode 26"],
    },
    {
      time: "10:00",
      img: "Images/One-piece.jpeg",
      title: "One Piece",
      tags: ["SUB 26"],
      info: ["TV", "Episode 26"],
    },
    {
      time: "11:00",
      img: "Images/anime-img-6.png",
      title: "No Game No Life",
      tags: ["SUB 26"],
      info: ["TV", "Episode 26"],
    },
  ],
  "JAN 9": [
    {
      time: "10:00",
      img: "Images/anime-img-5.png",
      title: "Chainsaw Man",
      tags: ["SUB 26"],
      info: ["TV", "Episode 26"],
    },
    {
      time: "11:00",
      img: "Images/hero.jpeg",
      title: "My Hero Academia",
      tags: ["SUB 26"],
      info: ["TV", "Episode 26"],
    },
  ],
  "JAN 10": [
    {
      time: "10:00",
      img: "Images/MHA Season 5 Key Art 5.jpeg",
      title: "My Hero Academia",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
    {
      time: "11:00",
      img: "Images/Attack on Titan.jpeg",
      title: "Attack on Titan",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
    {
      time: "13:00",
      img: "Images/Demon Slayer Posters.jpeg",
      title: "Demon Slayer",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
    {
      time: "15:00",
      img: "Images/One.jpeg",
      title: "One Piece",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
    {
      time: "16:00",
      img: "Images/Jujutsu Kaisen wallpaper.jpeg",
      title: "Jujutsu Kaisen",
      tags: ["DUB 10", "SUB 12"],
      info: ["TV", "Episode 05"],
    },
  ],
  "JAN 11": [
    {
      time: "12:00",
      img: "Images/anime-img-3.png",
      title: "That Time I Got Reincarnated as a Slime",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
    {
      time: "12:30",
      img: "Images/Attack on Titan.jpeg",
      title: "Attack on Titan",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
  ],
  "JAN 12": [
    {
      time: "14:00",
      img: "Images/anime-img-4.png",
      title: "Assassination Classroom",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
    {
      time: "14:30",
      img: "Images/Kny _Infinity castle_.jpeg",
      title: "Demon Slayer",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
  ],
  "JAN 14": [
    {
      time: "16:00",
      img: "Images/Attack on Titan.jpeg",
      title: "Attack on Titan",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
    {
      time: "16:30",
      img: "Images/One.jpeg",
      title: "One Piece",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
    {
      time: "17:00",
      img: "Images/Shippuden.jpeg",
      title: "Naruto Shippuden",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
  ],
  "JAN 15": [
    {
      time: "18:00",
      img: "Images/Demon Slayer Posters.jpeg",
      title: "Demon Slayer",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
  ],
  "JAN 16": [
    {
      time: "15:00",
      img: "Images/download.jpeg",
      title: "Jujutsu Kaisen",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
    {
      time: "15:30",
      img: "Images/MHA Season 5 Key Art 5.jpeg",
      title: "My Hero Academia",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 04"],
    },
  ],
};

// ─── Render schedule for a given day key ──────────────────────
function renderScheduleDay(dayKey, container) {
  container.innerHTML = "";
  const items = animeSchedule[dayKey];
  if (!items || !items.length) {
    container.innerHTML = `<p style="color:#ccc;padding:1rem;">No anime scheduled for this day.</p>`;
    return;
  }
  items.forEach((anime) => {
    const div = document.createElement("div");
    div.classList.add("anime-item");
    div.innerHTML = `
      <span class="time">${anime.time}</span>
      <img src="${anime.img}" alt="${anime.title}">
      <div class="details">
        <h3>${anime.title}</h3>
        <div class="tags">
          ${anime.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="episode-info">
        <span>${anime.info[0]}</span>
        <span class="episode">${anime.info[1]}</span>
      </div>
    `;
    container.appendChild(div);
  });
}

// Day click handler
const dayEls = document.querySelectorAll(".day");
const animeList = document.querySelector(".anime-list");
dayEls.forEach((day) => {
  day.addEventListener("click", () => {
    dayEls.forEach((d) => d.classList.remove("active"));
    day.classList.add("active");
    const dayKey = day.querySelector(".date").textContent.trim();
    if (animeList) renderScheduleDay(dayKey, animeList);
  });
});

// ─── Sub-header Countdown Timer ───────────────────────────────
(function startCountdown() {
  const countdownEl = document.querySelector(".sub-header .countdown");
  if (!countdownEl) return;
  // Target: next Saturday at 00:00
  const now = new Date();
  const target = new Date(now);
  target.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7 || 7)); // next Saturday
  target.setHours(0, 0, 0, 0);

  const spans = countdownEl.querySelectorAll("span");
  if (spans.length < 4) return;

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      spans[0].textContent = "00d";
      spans[1].textContent = "00h";
      spans[2].textContent = "00m";
      spans[3].textContent = "00s";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    spans[0].textContent = String(d).padStart(2, "0") + "d";
    spans[1].textContent = String(h).padStart(2, "0") + "h";
    spans[2].textContent = String(m).padStart(2, "0") + "m";
    spans[3].textContent = String(s).padStart(2, "0") + "s";
  }
  tick();
  setInterval(tick, 1000);
})();

// ─── Back to Top Button ───────────────────────────────────────
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display =
      document.documentElement.scrollTop > 200 ? "block" : "none";
  });
  backToTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// ─── Subscribe Toast ──────────────────────────────────────────
const subscribeForm = document.getElementById("subscribe-form");
const toast = document.getElementById("subscribe-toast");
if (subscribeForm && toast) {
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3500);
    subscribeForm.reset();
  });
}

// ─── Card dropdown menus (for existing static cards) ──────────
document.querySelectorAll(".menu-icon").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    const menu = icon.parentElement;
    document.querySelectorAll(".menu").forEach((m) => {
      if (m !== menu) m.classList.remove("open");
    });
    menu.classList.toggle("open");
  });
});
document.addEventListener("click", () => {
  document.querySelectorAll(".menu").forEach((m) => m.classList.remove("open"));
});

// ─── Jikan API Integration ────────────────────────────────────
// Load Popular Anime section from Jikan top anime
async function loadPopularAnime() {
  const grid = document.getElementById("api-popular-grid");
  if (!grid || typeof fetchTopAnime === "undefined") return;

  const animes = await fetchTopAnime(6);
  if (!animes.length) return;

  // Replace static fallback cards with live data
  grid.innerHTML = "";
  animes.forEach((anime) => {
    const card = buildApiAnimeCard(anime, "streaming.html");
    card.classList.add("animeloop-card"); // match the popular section style
    grid.appendChild(card);
  });
}

// Load Currently Airing section from Jikan
async function loadCurrentSeason() {
  const grid = document.getElementById("api-recently-grid");
  if (!grid || typeof fetchCurrentSeason === "undefined") return;

  const animes = await fetchCurrentSeason(10);
  if (!animes.length) return;

  grid.innerHTML = "";
  animes.forEach((anime) => {
    const card = buildApiAnimeCard(anime, "streaming.html");
    grid.appendChild(card);
  });
}

// Init API calls after page load
window.addEventListener("load", () => {
  loadPopularAnime();
  loadCurrentSeason();
});
