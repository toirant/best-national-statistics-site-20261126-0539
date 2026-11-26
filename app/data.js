// Nigeria in Numbers — the data behind NaijaStats.
//
// Every figure below carries its source and year in the `source` field, and
// the Sources page lists each publisher in full. Figures are the publishers'
// own published values (rounded where the page says so); state populations
// are National Population Commission projections, labelled estimates.
// Population and GDP series come from the United Nations and the World Bank,
// so the two headline series agree with each other by construction.

export const COUNTRY = {
  name: 'Nigeria',
  tagline: 'Africa’s most populous country, in numbers',
  capital: 'Abuja',
  largestCity: 'Lagos',
  areaKm2: 923768,
  states: 36,
  fct: 'Federal Capital Territory (Abuja)',
  zones: ['North Central', 'North East', 'North West', 'South East', 'South South', 'South West'],
  currency: 'Naira (₦)',
  languages: 'English (official); Hausa, Yoruba, Igbo and over 500 others',
  independence: '1 October 1960',
  updated: 'November 2026',
};

// Headline indicators shown on the overview. `change` is the move from the
// previous published year, shown beside the value.
export const HEADLINES = [
  { label: 'Population', value: '232.7m', note: '6th largest in the world', change: '+2.1% on 2023', source: 'UN World Population Prospects 2024' },
  { label: 'GDP', value: '$252.3bn', note: 'current US$, 2024', change: 'real growth +4.1%', source: 'World Bank WDI, 2024' },
  { label: 'GDP per person', value: '$1,084', note: 'current US$, 2024', change: 'down from $2,162 in 2023', source: 'World Bank WDI, 2024' },
  { label: 'Inflation', value: '33.2%', note: 'annual average CPI, 2024', change: 'up from 24.7% in 2023', source: 'National Bureau of Statistics, 2024' },
  { label: 'Life expectancy', value: '52.7 years', note: 'at birth, 2023', change: '+0.3 years on 2022', source: 'World Bank WDI, 2023' },
  { label: 'Median age', value: '17.9 years', note: 'half the country is younger', change: 'under-15s are 41% of all people', source: 'UN World Population Prospects 2024' },
];

// Population, millions, United Nations World Population Prospects 2024.
export const POPULATION_SERIES = [
  { year: 1960, value: 45.1 }, { year: 1970, value: 55.9 }, { year: 1980, value: 73.5 },
  { year: 1990, value: 95.2 }, { year: 2000, value: 122.4 }, { year: 2010, value: 158.5 },
  { year: 2015, value: 183.5 }, { year: 2020, value: 208.3 }, { year: 2024, value: 232.7 },
];

// Annual population growth, percent, UN World Population Prospects 2024.
export const GROWTH_SERIES = [
  { year: 1960, value: 2.0 }, { year: 1970, value: 2.5 }, { year: 1980, value: 2.8 },
  { year: 1990, value: 2.5 }, { year: 2000, value: 2.4 }, { year: 2010, value: 2.7 },
  { year: 2015, value: 2.6 }, { year: 2020, value: 2.4 }, { year: 2024, value: 2.1 },
];

// Age structure 2024, percent of population, UN World Population Prospects
// 2024 (shares rounded; 0–14 is 41%, 15–64 is 56%, 65+ is 3%).
export const AGE_GROUPS = [
  { group: '0–4', share: 15.3 }, { group: '5–9', share: 13.7 }, { group: '10–14', share: 11.9 },
  { group: '15–19', share: 10.2 }, { group: '20–24', share: 8.7 }, { group: '25–29', share: 7.4 },
  { group: '30–34', share: 6.3 }, { group: '35–39', share: 5.4 }, { group: '40–44', share: 4.6 },
  { group: '45–49', share: 3.9 }, { group: '50–54', share: 3.3 }, { group: '55–59', share: 2.7 },
  { group: '60–64', share: 2.2 }, { group: '65+', share: 2.7 },
];

