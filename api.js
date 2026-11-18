// API -- the front end's phone line to the server.
// Each function sends a request to a URL defined in server/routes.js and returns the answer.
//
// These run in the BROWSER, so they use the built-in fetch(). Open the browser's
// Network tab (F12) to watch the requests go by.
//
// Reminder: `fetch` returns a promise; `await` it. `response.json()` is also a promise.

// STEP 1 -- the shared helper every other function in this file will use.
// request(url, options) should:
//   1. call fetch(url, ...) -- if options.body is present, send it as JSON text
//      with the header "Content-Type": "application/json" (see the other functions)
//   2. if the response is NOT ok (response.ok === false): read the JSON body and
//      throw new Error(body.error) so the page can show the server's message
//      (if there's no readable message, throw Error("Request failed (" + status + ")"))
//   3. if the status is 204 there is no body: return null
//   4. otherwise return the parsed JSON
//
// To send a JS object as the body, call request(url, { method: "POST", body: myObject })
// -- request() is the one that turns it into JSON text with JSON.stringify().
async function request(url, options = {}) {
  throw new Error("TODO (step 1): implement request() in public/api.js");
}

// STEP 1 -- GET /api/games  ->  array of games
export async function fetchGames() {
  throw new Error("TODO (step 1): implement fetchGames() in public/api.js");
}

// STEP 2 -- POST /api/games  ->  the created game
export async function createGame(game) {
  throw new Error("TODO (step 2): implement createGame() in public/api.js");
}

// STEP 3 -- PATCH /api/games/:id  ->  the updated game
// `changes` is an object with just the fields that changed, e.g. { status: "completed" }
export async function updateGame(id, changes) {
  throw new Error("TODO (step 3): implement updateGame() in public/api.js");
}

// STEP 4 -- DELETE /api/games/:id  ->  null (the server answers 204)
export async function deleteGame(id) {
  throw new Error("TODO (step 4): implement deleteGame() in public/api.js");
}
