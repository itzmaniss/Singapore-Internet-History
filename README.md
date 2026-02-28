# Singapore's Digital Journey

A web application exploring Singapore's transformation from a single 64 kbps academic link in 1991 to one of the world's most connected nations. Built as a SIM WebDev Finals project.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Styling:** Tailwind CSS v4
- **Charts:** Chart.js + react-chartjs-2
- **Data Validation:** Ajv with ajv-formats
- **Testing:** Jest 30
- **Runtime:** Bun (Docker) / Node.js (local)

## Project Structure

```zsh
app/
  page.jsx              # Landing page
  layout.jsx            # Root layout with metadata & footer
  overview/page.jsx     # Overview with charts and era cards
  [era]/page.jsx        # Dynamic era pages (foundation, wireless, smart-nation)
  [era]/not-found.jsx   # Custom 404 for invalid eras
  api/internet-usage/   # API routes for SG and global data

components/
  NavBar.jsx            # Sticky navbar with scroll effects & hamburger menu
  Footer.jsx            # Site footer
  FadeIn.jsx            # IntersectionObserver scroll animation wrapper
  MilestoneCard.jsx     # Expandable milestone card with image
  SingaporeChart.jsx    # SG internet usage line chart
  GlobalChart.jsx       # Multi-country comparison chart

data/
  eras/                 # Era JSON files (foundation, wireless, smart-nation)
  internet_usage_in_sg.json
  internet_usage_by_country.json
  SGData/               # Raw CSV sources and Jupyter notebooks
  WorldData/            # World Bank CSV sources and notebooks

utils/
  index.js              # Ajv validators for data schemas
  eraContent.js         # Era content validation
  internetUsageSingapore.js
  internetUsageGlobal.js

test/
  validators.test.js    # Schema validation tests
  dataIntegrity.test.js # Data integrity tests
  getEraData.test.js    # Era data loader tests
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Run tests

```bash
npm test
```

### Build for production

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t sg-digital-journey .
docker run -p 3000:3000 sg-digital-journey
```

## Eras

| Era | Period | Slug |
| ----- | -------- | ------ |
| Foundation | 1991 - 2002 | `/foundation` |
| Wireless | 2003 - 2013 | `/wireless` |
| Smart Nation | 2014 - present | `/smart-nation` |

## Data Sources

- **Singapore internet usage:** Data.gov.sg
- **Global internet usage:** World Bank (IT.NET.USER.ZS indicator)

## Author

itzmaniss