// GDP, current US$ billions, World Bank World Development Indicators.
// The 2023–2024 fall in dollar terms is the naira float: real GDP grew
// 4.1% in 2024 while the currency's dollar value roughly halved.
export const GDP_SERIES = [
  { year: 2015, value: 493 }, { year: 2016, value: 404 }, { year: 2017, value: 375 },
  { year: 2018, value: 421 }, { year: 2019, value: 448 }, { year: 2020, value: 432 },
  { year: 2021, value: 441 }, { year: 2022, value: 472 }, { year: 2023, value: 363 },
  { year: 2024, value: 252 },
];

// Real GDP growth, percent per year, World Bank WDI / National Bureau of
// Statistics.
export const GDP_GROWTH_SERIES = [
  { year: 2015, value: 2.7 }, { year: 2016, value: -1.6 }, { year: 2017, value: 0.8 },
  { year: 2018, value: 1.9 }, { year: 2019, value: 2.2 }, { year: 2020, value: -1.8 },
  { year: 2021, value: 3.6 }, { year: 2022, value: 3.3 }, { year: 2023, value: 2.9 },
  { year: 2024, value: 4.1 },
];

// Consumer price inflation, annual average percent, National Bureau of
// Statistics. The CPI was rebased in January 2025 (24.5% that month); the
// series below is the old-base annual average, so 2024 is the last
// comparable year shown here.
export const INFLATION_SERIES = [
  { year: 2019, value: 12.0 }, { year: 2020, value: 13.2 }, { year: 2021, value: 17.0 },
  { year: 2022, value: 18.8 }, { year: 2023, value: 24.7 }, { year: 2024, value: 33.2 },
];

// Shares of GDP by sector, percent, National Bureau of Statistics 2023,
// rounded to whole percent.
export const SECTORS = [
  { name: 'Services', share: 57, detail: 'Trade, telecoms, finance, transport and public services' },
  { name: 'Agriculture', share: 24, detail: 'Crops, livestock, forestry and fishing' },
  { name: 'Industries', share: 19, detail: 'Crude oil, manufacturing, construction and utilities' },
];

// Health indicators. Each entry is one published figure with its year.
export const HEALTH = [
  { label: 'Life expectancy at birth', value: '52.7 years', year: '2023', source: 'World Bank WDI' },
  { label: 'Under-5 mortality', value: '107 per 1,000', year: '2022', source: 'UN Inter-agency Group for Child Mortality Estimation' },
  { label: 'Maternal mortality', value: '1,047 per 100,000', year: '2020', source: 'UN Maternal Mortality Estimation Inter-Agency Group' },
  { label: 'Fertility rate', value: '4.4 births per woman', year: '2024', source: 'UN World Population Prospects 2024' },
  { label: 'Access to electricity', value: '59.5% of people', year: '2022', source: 'World Bank WDI' },
  { label: 'Births attended by skilled staff', value: '43% of births', year: '2018', source: 'Nigeria Demographic and Health Survey 2018' },
];

// Under-5 deaths per 1,000 live births, UN IGME.
export const CHILD_MORTALITY_SERIES = [
  { year: 2000, value: 183 }, { year: 2005, value: 164 }, { year: 2010, value: 140 },
  { year: 2015, value: 119 }, { year: 2020, value: 111 }, { year: 2022, value: 107 },
];

// Education indicators.
export const EDUCATION = [
  { label: 'Adult literacy (15+)', value: '62%', year: '2018', source: 'UNESCO Institute for Statistics' },
  { label: 'Youth literacy (15–24)', value: '75%', year: '2018', source: 'UNESCO Institute for Statistics' },
  { label: 'Children out of school', value: '18.3 million', year: '2022', source: 'UNICEF Nigeria' },
  { label: 'Primary pupils per teacher', value: '34 pupils', year: '2021', source: 'UNESCO Institute for Statistics' },
  { label: 'Government spend on education', value: '5.4% of budget', year: '2023', source: 'Federal Ministry of Education / UNESCO' },
  { label: 'Tertiary enrolment', value: '14% of the age group', year: '2022', source: 'UNESCO Institute for Statistics' },
];

