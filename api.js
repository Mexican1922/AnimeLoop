// api.js — Shared Jikan API v4 utilities (https://api.jikan.moe/v4)
// No API key required. Rate limit: 3 requests/sec.

const JIKAN_BASE = "https://api.jikan.moe/v4";

/**
 * Fetch top-rated/popular anime
 * @param {number} limit - Number of results (max 25)
 * @returns {Promise<Array>} Array of anime objects
 */
async function fetchTopAnime(limit = 6) {
  try {
    const res = await fetch(
      `${JIKAN_BASE}/top/anime?limit=${limit}&filter=bypopularity`,
    );
    if (!res.ok) throw new Error("Failed to fetch top anime");
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn("Jikan API – fetchTopAnime failed:", err.message);
    return [];
  }
}

/**
 * Fetch currently airing anime (current season)
 * @param {number} limit - Number of results
 * @returns {Promise<Array>} Array of anime objects
 */
async function fetchCurrentSeason(limit = 10) {
  try {
    const res = await fetch(`${JIKAN_BASE}/seasons/now?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch current season");
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn("Jikan API – fetchCurrentSeason failed:", err.message);
    return [];
  }
}

/**
 * Search anime with optional filters
 * @param {string} query - Search query
 * @param {object} filters - { genres, type, status, page }
 * @returns {Promise<{data: Array, pagination: object}>}
 */
async function searchAnime(query = "", filters = {}) {
  try {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (filters.genres) params.set("genres", filters.genres);
    if (filters.type) params.set("type", filters.type);
    if (filters.status) params.set("status", filters.status);
    params.set("limit", filters.limit || 12);
    params.set("page", filters.page || 1);
    params.set("order_by", "popularity");
    params.set("sfw", "true");

    const res = await fetch(`${JIKAN_BASE}/anime?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to search anime");
    const data = await res.json();
    return { data: data.data || [], pagination: data.pagination || {} };
  } catch (err) {
    console.warn("Jikan API – searchAnime failed:", err.message);
    return { data: [], pagination: {} };
  }
}

/**
 * Build an anime card element from a Jikan API result object
 * @param {object} anime - Jikan anime object
 * @param {string} linkHref - URL to navigate to on click
 * @returns {HTMLElement}
 */
function buildApiAnimeCard(anime, linkHref = "streaming.html") {
  const card = document.createElement("div");
  card.className = "anime-card api-card";

  const score = anime.score ? `⭐ ${anime.score}` : "";
  const type = anime.type || "TV";
  const episodes = anime.episodes ? `${anime.episodes} eps` : "";
  const imgSrc = anime.images?.jpg?.image_url || "";

  card.innerHTML = `
    <img src="${imgSrc}" alt="${anime.title}" loading="lazy" />
    <div class="overlay">
      <a href="${linkHref}"><i class="fa-solid fa-play"></i></a>
    </div>
    <div class="card-info">
      <div class="tags">
        ${score ? `<span class="score-badge">${score}</span>` : ""}
        <span style="color:#b4b4b4">${type}</span>
      </div>
      <p class="anime-title">${anime.title}</p>
      ${episodes ? `<p class="ep-count">${episodes}</p>` : ""}
    </div>
    <div class="menu">
      <i class="fa-solid fa-list menu-icon"></i>
      <div class="dropdown">
        <a href="#"><i class="fa-regular fa-clock"></i> Watch Later</a>
        <a href="#"><i class="fa-solid fa-plus"></i> Add to Playlist</a>
      </div>
    </div>
  `;

  // Hook dropdown toggle
  const menuIcon = card.querySelector(".menu-icon");
  const menuEl = card.querySelector(".menu");
  if (menuIcon && menuEl) {
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".menu.open").forEach((m) => {
        if (m !== menuEl) m.classList.remove("open");
      });
      menuEl.classList.toggle("open");
    });
  }

  return card;
}
