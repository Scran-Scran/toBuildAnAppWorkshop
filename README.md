# Game Log: build a web app by filling in the missing pieces

You're building a video game logger: add the games you're playing, rate them, change their status, and delete them. The app is already wired together. Your job is to write the functions that make it work, and a test tells you when each one is right.

## Get started

**Easiest (no install):** on GitHub click **Code → Codespaces → Create codespace**. Wait for it to finish, then run:

```bash
npm start
```

A pop-up offers to open port 3000. Say yes.

**On your own machine:** you need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm start
```

Then open <http://localhost:3000>.

You'll see a red message on the page. That's expected: the app is telling you which function isn't written yet.

## How the app fits together

```
 BROWSER                                              YOUR COMPUTER (the "server")
 ┌──────────────────────────────┐   request    ┌───────────────────────────────────┐
 │ app.js   (provided)          │ ───────────▶ │ routes.js    (provided)           │
 │   │ uses                     │  GET /api/…  │   │ picks a function              │
 │   ▼                          │              │   ▼                               │
 │ api.js   ← you write         │              │ handlers.js  ← you write          │
 │ render.js ← you write        │ ◀─────────── │   │ checks input with validate.js │
 │   (turn data into HTML)      │   JSON       │   ▼                               │
 └──────────────────────────────┘              │ db.js        ← you write          │
                                               │   │ reads/writes                  │
                                               │   ▼                               │
                                               │ data/games.json  (your database)  │
                                               └───────────────────────────────────┘
```

No hosting needed: the "server" is just a program running on your machine, and the "database" is a file next to it.

**Tip:** keep `data/games.json` open in a split editor while you click around in the browser. When you change a rating on the page, you'll see the file change.

## The steps

Work top to bottom. Each step has tests: run `npm run test:1` (then 2, 3, 4, 5) and read the failures. They say what's expected.

| Step | You build | Files | Test |
|---|---|---|---|
| **1. Read** | Show the games list | `server/db.js`, `server/handlers.js`, `public/api.js`, `public/render.js` | `npm run test:1` |
| **2. Create** | Add a game, with validation | `server/validate.js`, `server/db.js`, `server/handlers.js`, `public/api.js` | `npm run test:2` |
| **3. Update** | Edit status, rating and hours from the cards | `server/validate.js`, `server/db.js`, `server/handlers.js`, `public/api.js`, `public/render.js` | `npm run test:3` |
| **4. Delete** | Remove a game | `server/db.js`, `server/handlers.js`, `public/api.js`, `public/render.js` | `npm run test:4` |
| **5. Make it yours** | Stats bar (bonus), then anything you like | `public/render.js`, and whatever you want | `npm run test:5` |

Look for comments starting `// STEP n` in each file: they tell you what to write, with hints. Some functions grow over several steps (for example `gameCardHTML` gets its controls in step 3 and its delete button in step 4).

`npm run progress` shows a checklist of what's done. `npm test` runs everything.

### The rhythm of each step

1. **Server first.** Write the `db.js` function, then the handler. Run the test.
2. **Check the API in your browser.** Visit <http://localhost:3000/api/games> to see the JSON the server sends.
3. **Then the front end.** Write the `api.js` and `render.js` pieces and watch the page come alive.

## Stuck?

- **Read the test.** The failing test's name and message say what it expected and what it got.
- **Look at the Network tab** (F12 in the browser) to see each request and response.
- **Look at the terminal** where `npm start` is running. Errors on the server show up there.
- **Broke your data?** `npm run reset` restores the sample games.
- **Really stuck?** Ask! If you need to peek, the finished version of every file is in `solutions/`. Try not to copy and paste; type it so it sinks in.

Edits to server files need a restart. Use `npm run dev` instead of `npm start` and the server restarts itself when you save.

## Step 5: make it yours

Once the basics work, this is the fun part. Some ideas, roughly easiest to hardest:

- Restyle everything in `public/style.css`: colors, fonts, layout.
- Build the **stats bar** (`calculateStats` in `render.js`); it shows up on its own once it works.
- Add a row of **filter** buttons: All / Playing / Completed. (Can be done in `app.js`, or on the server with `?status=playing`.)
- **Sort** by rating or hours played.
- Add a new field, such as `genre`, `releaseYear`, or `coverUrl`. Think about which files need to know about it: `validate.js`, `db.js`, `render.js`, and the form in `index.html`.
- A **wishlist** view for games with status `backlog`.
- Swap the JSON file for a real database. See `bonus/db.sqlite.js`: copy it over `server/db.js`, restart, and nothing else changes.

## Project map

```
server/
  index.js       provided   starts the server
  routes.js      provided   URL → handler
  handlers.js    YOU        one function per route
  validate.js    YOU        what's allowed to be saved
  db.js          YOU        reads/writes data/games.json
public/
  index.html     provided   the page
  style.css      provided   the look (edit freely)
  app.js         provided   wires clicks to the functions below
  api.js         YOU        talks to the server with fetch()
  render.js      YOU        data → HTML
data/
  games.seed.json            starting games (npm run reset copies this)
  games.json                 your live data (created on first run)
tests/                       one file per step
solutions/                   finished versions (no peeking until you need to!)
bonus/                       SQLite version of db.js
```
