// script.js
// Hamburger toggle
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

// Pages dropdown toggle
const pagesLink = document.getElementById("pagesLink");
const pagesDropdown = document.getElementById("pagesDropdown");

pagesLink.addEventListener("click", function (e) {
  e.preventDefault();
  pagesDropdown.classList.toggle("show-dropdown");
});

// Close dropdown if clicking outside
window.addEventListener("click", function (e) {
  if (!e.target.closest(".pages")) {
    pagesDropdown.classList.remove("show-dropdown");
  }
});

// JavaScript for header slideshow
const slides = document.querySelectorAll(".header-slide");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");

let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 9000); // every 7 seconds
// Initial display

// JavaScript for weekly schedule navigation
document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.querySelector(".days");
  const navBtns = document.querySelectorAll(".nav-btn");

  navBtns[0].addEventListener("click", () => {
    daysContainer.scrollBy({ left: -200, behavior: "smooth" });
  });

  navBtns[1].addEventListener("click", () => {
    daysContainer.scrollBy({ left: 200, behavior: "smooth" });
  });
});

// JavaScript for updating anime list based on selected day
// Example anime schedule data
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
      time: "16:00",
      img: "Images/Rezero.jpeg",
      title: "Re:Zero - Starting Life in Another World",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 06"],
    },
    {
      time: "15:00",
      img: "Images/anime-img-4.png",
      title: "Assassination Classroom",
      tags: ["DUB 8", "SUB 12"],
      info: ["TV", "Episode 06"],
    },
    {
      time: "16:00",
      img: "Images/aot.jpeg",
      title: "Attack on Titan",
      tags: ["DUB 6", "SUB 12"],
      info: ["OVA", "Episode 10"],
    },
    {
      time: "17:00",
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

  // Add more days and their respective anime shows as needed

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
      img: "Images/Kny _In  nity castle_.jpeg",
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
// Initial population for the first day
const days = document.querySelectorAll(".day");
const animeList = document.querySelector(".anime-list");

days.forEach((day) => {
  day.addEventListener("click", () => {
    // Switch active day
    days.forEach((d) => d.classList.remove("active"));
    day.classList.add("active");

    // Get selected day text
    const dayKey = day.querySelector(".date").textContent.trim();

    // Clear anime list
    animeList.innerHTML = "";

    // Populate new list
    if (animeSchedule[dayKey]) {
      animeSchedule[dayKey].forEach((anime) => {
        const animeItem = document.createElement("div");
        animeItem.classList.add("anime-item");
        animeItem.innerHTML = `
            <span class="time">${anime.time}</span>
            <img src="${anime.img}" alt="${anime.title}">
            <div class="details">
              <h3>${anime.title}</h3>
              <div class="tags">
                ${anime.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}
              </div>
            </div>
            <div class="episode-info">
              <span>${anime.info[0]}</span>
              <span class="episode">${anime.info[1]}</span>
            </div>
          `;
        animeList.appendChild(animeItem);
      });
    } else {
      animeList.innerHTML = `<p style="color:#ccc;">No anime scheduled for this day.</p>`;
    }
  });
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
