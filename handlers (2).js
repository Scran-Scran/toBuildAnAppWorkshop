// SOLUTION -- server/handlers.js
import * as db from "./db.js";
import { validateGame } from "./validate.js";

const notFound = (res) => res.status(404).json({ error: "Game not found" });

// --- STEP 1 ---------------------------------------------------------------

export async function listGames(req, res) {
  res.json(await db.listGames());
}

export async function getGame(req, res) {
  const game = await db.getGame(Number(req.params.id));
  if (!game) return notFound(res);
  res.json(game);
}

// --- STEP 2 ---------------------------------------------------------------

export async function createGame(req, res) {
  const errors = validateGame(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join("; ") });
  }
  const game = await db.addGame(req.body);
  res.status(201).json(game);
}

// --- STEP 3 ---------------------------------------------------------------

export async function updateGame(req, res) {
  const errors = validateGame(req.body, { partial: true });
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join("; ") });
  }
  const game = await db.updateGame(Number(req.params.id), req.body ?? {});
  if (!game) return notFound(res);
  res.json(game);
}

// --- STEP 4 ---------------------------------------------------------------

export async function deleteGame(req, res) {
  const deleted = await db.deleteGame(Number(req.params.id));
  if (!deleted) return notFound(res);
  res.status(204).end();
}