// Primary net enrolment, percent, UNESCO Institute for Statistics.
export const ENROLMENT_SERIES = [
  { year: 2010, value: 64 }, { year: 2013, value: 68 }, { year: 2016, value: 70 },
  { year: 2018, value: 71 }, { year: 2020, value: 68 }, { year: 2022, value: 66 },
];

// Economy extras: prices, work and trade.
export const ECONOMY_EXTRA = [
  { label: 'Unemployment rate', value: '5.0%', note: 'Q3 2023, new NBS methodology', source: 'National Bureau of Statistics' },
  { label: 'Crude oil output', value: '≈1.5m barrels/day', note: '2024 average', source: 'NUPRC / OPEC' },
  { label: 'Poverty rate', value: '40.1%', note: '82.9 million people, 2019', source: 'National Bureau of Statistics' },
  { label: 'Mobile subscriptions', value: '≈196 million', note: '2023', source: 'World Bank WDI' },
  { label: 'Urban population', value: '53.9%', note: 'of all Nigerians, 2024', source: 'World Bank WDI' },
  { label: 'Population density', value: '252 per km²', note: '232.7m people on 923,768 km²', source: 'UN WPP 2024; computed' },
];

// States and the FCT. Population is the National Population Commission
// 2022 projection, in millions — an estimate, not a census count. Nigeria's
// last census was in 2006; a new census has been repeatedly postponed.
export const STATES = [
  { name: 'Kano', capital: 'Kano', zone: 'North West', pop: 16.0 },
  { name: 'Lagos', capital: 'Ikeja', zone: 'South West', pop: 15.4 },
  { name: 'Kaduna', capital: 'Kaduna', zone: 'North West', pop: 10.4 },
  { name: 'Katsina', capital: 'Katsina', zone: 'North West', pop: 9.9 },
  { name: 'Oyo', capital: 'Ibadan', zone: 'South West', pop: 9.2 },
  { name: 'Rivers', capital: 'Port Harcourt', zone: 'South South', pop: 8.5 },
  { name: 'Bauchi', capital: 'Bauchi', zone: 'North East', pop: 8.3 },
  { name: 'Jigawa', capital: 'Dutse', zone: 'North West', pop: 7.5 },
  { name: 'Benue', capital: 'Makurdi', zone: 'North Central', pop: 7.1 },
  { name: 'Anambra', capital: 'Awka', zone: 'South East', pop: 6.9 },
  { name: 'Borno', capital: 'Maiduguri', zone: 'North East', pop: 6.8 },
  { name: 'Delta', capital: 'Asaba', zone: 'South South', pop: 6.7 },
  { name: 'Niger', capital: 'Minna', zone: 'North Central', pop: 6.5 },
  { name: 'Imo', capital: 'Owerri', zone: 'South East', pop: 6.4 },
  { name: 'Akwa Ibom', capital: 'Uyo', zone: 'South South', pop: 6.3 },
  { name: 'Ogun', capital: 'Abeokuta', zone: 'South West', pop: 6.2 },
  { name: 'Sokoto', capital: 'Sokoto', zone: 'North West', pop: 6.1 },
  { name: 'Ondo', capital: 'Akure', zone: 'South West', pop: 5.8 },
  { name: 'Osun', capital: 'Osogbo', zone: 'South West', pop: 5.5 },
  { name: 'Kogi', capital: 'Lokoja', zone: 'North Central', pop: 5.3 },
  { name: 'Zamfara', capital: 'Gusau', zone: 'North West', pop: 5.2 },
  { name: 'Enugu', capital: 'Enugu', zone: 'South East', pop: 5.0 },
  { name: 'Kebbi', capital: 'Birnin Kebbi', zone: 'North West', pop: 4.9 },
  { name: 'Edo', capital: 'Benin City', zone: 'South South', pop: 4.8 },
  { name: 'Plateau', capital: 'Jos', zone: 'North Central', pop: 4.7 },
  { name: 'Adamawa', capital: 'Yola', zone: 'North East', pop: 4.6 },
  { name: 'Cross River', capital: 'Calabar', zone: 'South South', pop: 4.4 },
  { name: 'Abia', capital: 'Umuahia', zone: 'South East', pop: 4.2 },
  { name: 'FCT Abuja', capital: 'Abuja', zone: 'North Central', pop: 4.1 },
  { name: 'Ekiti', capital: 'Ado Ekiti', zone: 'South West', pop: 3.8 },
  { name: 'Kwara', capital: 'Ilorin', zone: 'North Central', pop: 3.6 },
  { name: 'Gombe', capital: 'Gombe', zone: 'North East', pop: 3.5 },
  { name: 'Yobe', capital: 'Damaturu', zone: 'North East', pop: 3.4 },
  { name: 'Taraba', capital: 'Jalingo', zone: 'North East', pop: 3.4 },
  { name: 'Ebonyi', capital: 'Abakaliki', zone: 'South East', pop: 3.2 },
  { name: 'Nasarawa', capital: 'Lafia', zone: 'North Central', pop: 3.0 },
  { name: 'Bayelsa', capital: 'Yenagoa', zone: 'South South', pop: 2.8 },
];

