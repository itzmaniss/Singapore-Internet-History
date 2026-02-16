# WebDev Finals — Project Plan

## Topic

History of the Internet in Singapore (1991–Present)

## Tech Stack

- Express 5 + Pug (server-side rendering)
- Tailwind CSS 4 (styling)
- Chart.js (data visualizations)
- data.gov.sg + World Bank APIs (data sources)

---

## File Structure

```zsh
WebDev_Finals/
├── server.js
├── package.json
├── .env
├── .gitignore
│
├── routes/
│   └── index.js
│
├── views/
│   ├── layout.pug
│   ├── index.pug
│   ├── partials/
│   │   ├── navbar.pug
│   │   └── footer.pug
│   └── eras/
│       ├── foundation.pug
│       ├── wireless.pug
│       └── smart-nation.pug
│
├── public/
│   ├── css/
│   │   └── output.css          (compiled Tailwind — gitignored)
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── night_skylines.jpg
│
├── src/
│   └── input.css               (Tailwind source)
│
└── data/
    ├── sg-internet-usage.json
    ├── sg-world-bank-internet.json
    └── world-internet-users.json
```

---

## What Goes Where

### server.js — App entry point

- Load dotenv, configure Express
- Set Pug as view engine, point to views/
- Serve public/ as static files
- Mount routes from routes/index.js
- Start listening on a port

### routes/index.js — Route definitions

- GET /              → render index.pug (homepage)
- GET /foundation    → render eras/foundation.pug
- GET /wireless      → render eras/wireless.pug
- GET /smart-nation  → render eras/smart-nation.pug
- GET /api/sg-data   → read & return data/sg-internet-usage.json
- GET /api/world-data → read & return data/world-internet-users.json

### views/layout.pug — Base template

- HTML boilerplate (head, body)
- Link to /css/output.css
- Include partials/navbar
- Block content (child pages fill this)
- Include partials/footer
- Script tag for /js/main.js

### views/partials/navbar.pug

- Navigation links: Home, Foundation Era, Wireless Era, Smart Nation

### views/partials/footer.pug

- References/citations, copyright

### views/index.pug — Homepage

- Extends layout
- Hero section with background image (night_skylines.jpg)
- Brief intro text
- Cards/links to the 3 eras

### views/eras/foundation.pug — Foundation Era (1991–2004)

- Extends ../layout
- Content: SingNet, dial-up → broadband, IT2000
- Chart placeholder for data visualization

### views/eras/wireless.pug — Wireless Era (2005–2013)

- Extends ../layout
- Content: Wireless@SG, 3G/4G, iPhone impact
- Chart placeholder

### views/eras/smart-nation.pug — Smart Nation (2013–Present)

- Extends ../layout
- Content: NGNBN, 5G, 10Gbps upgrades
- Chart placeholder

### public/js/main.js — Client-side JavaScript

- Fetch data from /api/sg-data and /api/world-data
- Render charts using Chart.js into placeholders
- Interactive elements (scroll animations, timeline nav)

### src/input.css — Tailwind source

- @import "tailwindcss"
- Custom @layer overrides if needed

### data/*.json — Static data files

- Pre-fetched API responses served by Express routes

### .env

- api keys (if needed)

### .gitignore

- node_modules/, .env, .DS_Store

---

## Data Flow

```txt
Browser  →  Express route  →  Pug template  →  HTML page
Browser  →  fetch /api/*   →  Express reads data/*.json  →  JSON  →  Chart.js renders
Tailwind:   src/input.css  →  CLI build  →  public/css/output.css
```
