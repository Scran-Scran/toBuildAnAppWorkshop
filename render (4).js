// SOLUTION -- public/render.js
export const STATUSES = ["backlog", "playing", "completed", "dropped"];

export function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function optionsHTML(options, current) {
  const selected = String(current ?? "");
  return options
    .map((o) => {
      const isSelected = o.value === selected ? " selected" : "";
      return `<option value="${escapeHTML(o.value)}"${isSelected}>${escapeHTML(o.label)}</option>`;
    })
    .join("");
}

export const STATUS_OPTIONS = STATUSES.map((s) => ({
  value: s,
  label: s[0].toUpperCase() + s.slice(1),
}));

export const RATING_OPTIONS = [
  { value: "", label: "Unrated" },
  ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: "★".repeat(n) })),
];

// --- STEPS 1, 3 and 4 (the card grows as you go) -----------------------------

export function gameCardHTML(game) {
  return `
    <article class="game-card" data-id="${escapeHTML(game.id)}" data-status="${escapeHTML(game.status)}">
      <h3>${escapeHTML(game.title)}</h3>
      <p class="platform">${escapeHTML(game.platform)}</p>
      <p class="notes">${escapeHTML(game.notes)}</p>

      <div class="controls">
        <label>Status
          <select data-field="status">${optionsHTML(STATUS_OPTIONS, game.status)}</select>
        </label>
        <label>Rating
          <select data-field="rating">${optionsHTML(RATING_OPTIONS, game.rating)}</select>
        </label>
        <label>Hours
          <input data-field="hoursPlayed" type="number" min="0" step="0.5" value="${escapeHTML(game.hoursPlayed)}">
        </label>
      </div>

      <button class="delete" data-action="delete">Delete</button>
    </article>`;
}

// --- STEP 5 (bonus) ----------------------------------------------------------

export function calculateStats(games) {
  const rated = games.filter((g) => typeof g.rating === "number");
  const ratingSum = rated.reduce((sum, g) => sum + g.rating, 0);

  return {
    total: games.length,
    completed: games.filter((g) => g.status === "completed").length,
    totalHours: games.reduce((sum, g) => sum + (g.hoursPlayed || 0), 0),
    averageRating: rated.length ? Math.round((ratingSum / rated.length) * 10) / 10 : null,
  };
}
