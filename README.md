# NaijaStats — Nigeria in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/toirant/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/toirant/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A complete, original national statistics site for **Nigeria** that runs offline in a desktop or phone browser from static files — no build step, no network requests, no libraries. Every figure names its source and year.

## The site

- **Overview** — six headline indicators (population 232.7m, GDP $252.3bn, GDP per person $1,084, inflation 33.2%, life expectancy 52.7 years, median age 17.9), a population trend chart, a GDP chart, and the latest releases.
- **Population** — total population or growth-rate chart (toggle), a 2024 age pyramid, and the three numbers that shape the story (41% under 15, 56% working age, 3% over 65).
- **Economy** — GDP and inflation charts, real-growth bars, a sector donut (services 57%, agriculture 24%, industries 19%), plus work, prices and trade cards — including why dollar GDP fell in 2024 while real growth rose.
- **Health** — life expectancy, under-5 mortality (107 per 1,000), maternal mortality, fertility, electricity access and skilled birth attendance, with a child-mortality trend chart.
- **Education** — literacy, 18.3 million children out of school, enrolment trend, and why enrolment slipped after 2018.
- **States & regions** — all 36 states and the FCT with capitals, zones and 2022 population projections; search, zone filter, sort, a top-ten chart, a page per state, and a CSV download of the table.
- **Sources & methods** — every publisher listed in full, plus the honest caveats: state figures are projections, dollar GDP and naira GDP answer different questions, and the CPI was rebased in January 2025.

## How it works

Charts are drawn on canvas by `app/charts.js` from the data in `app/data.js` — no chart library, no fetch, nothing leaves the browser. Pages are hash routes rendered by `app/main.js` from templates in `app/views.js`. `window.__shotReady` turns true once a page is drawn, so screenshots capture the finished page.

## Run it

```sh
node serve.ts            # serves app/ on http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` into the output directory and writes `dossier.json` with the vendored make.fun library (`vendor/makefun-frontend.ts`, the kit's copy unchanged). The output directory itself is never removed.

## Data

United Nations World Population Prospects 2024; World Bank World Development Indicators; National Bureau of Statistics (Nigeria); UN IGME and MMEIG; UNDP; UNESCO Institute for Statistics; UNICEF Nigeria; National Population Commission; NUPRC/OPEC; Nigeria Demographic and Health Survey 2018. Full list on the site's Sources page. NaijaStats is independent and not affiliated with any of them.
