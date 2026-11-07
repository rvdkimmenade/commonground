// Haalt RSS-feeds op en schrijft docs/news.json (gebruikt door de GitHub Action).
// Bronnenlijst en filterregels staan ook in docs/index.html; houd ze gelijk.
import { writeFileSync } from 'node:fs';

// it: bron gaat volledig over digitale overheid. need: categorie die het item moet hebben.
const SOURCES = [
  { name: 'iBestuur', url: 'https://ibestuur.nl/feeds/articles.rss', it: true },
  { name: 'Digitale Overheid', url: 'https://www.digitaleoverheid.nl/feed/', it: true },
  { name: 'Binnenlands Bestuur', url: 'https://www.binnenlandsbestuur.nl/feeds/articles.rss', it: true, need: 'digitaal' },
  { name: 'Gemeente.nu', url: 'https://www.gemeente.nu/feed/' },
  { name: 'Computable', url: 'https://www.computable.nl/feed/', need: 'overheid' },
  { name: 'AG Connect', url: 'https://agconnect.nl/feeds/articles.rss', need: 'overheid' },
  { name: 'NCSC', url: 'https://feeds.ncsc.nl/nieuws.rss' },
];
const IT = /digita|\bICT\b|\bIT\b|software|\bdata|\bAPI|cloud|\bAI\b|kunstmatige intelligentie|algoritm|cyber|beveilig|informatie|Common Ground|GEMMA|ZGW|Haal Centraal|Logius|\bFSC\b|DigiD|open ?source|soeverein|applicatie|systeem|archief|\bWoo\b/i;
const GEM = /gemeente|gemeentelijk|\bVNG\b|Dimpact|wethouder|gemeenteraad|lokale overhe|Common Ground|GEMMA|\bZGW\b|G4\b|Amsterdam|Rotterdam|Den Haag|Utrecht/i;
const GOV = /overheid|kabinet|ministerie|\bBZK\b|rijks|provincie|waterschap|uitvoeringsorganisatie|Logius|ICTU|Tweede Kamer/i;

const strip = s => s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ')
  .replace(/&#8217;|&#8216;/g, "'").replace(/&#8220;|&#8221;/g, '"').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#\d+;/g, '').replace(/\s+/g, ' ')
  .replace(/(The post|Het bericht) .*$/, '').trim();
const tag = (it, k) => (it.match(new RegExp('<' + k + '>([\\s\\S]*?)</' + k + '>')) || [, ''])[1];
const cats = it => [...it.matchAll(/<category(?:_theme|_topic)?>([\s\S]*?)<\/category(?:_theme|_topic)?>/g)].map(m => strip(m[1]));

function parse(xml, src) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => ({
    source: src.name,
    title: strip(tag(it, 'title')),
    link: strip(tag(it, 'link')),
    date: new Date(strip(tag(it, 'pubDate'))).toISOString(),
    desc: strip(tag(it, 'description')).slice(0, 400),
    cats: cats(it),
  })).filter(i => !src.need || i.cats.some(c => c.toLowerCase() === src.need));
}

const items = [];
for (const s of SOURCES) {
  try {
    const r = await fetch(s.url, { headers: { 'User-Agent': 'gemeentelijk-it-kompas' } });
    const found = parse(await r.text(), s);
    items.push(...found);
    console.log(s.name, found.length);
  } catch (e) { console.error(s.name, e.message); }
}
if (!items.length) { console.error('Geen items; news.json ongewijzigd'); process.exit(0); }
writeFileSync('docs/news.json', JSON.stringify({ updated: new Date().toISOString(), sources: SOURCES.map(s => s.name), items }, null, 1));
console.log(items.length + ' items geschreven');
