# WebDev Finals — Project Plan

## Topic

History of the Internet in Singapore (1991–Present)

## Tech Stack

- Next.js + React (App Router, server-side rendering)
- Tailwind CSS 4 (styling)
- Chart.js (data visualizations)
- AJV (JSON schema validation)
- data.gov.sg + World Bank APIs (data sources)

---

## File Structure

```
Singapore-Internet-History/
├── app/
│   ├── layout.jsx                  # Root layout (nav + footer)
│   ├── page.jsx                    # Homepage
│   ├── globals.css                 # Tailwind styles
│   ├── [era]/
│   │   └── page.jsx                # Dynamic era page template
│   └── api/
│       └── internet-usage/
│           ├── singapore/
│           │   └── route.js        # GET /api/internet-usage/singapore
│           └── global/
│               └── route.js        # GET /api/internet-usage/global
│
├── components/
│   ├── Navbar.jsx                  # Navigation bar
│   └── Footer.jsx                  # Footer with citations
│
├── utils/
│   ├── index.js                    # Barrel export for validators
│   ├── internetUsageGlobal.js      # AJV schema + validator (global)
│   ├── internetUsageSingapore.js   # AJV schema + validator (singapore)
│   └── eraContent.js              # AJV schema + validator (era pages)
│
├── data/
│   ├── internet_usage_in_sg.json
│   ├── internet_usage_by_country.json
│   ├── eras/
│   │   ├── foundation.json         # Foundation Era content
│   │   ├── wireless.json           # Wireless Era content
│   │   └── smart-nation.json       # Smart Nation Era content
│   ├── SGData/
│   │   ├── convert.py
│   │   ├── IndividualInternetUsage.csv
│   │   ├── IndividualsInternetUsageByAgeGroupAnnual.csv
│   │   ├── internet_usage_in_sg.json
│   │   └── sg_data_analytics.ipynb
│   └── WorldData/
│       ├── API_IT.NET.USER.ZS_DS2_en_csv_v2_1228.csv
│       ├── Metadata_Country_API_IT.NET.USER.ZS_DS2_en_csv_v2_1228.csv
│       ├── Metadata_Indicator_API_IT.NET.USER.ZS_DS2_en_csv_v2_1228.csv
│       └── world_data_analytics.ipynb
│
├── public/
│   └── images/
│       └── mbs_night.jpg
│
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── plan.md
```

---

## What Goes Where

### app/layout.jsx — Root Layout

- HTML boilerplate (head, body)
- Import globals.css (Tailwind)
- Include Navbar and Footer components
- {children} slot for page content

### app/page.jsx — Homepage

- Hero section with background image (mbs_night.jpg)
- Brief intro text
- Cards/links to the 3 eras

### app/[era]/page.jsx — Dynamic Era Page Template

- Reads `era` param from URL (foundation, wireless, smart-nation)
- Loads corresponding JSON from data/eras/{era}.json
- Validates with AJV (validateEraContent)
- Renders shared template with era-specific data:
  - Title, period, description
  - Key milestones/events
  - Chart component for data visualization
  - Sources/references
- Returns 404 if era slug is invalid

### app/api/internet-usage/singapore/route.js — Singapore API

- Read data/internet_usage_in_sg.json
- Validate with AJV (validateSingaporeInternetUsage)
- Return JSON response or error

### app/api/internet-usage/global/route.js — Global API

- Read data/internet_usage_by_country.json
- Validate with AJV (validateGlobalInternetUsage)
- Return JSON response or error

### components/Navbar.jsx — Navigation

- Navigation links: Home, Foundation Era, Wireless Era, Smart Nation
- (replaces views/partials/nav.pug)

### components/Footer.jsx — Footer

- References/citations, copyright
- (replaces views/partials/footer.pug)

### utils/ — AJV Validators

- internetUsageSingapore.js — Schema + validator (reused from Express)
- internetUsageGlobal.js — Schema + validator (reused from Express)
- eraContent.js — Schema + validator for era page JSON data
- index.js — Barrel export for all validators

### data/*.json — Static data files

- Pre-fetched API responses served by Next.js API routes

### data/eras/*.json — Era page content

- One JSON file per era with page content (title, period, description, milestones, etc.)
- Validated by AJV before rendering in [era]/page.jsx
- Shared schema ensures consistent structure across all eras

---

## Data Flow

```txt
Browser  →  Next.js page (server component)  →  React JSX  →  HTML page
Browser  →  fetch /api/*  →  Next.js route handler reads data/*.json  →  AJV validates  →  JSON  →  Chart.js renders
Tailwind:   globals.css  →  PostCSS/Tailwind  →  compiled styles
```

---

## Migration Checklist

- [ ] Initialize Next.js project (npx create-next-app)
- [ ] Move data/ and utils/ into new project (reuse as-is)
- [ ] Move public/images/ into new public/
- [ ] Set up Tailwind CSS
- [ ] Create app/layout.jsx (from views layout + partials)
- [ ] Create components/Navbar.jsx (from views/partials/nav.pug)
- [ ] Create components/Footer.jsx (from views/partials/footer.pug)
- [ ] Create app/page.jsx (from views/index.pug)
- [ ] Create data/eras/*.json content files (foundation, wireless, smart-nation)
- [ ] Create AJV schema for era content (utils/eraContent.js)
- [ ] Create app/[era]/page.jsx dynamic template
- [ ] Create API route handlers (from routes/api.js)
- [ ] Wire up Chart.js for data visualizations
- [ ] Remove old Express files (server.js, routes/, views/, src/)
