// search.js

// ─── Loading Screen ───────────────────────────────────────────
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  loader.style.display = "none";
  content.style.display = "block";
});

// Hamburger Toggle moved to global.js

// ─── Dropdown Filter Toggles ──────────────────────────────────
document.addEventListener("click", function (e) {
  document.querySelectorAll(".dropdown-content").forEach((dd) => {
    if (!dd.parentElement.contains(e.target)) dd.style.display = "none";
  });
});
document.querySelectorAll(".drop-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const content = this.nextElementSibling;
    const isVisible = content.style.display === "block";
    document
      .querySelectorAll(".dropdown-content")
      .forEach((dd) => (dd.style.display = "none"));
    content.style.display = isVisible ? "none" : "block";
  });
});

// ─── Card Menu Dropdowns ───────────────────────────────────────
function bindCardMenus() {
  document.querySelectorAll(".menu-icon").forEach((ico) => {
    ico.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = ico.parentElement;
      document.querySelectorAll(".menu").forEach((m) => {
        if (m !== menu) m.classList.remove("open");
      });
      menu.classList.toggle("open");
    });
  });
}
document.addEventListener("click", () => {
  document.querySelectorAll(".menu").forEach((m) => m.classList.remove("open"));
});
bindCardMenus();

// Back to Top moved to global.js

// ─── Jikan API Live Search & Filter ───────────────────────────
let currentPage = 1;
let lastQuery = "";
let lastFilters = {};
let totalPages = 1;

const searchInput = document.querySelector('.search-auth input[type="text"]');
const filterBtn = document.querySelector(".filter-btn");
const paginationWrap = document.querySelector(".wrap");
const prevPageBtn =
  document.querySelector(".chev[aria-label='Previous']") ||
  document.querySelector(".chev:first-child");
const nextPageBtn =
  document.querySelector(".chev[aria-label='Next']") ||
  document.querySelector(".chev:last-child");

// Container for API results (added dynamically above the static grid)
let apiGrid = document.getElementById("api-search-results");
if (!apiGrid) {
  apiGrid = document.createElement("div");
  apiGrid.id = "api-search-results";
  apiGrid.className = "anime-grid";
  const mainSection = document.querySelector("main section:last-of-type");
  if (mainSection) mainSection.prepend(apiGrid);
}

// Loading spinner element
let spinnerEl = document.getElementById("api-spinner");
if (!spinnerEl) {
  spinnerEl = document.createElement("div");
  spinnerEl.id = "api-spinner";
  spinnerEl.style.cssText =
    "text-align:center;padding:2rem;color:#7c3aed;font-size:1.5rem;display:none";
  spinnerEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Searching...`;
  if (apiGrid.parentElement)
    apiGrid.parentElement.insertBefore(spinnerEl, apiGrid);
}

function getSelectedFilters() {
  // Map genre checkbox labels to Jikan genre IDs
  const genreMap = {
    Action: 1,
    Adventure: 2,
    Comedy: 4,
    Drama: 8,
    Fantasy: 10,
    Horror: 14,
    Romance: 22,
    "Sci-Fi": 24,
    Thriller: 41,
  };
  const typeMap = {
    TV: "tv",
    Movie: "movie",
    OVA: "ova",
    ONA: "ona",
    Special: "special",
  };
  const statusMap = {
    Airing: "airing",
    Completed: "complete",
    Upcoming: "upcoming",
  };

  const selectedGenres = [];
  document
    .querySelectorAll('.dropdown-content input[type="checkbox"]:checked')
    .forEach((cb) => {
      const label = cb.parentElement.textContent.trim();
      if (genreMap[label] !== undefined) selectedGenres.push(genreMap[label]);
    });

  let type = "",
    status = "";
  document
    .querySelectorAll('.dropdown-content input[type="checkbox"]:checked')
    .forEach((cb) => {
      const label = cb.parentElement.textContent.trim();
      if (typeMap[label]) type = typeMap[label];
      if (statusMap[label]) status = statusMap[label];
    });

  return { genres: selectedGenres.join(","), type, status };
}

async function runSearch(query, filters, page = 1) {
  spinnerEl.style.display = "block";
  apiGrid.innerHTML = "";
  currentPage = page;

  const result = await searchAnime(query, { ...filters, page });
  spinnerEl.style.display = "none";

  if (!result.data.length) {
    apiGrid.innerHTML = `<p style="color:#ccc;grid-column:1/-1;padding:1rem">No anime found. Try different keywords or filters.</p>`;
    return;
  }

  totalPages = result.pagination?.last_visible_page || 1;
  result.data.forEach((anime) => {
    const card = buildApiAnimeCard(anime, "streaming.html");
    apiGrid.appendChild(card);
  });
  bindCardMenus();
  updatePaginationUI();
}

function updatePaginationUI() {
  if (!paginationWrap) return;
  const pageLinks = paginationWrap.querySelectorAll(".page");
  pageLinks.forEach((a, i) => {
    const p = i + 1;
    a.textContent = p;
    a.dataset.page = p;
    a.classList.toggle("active", p === currentPage);
    a.classList.toggle("muted", p !== currentPage);
    a.style.display = p <= totalPages ? "" : "none";
    a.onclick = (e) => {
      e.preventDefault();
      runSearch(lastQuery, lastFilters, p);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });
}

// Filter Now button
if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    lastQuery = searchInput ? searchInput.value.trim() : "";
    lastFilters = getSelectedFilters();
    runSearch(lastQuery, lastFilters, 1);
  });
}

// Alphabet filter
document.querySelectorAll(".alphabet-filter button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".alphabet-filter button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const letter = btn.textContent.trim();
    lastQuery = letter === "All" ? "" : letter;
    lastFilters = getSelectedFilters();
    runSearch(lastQuery, lastFilters, 1);
  });
});

// Pagination prev/next
if (prevPageBtn) {
  prevPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) runSearch(lastQuery, lastFilters, currentPage - 1);
  });
}
if (nextPageBtn) {
  nextPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages)
      runSearch(lastQuery, lastFilters, currentPage + 1);
  });
}

// Auto-run search on page load from URL query param
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") || "";
  lastQuery = q;
  lastFilters = {};
  if (searchInput) searchInput.value = q;
  runSearch(lastQuery, lastFilters, 1);
});
