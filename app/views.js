// Page templates for NaijaStats. Each function returns the HTML for one
// hash route, built from the data in data.js. Every value is escaped before
// it reaches the page, and every figure is followed by its source and year.

import {
  AGE_GROUPS, COUNTRY, ECONOMY_EXTRA, EDUCATION, ENROLMENT_SERIES, GDP_GROWTH_SERIES,
  GDP_SERIES, GROWTH_SERIES, HEADLINES, HEALTH, CHILD_MORTALITY_SERIES, INFLATION_SERIES,
  POPULATION_SERIES, RELEASES, SECTORS, SOURCES, STATES,
} from './data.js';

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function sourceLine(source) {
  return `<p class="source">Source: ${escape(source)}</p>`;
}

function headlineCards() {
  return `<div class="cards">${HEADLINES.map((h) => `<article class="card">
    <p class="card-label">${escape(h.label)}</p>
    <p class="card-value">${escape(h.value)}</p>
    <p class="card-note">${escape(h.note)}</p>
    <p class="card-change">${escape(h.change)}</p>
    ${sourceLine(h.source)}
  </article>`).join('')}</div>`;
}

function chartCard(id, title, caption, tableRows) {
  return `<figure class="chart-card">
    <figcaption><h3>${escape(title)}</h3><p>${escape(caption)}</p></figcaption>
    <canvas id="${id}" class="chart" height="280" aria-label="${escape(title)}"></canvas>
    <details class="data-table"><summary>See the data as a table</summary>
    <table><thead><tr><th>Year / group</th><th>Value</th></tr></thead><tbody>${tableRows}</tbody></table>
    </details>
  </figure>`;
}

function rows(series, format) {
  return series.map((p) => `<tr><td>${p.year}</td><td>${escape(format(p.value))}</td></tr>`).join('');
}

export function overview() {
  return `<section class="hero">
    <p class="eyebrow">National statistics · ${escape(COUNTRY.name)}</p>
    <h1>${escape(COUNTRY.name)} in numbers</h1>
    <p class="lede">${escape(COUNTRY.tagline)}: 232.7 million people, a $252.3 billion
    economy, and one of the youngest populations on earth. Every figure on this site
    names its source and its year.</p>
    <p class="hero-facts"><span>Capital: ${escape(COUNTRY.capital)}</span>
    <span>Largest city: ${escape(COUNTRY.largestCity)}</span>
    <span>Area: 923,768 km²</span>
    <span>36 states + FCT</span></p>
  </section>
  <section class="grid-two">
    ${chartCard('pop-chart', 'Population, 1960–2024', 'Nigeria grew more than fivefold in 64 years — from 45.1 million at independence to 232.7 million in 2024.', rows(POPULATION_SERIES, (v) => `${v.toFixed(1)} million`))}
    ${chartCard('gdp-chart', 'GDP, 2015–2024', 'GDP in current dollars fell sharply in 2024 as the naira floated — even as real GDP grew 4.1%.', rows(GDP_SERIES, (v) => `$${v} billion`))}
  </section>
  ${headlineCards()}
  ${sourceLine('UN World Population Prospects 2024; World Bank World Development Indicators, 2024')}
  <section class="grid-two">
    <div>
      <h2>What changed lately</h2>
      <ul class="releases">${RELEASES.map((r) => `<li><strong>${escape(r.date)}</strong> — ${escape(r.text)}</li>`).join('')}</ul>
      <p><a class="button" href="#/economy">Explore the economy →</a></p>
    </div>
    <div>
      <h2>At a glance</h2>
      <dl class="facts">
        <dt>Median age</dt><dd>17.9 years (UN, 2024)</dd>
        <dt>Urban population</dt><dd>53.9% (World Bank, 2024)</dd>
        <dt>Human Development Index</dt><dd>0.548, rank 161 of 193 (UNDP, 2022)</dd>
        <dt>Official languages</dt><dd>${escape(COUNTRY.languages)}</dd>
        <dt>Independence</dt><dd>${escape(COUNTRY.independence)}</dd>
        <dt>Currency</dt><dd>${escape(COUNTRY.currency)}</dd>
      </dl>
      <p><a class="button" href="#/regions">Browse all 36 states →</a></p>
    </div>
  </section>`;
}

