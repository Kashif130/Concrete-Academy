# A Concrete Field Guide

Unofficial, community-made explainer + quiz site about Concrete (concrete.xyz) — eight short lessons ("drawings") each with a 3-question quiz ("inspection"). Progress and score are stored in the visitor's own browser (localStorage), with a fun tier system: Apprentice → Builder → Foreman → Architect.

**What's in it now:**
- 10 lessons, from the basics (one-click DeFi, vaults) through deep/advanced material (vault roles and custody, MultisigStrategy, epoch-based withdrawals, ctToken mechanics, the institutional pivot, and the Blueprint Finance funding trail) sourced from Concrete's own docs and public announcements
- 30 quiz questions total, with instant feedback and a "sign off" / "re-inspect" result
- A **Live Data** page that fetches Concrete's real, current TVL and chain count directly from DefiLlama's free public API (`api.llama.fi/protocol/concrete`) every time it's opened — including a TVL history sparkline and 7d/30d change, plus a hand-verified funding-round overview. Not hardcoded, has a manual refresh button, and fails gracefully with a clear message if the API is briefly unreachable
- An **Updates** page with two parts: (1) live, auto-updating official X timeline embeds for **@ConcreteXYZ** and **@Blueprint_DeFi**, rendered by X's own widgets.js — no fetching needed, X keeps them current; (2) one unified, filterable **article feed** that merges the full hand-verified history (funding rounds, product launches, acquisitions, rebrands from Blueprint Finance's 2022 founding onward) with a live feed pulled from Concrete's own official blog (`paragraph.com/@concretexyz`) every time the page opens and again every 10 minutes automatically — so new posts appear on their own going forward, sorted newest-first, with category filter chips (Funding, Product, Community, etc.)
- A searchable **Glossary** of every term used across the lessons (ERC-4626, epoch, Allocator, Bags, AssetCX, concUSD, TGE, etc.)
- A verified **official links** panel (main site, app, points portal, docs, both X accounts, Blueprint Finance's site, the official blog, DefiLlama) so community members always have one trustworthy place to check a URL against

No build step, no framework, no backend. Just three files: `index.html`, `style.css`, `app.js`.

## Put it online with Vercel (no coding needed)

**Option A — easiest, no GitHub account needed:**
1. Install Node.js if you don't have it already: https://nodejs.org (just click the big green "LTS" download button and install it).
2. Open a terminal (Mac: Terminal app. Windows: search "Command Prompt").
3. Go into this folder, e.g.:
   ```
   cd path/to/concrete-academy
   ```
4. Run:
   ```
   npx vercel
   ```
5. It will ask you to log in (opens your browser — sign up with email or GitHub, it's free) and ask a few yes/no questions — just press Enter to accept the defaults each time.
6. When it finishes, it prints a live URL. That's your site.
7. Any time you want to update it after making changes, run:
   ```
   npx vercel --prod
   ```

**Option B — via GitHub (if you already use GitHub):**
1. Create a new repository on github.com and upload these three files (`index.html`, `style.css`, `app.js`) plus this README.
2. Go to vercel.com → **Add New → Project** → connect your GitHub account → select the repository.
3. Leave all settings as default (it's a static site, no build command needed) → click **Deploy**.
4. Vercel gives you a live URL, and redeploys automatically every time you update the GitHub repo.

## Editing the content

All lesson text and quiz questions live in one place near the top of `app.js`, in the `LESSONS` array. Each lesson has:
- `title`, `teaser` — shown on the lesson list
- `body` — an array of paragraphs (plain text/HTML strings)
- `callout` — the highlighted pull-quote line
- `quiz` — an array of `{ q, options, correct }`, where `correct` is the index (starting at 0) of the right answer in `options`

Add a new lesson by copying one of the existing objects in that array and giving it a new `id` and `sheetNo`.

## A couple of notes

- This is clearly labeled as unofficial and community-made — it isn't Concrete's official points/Bags system, and finishing lessons here doesn't earn real Concrete Points. It's a learning tool to help the community actually understand the protocol.
- Facts about Concrete were current as of when this was written — double-check anything that might have changed (fees, funding, whether a token has launched) against the official site before repeating it as fact in Discord.
- The Live Data page depends on DefiLlama's API staying free and public, which it has been for years, but if it ever changes or renames Concrete's protocol slug, the page will show its built-in "couldn't reach the API" message rather than break silently.
- If you ever want to swap the live-data source (e.g. to Concrete's own subgraph or an official API, if one becomes public), everything lives in the `fetchLiveData()` function near the bottom of `app.js` — one function to edit, nothing else touches it.

## About the Updates feature specifically

Be upfront with the community about what this is and isn't:

- **One merged, filterable feed.** `fetchAndRenderUpdates()` in `app.js` combines two sources into a single list sorted newest-first: the hand-verified `TIMELINE_EVENTS` array (full history, 2022 → now) and live items fetched from Concrete's official blog. Category chips (Funding, Product, Community, Launch, Founding, Acquisition, Rebrand, Blog Post) let visitors filter without re-fetching. The feed renders the full history instantly, then merges in fresh blog posts once the network call resolves, so the page never looks empty while loading.
- **The X timelines are the most "live" part for X specifically.** They're X's own official `<a class="twitter-timeline">` embeds, loaded via `https://platform.twitter.com/widgets.js` in `index.html`. X itself keeps them current — this site does no fetching for them at all. `app.js` calls `window.twttr.widgets.load()` every time the Updates page is opened. **Note:** pulling X posts into the article feed itself the same way the blog is pulled in would require a paid X API — not something a free static site can do — so X activity stays in its own live-embed panel rather than being merged into the article cards.
- **The official blog feed** pulls from Concrete's own Paragraph blog (`https://paragraph.com/api/blogs/rss/%40concretexyz`) every time the page opens, and again every 10 minutes automatically while the Updates page stays open (`startNewsAutoRefresh()`). It goes through a public, keyless relay (`api.allorigins.win`, with `corsproxy.io` as a fallback) purely because the feed doesn't send browser-friendly CORS headers. If the relay is ever down, the feed still shows the full milestone history with a clear status message, and a link to open the blog directly.
- **It is not a push notification** and doesn't run when nobody has the page open — a static site with no server can't do that. True push alerts (e.g. into Discord the instant something is published) would need a small always-on backend or a scheduled Discord webhook, outside what a Vercel-hosted static site can do on its own.
- **New milestones going forward:** add an object to `TIMELINE_EVENTS` (`date`, `sortDate: "YYYY-MM-DD"`, `tag`, `title`, `body`, `link`) near the "Curated funding & product timeline" comment in `app.js` — it appears in the feed and filter chips automatically, and any entry tagged `Funding` also shows up in the Live Data page's funding overview. New blog posts need no manual edit at all — they're picked up on the next auto-refresh.
- **To point the X embeds or blog feed at different accounts:** the X handles are the `href` values on the two `<a class="twitter-timeline">` tags in the Updates section of `index.html`; the blog source is the `OFFICIAL_BLOG_RSS_URL` constant in `app.js`.
