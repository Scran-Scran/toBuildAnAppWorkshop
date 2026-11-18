// SOLUTION -- server/db.js (JSON file storage)
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function dataFile() {
  return process.env.GAMES_FILE ?? path.join(root, "data", "games.json");
}

async function readAll() {
  try {
    return JSON.parse(await readFile(dataFile(), "utf8"));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    await mkdir(path.dirname(dataFile()), { recursive: true });
    await copyFile(path.join(root, "data", "games.seed.json"), dataFile());
    return JSON.parse(await readFile(dataFile(), "utf8"));
  }
}

async function writeAll(games) {
  await writeFile(dataFile(), JSON.stringify(games, null, 2) + "\n");
}

// --- STEP 1: READ ----------------------------------------------------------

export async function listGames() {
  return readAll();
}

export async function getGame(id) {
  const games = await readAll();
  return games.find((game) => game.id === id) ?? null;
}

// --- STEP 2: CREATE --------------------------------------------------------

export async function addGame(game) {
  const games = await readAll();
  const nextId = games.reduce((max, g) => Math.max(max, g.id), 0) + 1;

  const newGame = {
    id: nextId, // always ours, never the client's
    title: game.title.trim(),
    platform: game.platform ?? "",
    status: game.status ?? "backlog",
    rating: game.rating ?? null,
    hoursPlayed: game.hoursPlayed ?? 0,
    notes: game.notes ?? "",
  };

  games.push(newGame);
  await writeAll(games);
  return newGame;
}

// --- STEP 3: UPDATE --------------------------------------------------------

const EDITABLE_FIELDS = ["title", "platform", "status", "rating", "hoursPlayed", "notes"];

export async function updateGame(id, changes) {
  const games = await readAll();
  const index = games.findIndex((game) => game.id === id);
  if (index === -1) return null;

  // Copy over only the fields we allow -- never the id, never unknown fields.
  const allowed = {};
  for (const field of EDITABLE_FIELDS) {
    if (field in changes) allowed[field] = changes[field];
  }
  if (typeof allowed.title === "string") allowed.title = allowed.title.trim();

  games[index] = { ...games[index], ...allowed };
  await writeAll(games);
  return games[index];
}

// --- STEP 4: DELETE --------------------------------------------------------

export async function deleteGame(id) {
  const games = await readAll();
  const remaining = games.filter((game) => game.id !== id);
  if (remaining.length === games.length) return false;
  await writeAll(remaining);
  return true;
}
