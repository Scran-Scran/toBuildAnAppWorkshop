// HANDLERS -- one function per API route (see routes.js).
//
// A handler receives:
//   req.params.id   the :id part of the URL (always a string -- convert with Number())
//   req.body        the JSON the browser sent (POST / PATCH)
// and answers with:
//   res.json(data)            send JSON (status 200 unless you set one)
//   res.status(404).json(...) set a status code first
//   res.status(204).end()     "success, nothing to send back"
//
// Error replies use the shape { error: "message" } so the page can show them.
// Handlers are async: use `await` when you call anything from db.js.

import * as db from "./db.js";
import { validateGame } from "./validate.js";

// STEP 1 -- GET /api/games
// Respond with the array of all games.
export async function listGames(req, res) {
  throw new Error("TODO (step 1): implement listGames() in server/handlers.js");
}

// STEP 1 -- GET /api/games/:id
// Respond with one game. If there's no such game (or the id isn't a number),
// respond with status 404 and { error: "Game not found" }.
export async function getGame(req, res) {
  throw new Error("TODO (step 1): implement getGame() in server/handlers.js");
}

// STEP 2 -- POST /api/games
// Validate req.body. If there are errors: status 400 and { error: "<messages joined with '; '>" }
// and DON'T save anything. Otherwise save it and respond with status 201 and the new game.
export async function createGame(req, res) {
  throw new Error("TODO (step 2): implement createGame() in server/handlers.js");
}

// STEP 3 -- PATCH /api/games/:id
// Validate req.body with { partial: true } (400 on errors).
// Update the game. If it doesn't exist: 404 { error: "Game not found" }.
// Otherwise respond with the updated game.
export async function updateGame(req, res) {
  throw new Error("TODO (step 3): implement updateGame() in server/handlers.js");
}

// STEP 4 -- DELETE /api/games/:id
// Delete the game. Respond 204 (no body) if it was deleted,
// or 404 { error: "Game not found" } if it didn't exist.
export async function deleteGame(req, res) {
  throw new Error("TODO (step 4): implement deleteGame() in server/handlers.js");
}
