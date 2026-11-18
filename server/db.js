// THE "DATABASE" -- a JSON file on your own machine (data/games.json).
//
// The rest of the app only talks to the five exported functions below, so it never
// knows (or cares) how the data is stored. Later you can swap this file for SQLite
// and nothing else has to change.
//
// A game looks like this:
//   { id: 1, title: "Hades", platform: "PC", status: "completed",
//     rating: 5, hoursPlayed: 42, notes: "Best run: Zagreus + Hammer" }
//
// TIP: open data/games.json next to your browser while you work and watch it change.

import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function dataFile() {
  // Tests set GAMES_FILE so they never touch your real data.
  return process.env.GAMES_FILE ?? path.join(root, "data", "games.json");
}

// ---------------------------------------------------------------------------
// PROVIDED helpers -- use these inside your functions.
// ---------------------------------------------------------------------------

/** Read every game from the file. Always returns a fresh array. */
async function readAll() {
  try {
    return JSON.parse(await readFile(dataFile(), "utf8"));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    // First run: no games.json yet, so start from the seed.
    await mkdir(path.dirname(dataFile()), { recursive: true });
    await copyFile(path.join(root, "data", "games.seed.json"), dataFile());
    return JSON.parse(await readFile(dataFile(), "utf8"));
  }
}

/** Overwrite the file with this array of games. */
async function writeAll(games) {
  await writeFile(dataFile(), JSON.stringify(games, null, 2) + "\n");
}

// ---------------------------------------------------------------------------
// YOUR FUNCTIONS
// ---------------------------------------------------------------------------

// STEP 1 -- READ
// Return every game as an array.
// Hint: readAll() already does the work.
export async function listGames() {

  return await readAll();
  //throw new Error("TODO (step 1): implement listGames() in server/db.js");
}

// STEP 1 -- READ
// Return the game whose id matches, or null if there isn't one.
// Hint: Array.prototype.find()
export async function getGame(id) {

  const games = await readAll();
  return games.find(game => game.id === id) || null;
  //throw new Error("TODO (step 1): implement getGame() in server/db.js");
}

// STEP 2 -- CREATE
// Save a new game and return it (including its new id).
//   - id: one higher than the biggest existing id (or 1 if there are no games)
//   - title: trimmed of leading/trailing spaces
//   - anything missing gets a default:
//       platform "", status "backlog", rating null, hoursPlayed 0, notes ""
// Hint: build the object, push it onto the array from readAll(), then writeAll().
export async function addGame(game) {
  throw new Error("TODO (step 2): implement addGame() in server/db.js");
}

// STEP 3 -- UPDATE
// Change some fields of an existing game and return the updated game.
// Return null if no game has that id.
//   - Only change the fields in `changes`; leave the rest alone.
//   - Only allow these fields: title, platform, status, rating, hoursPlayed, notes.
//     In particular, the id must never change.
// Hint: { ...existing, ...allowedChanges }
export async function updateGame(id, changes) {
  throw new Error("TODO (step 3): implement updateGame() in server/db.js");
}

// STEP 4 -- DELETE
// Remove the game with this id. Return true if something was removed, false if not.
// Hint: Array.prototype.filter(), then compare lengths.
export async function deleteGame(id) {
  throw new Error("TODO (step 4): implement deleteGame() in server/db.js");
}
