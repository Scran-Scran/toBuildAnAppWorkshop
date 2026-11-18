// VALIDATION -- decide whether a game the browser sent is allowed to be saved.
//
// Never trust data from the front end: anyone can send anything to your API.
// This is where "how data is saved" gets decided.

export const STATUSES = ["backlog", "playing", "completed", "dropped"];

// STEP 2 -- CREATE (and finish it in STEP 3)
// Return an array of error messages. An empty array means the game is valid.
// Every message must mention the field it's about (e.g. "Title is required").
//
// Rules:
//   title        required, a non-empty string (spaces only doesn't count)
//   platform     optional, a string
//   status       optional, one of STATUSES
//   rating       optional, null OR a whole number from 1 to 5
//   hoursPlayed  optional, a number that is 0 or more
//   notes        optional, a string
//
// "Optional" means: if the field is missing (undefined), that's fine.
// `game` itself might be undefined if the browser sent no body -- handle that.
//
// STEP 3 adds an option: validateGame(changes, { partial: true }).
// When partial is true, even title is optional (an update only sends what changed),
// but any field that IS present must still follow the rules above.
export function validateGame(game, { partial = false } = {}) {
  throw new Error("TODO (step 2): implement validateGame() in server/validate.js");
}