export function populationPage(mode) {
  const series = mode === 'growth' ? GROWTH_SERIES : POPULATION_SERIES;
  const format = mode === 'growth' ? (v) => `${v.toFixed(1)}%` : (v) => `${v.toFixed(1)}m`;
  const title = mode === 'growth' ? 'Population growth, 1960–2024' : 'Population, 1960–2024';
  const caption = mode === 'growth'
    ? 'Annual growth peaked near 2.8% around 1980 and has eased to 2.1% — still about 4.8 million more people a year.'
    : 'From 45.1 million in 1960 to 232.7 million in 2024. The UN projects about 400 million by 2050.';
  return `<h1>Population</h1>
  <p class="lede">Nigeria is Africa’s most populous country and the world’s sixth. More than
  four in ten Nigerians are children, and the population still grows by roughly 2% a year.</p>
  <div class="toggle" role="group" aria-label="Choose what the chart shows">
    <a class="toggle-btn${mode !== 'growth' ? ' active' : ''}" href="#/population">Total population</a>
    <a class="toggle-btn${mode === 'growth' ? ' active' : ''}" href="#/population/growth">Growth rate</a>
  </div>
  <section class="grid-two">
    ${chartCard('pop-chart', title, caption, rows(series, format))}
    ${chartCard('pyramid-chart', 'Age structure, 2024', 'A wide base and a narrow top: 41% of Nigerians are under 15, and only about 3% are 65 or older.', AGE_GROUPS.map((g) => `<tr><td>${g.group}</td><td>${g.share.toFixed(1)}%</td></tr>`).join(''))}
  </section>
  ${sourceLine('UN World Population Prospects 2024')}
  <section>
    <h2>Three numbers that shape the story</h2>
    <div class="cards">
      <article class="card"><p class="card-label">Under 15</p><p class="card-value">41%</p><p class="card-note">of the population are children</p>${sourceLine('UN WPP 2024')}</article>
      <article class="card"><p class="card-label">Working age (15–64)</p><p class="card-value">56%</p><p class="card-note">about 131 million people</p>${sourceLine('UN WPP 2024')}</article>
      <article class="card"><p class="card-label">65 and over</p><p class="card-value">3%</p><p class="card-note">about 6 million people</p>${sourceLine('UN WPP 2024')}</article>
    </div>
    <p>Nigeria’s working-age share is still rising, which can lift growth if jobs and
    schooling keep up — and strain them if they do not. <a href="#/education">See education →</a></p>
  </section>`;
}

export function economyPage() {
  return `<h1>Economy</h1>
  <p class="lede">A $252.3 billion economy in 2024 (World Bank), driven by services, agriculture
  and oil — and reshaped in 2023–24 when the naira was floated and fuel subsidies removed.</p>
  <section class="grid-two">
    ${chartCard('gdp-chart', 'GDP in current dollars, 2015–2024', 'Dollar GDP fell from $472 billion in 2022 to $252 billion in 2024. In naira terms the economy kept growing.', rows(GDP_SERIES, (v) => `$${v} billion`))}
    ${chartCard('inflation-chart', 'Inflation, 2019–2024', 'Annual average consumer-price inflation rose from 12.0% in 2019 to 33.2% in 2024, before the CPI was rebased in January 2025.', rows(INFLATION_SERIES, (v) => `${v.toFixed(1)}%`))}
  </section>
  ${sourceLine('World Bank WDI; National Bureau of Statistics CPI reports')}
  <section class="grid-two">
    <div>
      <h2>Real growth bounced back</h2>
      ${chartCard('growth-chart', 'Real GDP growth, 2015–2024', 'Growth turned negative in 2016 and 2020 (recession, then COVID-19), then recovered to 4.1% in 2024.', rows(GDP_GROWTH_SERIES, (v) => `${v.toFixed(1)}%`))}
      ${sourceLine('World Bank WDI; National Bureau of Statistics')}
    </div>
    <div>
      <h2>What the economy is made of</h2>
      <figure class="chart-card">
        <figcaption><h3>Shares of GDP, 2023</h3><p>Services are more than half the economy; oil sits inside industries.</p></figcaption>
        <canvas id="sector-chart" class="chart" height="240" aria-label="Shares of GDP by sector"></canvas>
        <ul class="legend">${SECTORS.map((s) => `<li><span class="swatch" data-sector="${escape(s.name)}"></span><strong>${escape(s.name)} — ${s.share}%</strong>: ${escape(s.detail)}</li>`).join('')}</ul>
      </figure>
      ${sourceLine('National Bureau of Statistics, 2023 (shares rounded)')}
    </div>
  </section>
  <section>
    <h2>Work, prices and trade</h2>
    <div class="cards">${ECONOMY_EXTRA.map((e) => `<article class="card">
      <p class="card-label">${escape(e.label)}</p><p class="card-value">${escape(e.value)}</p>
      <p class="card-note">${escape(e.note)}</p>${sourceLine(e.source)}</article>`).join('')}</div>
    <p class="note">Why dollar GDP fell while real growth rose: the naira was floated in June 2023,
    so the same naira output converted into far fewer dollars. Read the two series together.</p>
  </section>`;
}

