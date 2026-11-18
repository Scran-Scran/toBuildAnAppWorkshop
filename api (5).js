// SOLUTION -- public/api.js

// --- STEP 1 ---------------------------------------------------------------

async function request(url, options = {}) {
  const init = { ...options };
  if (options.body !== undefined) {
    init.headers = { "Content-Type": "application/json", ...options.headers };
    init.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // body wasn't JSON; keep the generic message
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function fetchGames() {
  return request("/api/games");
}

// --- STEP 2 ---------------------------------------------------------------

export async function createGame(game) {
  return request("/api/games", { method: "POST", body: game });
}

// --- STEP 3 ---------------------------------------------------------------

export async function updateGame(id, changes) {
  return request(`/api/games/${id}`, { method: "PATCH", body: changes });
}

// --- STEP 4 ---------------------------------------------------------------

export async function deleteGame(id) {
  return request(`/api/games/${id}`, { method: "DELETE" });
}
