// SOLUTION -- server/validate.js
export const STATUSES = ["backlog", "playing", "completed", "dropped"];

export function validateGame(game, { partial = false } = {}) {
  const g = game ?? {};
  const errors = [];

  // title: required (unless partial), and never blank if it's there
  if (g.title !== undefined || !partial) {
    if (typeof g.title !== "string" || g.title.trim() === "") {
      errors.push("Title is required and can't be blank");
    }
  }

  if (g.platform !== undefined && typeof g.platform !== "string") {
    errors.push("Platform must be text");
  }

  if (g.status !== undefined && !STATUSES.includes(g.status)) {
    errors.push(`Status must be one of: ${STATUSES.join(", ")}`);
  }

  if (g.rating !== undefined && g.rating !== null) {
    if (!Number.isInteger(g.rating) || g.rating < 1 || g.rating > 5) {
      errors.push("Rating must be a whole number from 1 to 5 (or empty)");
    }
  }

  if (g.hoursPlayed !== undefined) {
    if (typeof g.hoursPlayed !== "number" || !Number.isFinite(g.hoursPlayed) || g.hoursPlayed < 0) {
      errors.push("Hours played must be a number, 0 or more");
    }
  }

  if (g.notes !== undefined && typeof g.notes !== "string") {
    errors.push("Notes must be text");
  }

  return errors;
}