export function healthPage() {
  return `<h1>Health</h1>
  <p class="lede">Nigerians live 52.7 years on average (2023) — among the lowest in the world.
  Child deaths have fallen by two-fifths since 2000, but maternal deaths remain very high.</p>
  <div class="cards">${HEALTH.map((h) => `<article class="card">
    <p class="card-label">${escape(h.label)}</p><p class="card-value">${escape(h.value)}</p>
    <p class="card-note">${escape(h.year)}</p>${sourceLine(h.source)}</article>`).join('')}</div>
  <section class="grid-two">
    ${chartCard('mortality-chart', 'Under-5 mortality, 2000–2022', 'Deaths before age five fell from 183 per 1,000 live births in 2000 to 107 in 2022 — still about one child in nine.', rows(CHILD_MORTALITY_SERIES, (v) => `${v} per 1,000`))}
    <div>
      <h2>What the numbers mean</h2>
      <p>Nigeria accounts for a large share of the world’s maternal and child deaths, because
      so many births happen far from skilled care: only 43% of births are attended by skilled
      health staff (NDHS 2018). Malaria, pneumonia and diarrhoea remain leading killers of
      children under five.</p>
      <p>The improvement since 2000 is real but slow: under-5 mortality fell by about 2% a year,
      against a global pace roughly twice as fast.</p>
      <p><a class="button" href="#/population">See the age structure →</a></p>
    </div>
  </section>
  ${sourceLine('UN IGME; UN MMEIG; World Bank WDI; NDHS 2018')}`;
}

export function educationPage() {
  return `<h1>Education</h1>
  <p class="lede">Nigeria has one of the world’s largest out-of-school populations — 18.3 million
  children (UNICEF, 2022) — and adult literacy of 62% (UNESCO, 2018). The school-age
  population keeps growing faster than classrooms do.</p>
  <div class="cards">${EDUCATION.map((e) => `<article class="card">
    <p class="card-label">${escape(e.label)}</p><p class="card-value">${escape(e.value)}</p>
    <p class="card-note">${escape(e.year)}</p>${sourceLine(e.source)}</article>`).join('')}</div>
  <section class="grid-two">
    ${chartCard('enrol-chart', 'Primary net enrolment, 2010–2022', 'The share of primary-age children in school rose to 71% in 2018, then slipped to 66% by 2022.', rows(ENROLMENT_SERIES, (v) => `${v}%`))}
    <div>
      <h2>Why enrolment slipped</h2>
      <p>Enrolment fell after 2018 as insecurity closed schools in the North East and North West,
      and as household costs pushed children into work. Girls in the north are the most affected:
      in some northern states fewer than half of girls complete primary school.</p>
      <p>Class sizes tell the same story: 34 primary pupils per teacher nationally (UNESCO, 2021),
      with far higher ratios in crowded urban schools.</p>
      <p><a class="button" href="#/sources">Check every source →</a></p>
    </div>
  </section>
  ${sourceLine('UNESCO Institute for Statistics; UNICEF Nigeria, 2022')}`;
}

export function regionsPage(filter) {
  const zones = COUNTRY.zones;
  const list = STATES.filter((s) => !filter.zone || s.zone === filter.zone)
    .filter((s) => !filter.query || s.name.toLowerCase().includes(filter.query) || s.capital.toLowerCase().includes(filter.query))
    .sort((a, b) => (filter.sort === 'name' ? a.name.localeCompare(b.name) : b.pop - a.pop));
  const total = list.reduce((sum, s) => sum + s.pop, 0);
  return `<h1>States &amp; regions</h1>
  <p class="lede">All 36 states and the Federal Capital Territory. Populations are National
  Population Commission 2022 projections — estimates, not census counts. Search, filter by
  geopolitical zone, or sort the table.</p>
  <form class="filters" id="region-filters">
    <label>Search a state or capital
      <input type="search" id="state-search" placeholder="e.g. Lagos or Ibadan" value="${escape(filter.query || '')}" aria-label="Search states">
    </label>
    <label>Zone
      <select id="zone-select" aria-label="Filter by zone">
        <option value="">All six zones</option>
        ${zones.map((z) => `<option value="${escape(z)}"${filter.zone === z ? ' selected' : ''}>${escape(z)}</option>`).join('')}
      </select>
    </label>
    <label>Sort by
      <select id="sort-select" aria-label="Sort states">
        <option value="pop"${filter.sort !== 'name' ? ' selected' : ''}>Largest first</option>
        <option value="name"${filter.sort === 'name' ? ' selected' : ''}>Name A–Z</option>
      </select>
    </label>
  </form>
  <p class="result-count" id="result-count">${list.length} of 37 areas shown · ${total.toFixed(1)} million people</p>
  ${chartCard('state-chart', 'The ten largest states', 'Kano and Lagos each hold more people than many African countries. Together the top ten hold about half of Nigeria.', STATES.slice().sort((a, b) => b.pop - a.pop).slice(0, 10).map((s) => `<tr><td>${escape(s.name)}</td><td>${s.pop.toFixed(1)} million</td></tr>`).join(''))}
  <table class="states-table" id="states-table">
    <thead><tr><th>State</th><th>Capital</th><th>Zone</th><th>Population (est.)</th><th>Share of Nigeria</th></tr></thead>
    <tbody>${list.map((s) => `<tr>
      <td><a href="#/regions/${encodeURIComponent(s.name.toLowerCase().replace(/ /g, '-'))}">${escape(s.name)}</a></td>
      <td>${escape(s.capital)}</td><td>${escape(s.zone)}</td>
      <td>${s.pop.toFixed(1)} million</td><td>${((s.pop / 232.7) * 100).toFixed(1)}%</td>
    </tr>`).join('') || '<tr><td colspan="5">No state matches that search.</td></tr>'}</tbody>
  </table>
  ${sourceLine('National Population Commission, 2022 projections; shares computed against UN 2024 population of 232.7 million')}
  <p><button class="button" id="download-csv" type="button">Download this table as CSV</button></p>`;
}

