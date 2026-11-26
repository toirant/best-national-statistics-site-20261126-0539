// NaijaStats router: hash routes, chart drawing and the working controls.
// Routes:
//   #/                  overview
//   #/population        population (total)   #/population/growth  growth rate
//   #/economy           economy
//   #/health            health
//   #/education         education
//   #/regions           states table         #/regions/<state>  one state
//   #/sources           sources & methods
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  AGE_GROUPS, CHILD_MORTALITY_SERIES, ENROLMENT_SERIES, GDP_GROWTH_SERIES,
  GDP_SERIES, GROWTH_SERIES, INFLATION_SERIES, POPULATION_SERIES, SECTORS, STATES,
} from './data.js';
import { barChart, donut, lineChart, pyramid, stateBars } from './charts.js';
import {
  economyPage, educationPage, healthPage, missing, overview, populationPage,
  regionsPage, sourcesPage, statePage,
} from './views.js';

const app = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('[data-nav]'));

// The regions page keeps its filter in memory so typing does not lose the
// table while the route stays the same.
const regionFilter = { query: '', zone: '', sort: 'pop' };

function drawCharts(route) {
  const byId = (id) => document.getElementById(id);
  if (route === 'overview') {
    if (byId('pop-chart')) lineChart(byId('pop-chart'), POPULATION_SERIES, { format: (v) => `${Math.round(v)}m` });
    if (byId('gdp-chart')) barChart(byId('gdp-chart'), GDP_SERIES, { format: (v) => `$${v}bn`, highlightLast: true });
  }
  if (route === 'population') {
    const growth = location.hash.startsWith('#/population/growth');
    if (byId('pop-chart')) {
      lineChart(byId('pop-chart'), growth ? GROWTH_SERIES : POPULATION_SERIES, {
        format: growth ? (v) => `${v.toFixed(1)}%` : (v) => `${Math.round(v)}m`,
      });
    }
    if (byId('pyramid-chart')) pyramid(byId('pyramid-chart'), AGE_GROUPS);
  }
  if (route === 'economy') {
    if (byId('gdp-chart')) barChart(byId('gdp-chart'), GDP_SERIES, { format: (v) => `$${v}bn`, highlightLast: true });
    if (byId('inflation-chart')) lineChart(byId('inflation-chart'), INFLATION_SERIES, { format: (v) => `${v.toFixed(0)}%`, color: '#c98a2e' });
    if (byId('growth-chart')) barChart(byId('growth-chart'), GDP_GROWTH_SERIES, { format: (v) => `${v.toFixed(1)}%` });
    if (byId('sector-chart')) donut(byId('sector-chart'), SECTORS, 'GDP 2023');
  }
  if (route === 'health' && byId('mortality-chart')) {
    lineChart(byId('mortality-chart'), CHILD_MORTALITY_SERIES, { format: (v) => `${v}`, color: '#c98a2e' });
  }
  if (route === 'education' && byId('enrol-chart')) {
    lineChart(byId('enrol-chart'), ENROLMENT_SERIES, { format: (v) => `${v}%` });
  }
  if (route === 'regions' && byId('state-chart')) stateBars(byId('state-chart'), STATES);
}

function wireRegions() {
  const search = document.getElementById('state-search');
  const zone = document.getElementById('zone-select');
  const sort = document.getElementById('sort-select');
  const csv = document.getElementById('download-csv');
  if (!search || !zone || !sort) return;
  // Update only the table and the count, never the whole page: re-rendering
  // here would throw the search box out of focus on every keystroke.
  const apply = () => {
    regionFilter.query = search.value.trim().toLowerCase();
    regionFilter.zone = zone.value;
    regionFilter.sort = sort.value;
    const list = STATES.filter((s) => !regionFilter.zone || s.zone === regionFilter.zone)
      .filter((s) => !regionFilter.query || s.name.toLowerCase().includes(regionFilter.query) || s.capital.toLowerCase().includes(regionFilter.query))
      .sort((a, b) => (regionFilter.sort === 'name' ? a.name.localeCompare(b.name) : b.pop - a.pop));
    const total = list.reduce((sum, s) => sum + s.pop, 0);
    const count = document.getElementById('result-count');
    if (count) count.textContent = `${list.length} of 37 areas shown · ${total.toFixed(1)} million people`;
    const body = document.querySelector('#states-table tbody');
    if (body) {
      body.innerHTML = list.map((s) => `<tr>
        <td><a href="#/regions/${encodeURIComponent(s.name.toLowerCase().replace(/ /g, '-'))}">${s.name}</a></td>
        <td>${s.capital}</td><td>${s.zone}</td>
        <td>${s.pop.toFixed(1)} million</td><td>${((s.pop / 232.7) * 100).toFixed(1)}%</td>
      </tr>`).join('') || '<tr><td colspan="5">No state matches that search.</td></tr>';
    }
  };
  search.addEventListener('input', apply);
  zone.addEventListener('change', apply);
  sort.addEventListener('change', apply);
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') event.preventDefault();
  });
  if (csv) {
    csv.addEventListener('click', () => {
      const rows = [['State', 'Capital', 'Zone', 'Population (millions, NPC 2022 projection)']];
      STATES.slice().sort((a, b) => b.pop - a.pop).forEach((s) => rows.push([s.name, s.capital, s.zone, String(s.pop)]));
      const text = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      const blob = new Blob([text], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nigeria-states-population.csv';
      link.click();
      URL.revokeObjectURL(url);
    });
  }
}

function wireSources() {
  const print = document.getElementById('print-page');
  if (print) print.addEventListener('click', () => window.print());
}

function setActiveNav(route) {
  navLinks.forEach((link) => {
    const target = link.getAttribute('data-nav');
    const active = route === target || (target === 'regions' && route === 'regions') || (target === 'population' && route === 'population');
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function render(scroll = true) {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
  const [section, detail] = parts;
  let route = section || 'overview';
  let html;
  if (route === 'overview' || route === '') html = overview();
  else if (route === 'population') html = populationPage(detail === 'growth' ? 'growth' : 'total');
  else if (route === 'economy') html = economyPage();
  else if (route === 'health') html = healthPage();
  else if (route === 'education') html = educationPage();
  else if (route === 'regions' && detail) {
    const slug = decodeURIComponent(detail);
    const found = STATES.find((s) => s.name.toLowerCase().replace(/ /g, '-') === slug);
    html = found ? statePage(found) : missing();
  } else if (route === 'regions') html = regionsPage(regionFilter);
  else if (route === 'sources') html = sourcesPage();
  else { route = 'missing'; html = missing(); }
  app.innerHTML = html;
  setActiveNav(route);
  const titles = {
    overview: 'Nigeria in Numbers', population: 'Population', economy: 'Economy',
    health: 'Health', education: 'Education', regions: 'States & Regions',
    sources: 'Sources & Methods', missing: 'Page not found',
  };
  document.title = `${titles[route] || 'Nigeria in Numbers'} | NaijaStats — Nigeria in Numbers`;
  drawCharts(route);
  if (route === 'regions' && !detail) wireRegions();
  if (route === 'sources') wireSources();
  if (scroll) window.scrollTo(0, 0);
  // Charts read their canvas size from layout, so draw once more after the
  // browser has laid the page out.
  requestAnimationFrame(() => {
    drawCharts(route);
    window.__shotReady = true;
  });
}

window.addEventListener('hashchange', () => render());
window.addEventListener('resize', () => drawCharts(
  (location.hash || '#/').replace(/^#\//, '').split('/').filter(Boolean)[0] || 'overview',
));
render();
