# Instructor notes

## Before the day

- [ ] Fork or template this repo for attendees. Enable **Codespaces** if you can; it removes every "Node isn't installed" problem.
- [ ] Open a Codespace yourself and run `npm start` and `npm run progress`. Confirm the pop-up for port 3000 appears.
- [ ] Run `npm run check-solutions` after you change anything. The included GitHub Action does this on every push, so tests and solutions can't drift apart.
- [ ] Decide how to handle `solutions/`. Easiest: leave it in and tell people it's there. If you'd rather not tempt people, keep it on a separate branch (see below).

## Suggested timeline (about 3 hours, adjust to taste)

| Time | What |
|---|---|
| 0:00 | **Tour (15 min).** Run the app, show the red banner. Walk the diagram in the README. Open `data/games.json` and edit a title by hand, refresh the page (once step 1 is done), and see it change. This is the "database is just a file" moment. |
| 0:15 | **Step 1: Read (35 min).** The longest step because it introduces every layer. Live-code `listGames` together, then let people do the rest. Show `/api/games` in the browser address bar, then the Network tab. |
| 0:50 | **Step 2: Create (35 min).** Emphasize validation: use `curl` or the form to send an empty title and a rating of 99, and show the server say no. "The front end is a suggestion; the server is the rule." |
| 1:25 | **Break.** |
| 1:40 | **Step 3: Update (30 min).** The payoff: change a rating in the browser, watch `games.json` change. Point out PATCH vs POST, and why `id` is not editable. |
| 2:10 | **Step 4: Delete (15 min).** Fast. Good time to discuss status codes (204 vs 404). |
| 2:25 | **Step 5: Make it yours (30+ min).** Roam the room. Demo the SQLite swap as the closing "nothing else had to change" moment. |

## Teaching moments built into the design

- **Why `escapeHTML` is provided but must be used:** have someone add a game titled `<img src=x onerror=alert(1)>` before and after they use it.
- **Layering:** the SQLite swap at the end proves the point. `handlers.js` and the front end never change.
- **Tests as a spec:** failing messages say `TODO (step n): implement x() in file`, so people can always find where to go.
- **Never trust the client:** `addGame` ignores a client-sent `id`; `updateGame` ignores unknown fields. Both have tests. Ask what would go wrong without them.

## Helping people who fall behind

- Each solution file is marked with `// --- STEP n ---` comments, so a stuck attendee can copy just the function they need.
- For a full catch-up at a step boundary, use the solution files wholesale (`cp solutions/server/db.js server/db.js`, and so on). Heads up: solution files contain *all* steps, so this jumps someone to the finished state. If you want granular per-step catch-up, make a commit after each step on a `solutions` branch and tag them `step-1`, `step-2`, and so on.
- `npm run progress` is a quick way to see where a stuck person actually is.

## Keeping solutions out of sight (optional)

```bash
git checkout -b solutions            # keep the full version here
git checkout main
git rm -r solutions .github/workflows/solutions.yml
git commit -m "Remove solutions from attendee branch"
```

## Customizing

- **Different domain** (books, recipes, plants): rename the fields in `validate.js`, `db.js`, `render.js`, `index.html`, the seed file and the tests. The structure doesn't change.
- **Make it harder:** make `request()` in `api.js` and `readAll()`/`writeAll()` in `db.js` into TODOs as well.
- **Make it easier:** move `validateGame` to provided, and drop its tests from step 2.
- **Requirements:** server tests run on Node's built-in test runner (`node --test`), so there are no test dependencies. Express is the only package.