export function statePage(state) {
  const rank = STATES.slice().sort((a, b) => b.pop - a.pop).findIndex((s) => s.name === state.name) + 1;
  const share = ((state.pop / 232.7) * 100).toFixed(1);
  const neighbours = STATES.filter((s) => s.zone === state.zone && s.name !== state.name).slice(0, 5);
  return `<p><a href="#/regions">← All states</a></p>
  <h1>${escape(state.name)}</h1>
  <p class="lede">Capital ${escape(state.capital)} · ${escape(state.zone)} · ranked ${rank} of 37 by population.</p>
  <div class="cards">
    <article class="card"><p class="card-label">Population (est.)</p><p class="card-value">${state.pop.toFixed(1)} million</p><p class="card-note">NPC 2022 projection</p>${sourceLine('National Population Commission, 2022')}</article>
    <article class="card"><p class="card-label">Share of Nigeria</p><p class="card-value">${share}%</p><p class="card-note">of 232.7 million people</p>${sourceLine('UN WPP 2024; computed')}</article>
    <article class="card"><p class="card-label">Capital</p><p class="card-value">${escape(state.capital)}</p><p class="card-note">${escape(state.zone)}</p>${sourceLine('Federal Republic of Nigeria')}</article>
  </div>
  <section>
    <h2>Other states in the ${escape(state.zone)}</h2>
    <ul class="state-links">${neighbours.map((s) => `<li><a href="#/regions/${encodeURIComponent(s.name.toLowerCase().replace(/ /g, '-'))}">${escape(s.name)}</a> — ${s.pop.toFixed(1)} million, capital ${escape(s.capital)}</li>`).join('')}</ul>
    <p><a class="button" href="#/regions">Back to all states →</a></p>
  </section>`;
}

export function sourcesPage() {
  return `<h1>Sources &amp; methods</h1>
  <p class="lede">Every figure on this site names its publisher and year where it appears.
  This page lists each source in full, and the judgements behind the numbers.</p>
  <table class="sources-table">
    <thead><tr><th>Publisher</th><th>Publication</th><th>Used for</th></tr></thead>
    <tbody>${SOURCES.map((s) => `<tr><td>${escape(s.publisher)}</td><td>${escape(s.work)}</td><td>${escape(s.covers)}</td></tr>`).join('')}</tbody>
  </table>
  <section>
    <h2>Read the numbers honestly</h2>
    <ul>
      <li><strong>State populations are projections.</strong> Nigeria’s last census was in 2006; the figures here are the National Population Commission’s 2022 projections, and different demographers give different state totals. Treat them as estimates.</li>
      <li><strong>Dollar GDP fell while the real economy grew.</strong> The naira float of June 2023 roughly halved the dollar value of GDP in 2024, even as real (inflation-adjusted) GDP grew 4.1%. The naira series and the dollar series answer different questions.</li>
      <li><strong>The CPI was rebased in January 2025.</strong> Inflation figures after that date sit on a new basket and are not directly comparable with the 2019–2024 series shown here.</li>
      <li><strong>Survey years differ.</strong> Literacy is 2018, poverty is 2019, maternal mortality is 2020. Older figures are shown with their year, never presented as current.</li>
      <li><strong>Rounding.</strong> Sector shares and age-group shares are rounded; totals may not sum to exactly 100%.</li>
    </ul>
    <p><button class="button" id="print-page" type="button">Print this page</button></p>
  </section>
  <p class="note">NaijaStats is an independent statistics site. It is not affiliated with the
  National Bureau of Statistics, the United Nations, the World Bank, or any government.</p>`;
}

export function missing() {
  return `<h1>Page not found</h1>
  <p>There is no page at this address. Try one of the sections below.</p>
  <p><a class="button" href="#/">Back to the overview →</a></p>`;
}