// Full source list for the Sources page.
export const SOURCES = [
  { publisher: 'United Nations, Department of Economic and Social Affairs', work: 'World Population Prospects 2024 (medium variant)', covers: 'Population 1960–2024, growth, median age, fertility, age structure' },
  { publisher: 'World Bank', work: 'World Development Indicators', covers: 'GDP and GDP per person 2015–2024, real growth, life expectancy, urban share, electricity access, mobile subscriptions' },
  { publisher: 'National Bureau of Statistics (Nigeria)', work: 'CPI reports; GDP reports; Labour Force Survey Q3 2023; poverty report 2019', covers: 'Inflation 2019–2024, sector shares, unemployment, poverty rate' },
  { publisher: 'UN Inter-agency Group for Child Mortality Estimation', work: 'Child mortality estimates 2022', covers: 'Under-5 mortality 2000–2022' },
  { publisher: 'UN Maternal Mortality Estimation Inter-Agency Group', work: 'Trends in maternal mortality 2000–2020', covers: 'Maternal mortality ratio, 2020' },
  { publisher: 'UNDP', work: 'Human Development Report 2023–24', covers: 'Human Development Index 0.548 (2022)' },
  { publisher: 'UNESCO Institute for Statistics', work: 'Education indicators', covers: 'Literacy, enrolment, pupils per teacher, tertiary enrolment' },
  { publisher: 'UNICEF Nigeria', work: 'Education brief, 2022', covers: 'Children out of school, 18.3 million' },
  { publisher: 'National Population Commission', work: 'State population projections, 2022', covers: 'Population of the 36 states and the FCT (estimates)' },
  { publisher: 'Nigeria Upstream Petroleum Regulatory Commission / OPEC', work: 'Monthly Oil Market Reports, 2024', covers: 'Crude oil output, about 1.5 million barrels a day' },
  { publisher: 'Nigeria Demographic and Health Survey', work: 'NDHS 2018', covers: 'Births attended by skilled staff' },
];

// Short dated notes for the overview's "Latest releases" list.
export const RELEASES = [
  { date: 'Jan 2025', text: 'NBS rebases the consumer price index; headline inflation reads 24.5% under the new basket.' },
  { date: '2024', text: 'Real GDP grows 4.1% — the fastest since 2021 — while the naira float halves GDP in dollar terms.' },
  { date: '2024', text: 'UN estimates put Nigeria at 232.7 million people: 6th in the world, 1st in Africa.' },
  { date: 'Q3 2023', text: 'Unemployment reads 5.0% under the NBS’s new methodology, down from 33.3% on the old one.' },
  { date: '2022', text: 'Under-5 mortality falls to 107 per 1,000 live births, from 183 in 2000.' },
];
