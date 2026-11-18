// RENDER -- turn data into HTML.
// These are plain functions: data in, string out. No DOM needed, which is why
// they're easy to test. app.js takes the strings and puts them on the page.

export const STATUSES = ["backlog", "playing", "completed", "dropped"];

// ---------------------------------------------------------------------------
// PROVIDED helpers
// ---------------------------------------------------------------------------

/**
 * Make text safe to put inside HTML. ALWAYS run user-typed text through this.
 * Without it, a game titled <script>alert(1)</script> would run as code
 * (that's called XSS, and it's one of the most common web bugs).
 */
export function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Build <option> tags for a <select>; the one matching `current` gets `selected`. */
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

// ---------------------------------------------------------------------------
// YOUR FUNCTIONS
// ---------------------------------------------------------------------------

// STEP 1 -- READ
// Return the HTML (a string) for one game card.
//
// Contract:
//   - the outermost element carries data-id="<the game's id>"
//   - show the title, platform and notes -- every piece of text goes through escapeHTML()
//
// Suggested markup (style.css is written for it):
//
//   <article class="game-card" data-id="1" data-status="completed">
//     <h3>Hades</h3>
//     <p class="platform">PC</p>
//     <p class="notes">Best run: Zagreus + Hammer</p>
//   </article>
//
// STEP 3 -- UPDATE: come back and add editable controls inside the card, each with a
//   data-field attribute naming the game property it edits (app.js listens for these):
//     <select data-field="status">      use optionsHTML(STATUS_OPTIONS, game.status)
//     <select data-field="rating">      use optionsHTML(RATING_OPTIONS, game.rating)
//     <input  data-field="hoursPlayed" type="number" min="0" step="0.5" value="42">
//   Suggested wrapper: <div class="controls"> with a <label> around each control.
//
// STEP 4 -- DELETE: come back again and add <button class="delete" data-action="delete">Delete</button>
export function gameCardHTML(game) {
  throw new Error("TODO (step 1): implement gameCardHTML() in public/render.js");
}

// STEP 5 -- BONUS: the stats bar
// Given an array of games return:
//   { total, completed, totalHours, averageRating }
//   total          how many games
//   completed      how many have status "completed"
//   totalHours     sum of hoursPlayed
//   averageRating  average of the games that HAVE a rating, rounded to 1 decimal;
//                  null if none are rated
// Once this works, a summary bar appears on the page automatically.
export function calculateStats(games) {
  throw new Error("TODO (step 5): implement calculateStats() in public/render.js");
}
