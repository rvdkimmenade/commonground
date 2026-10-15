// Haalt RSS-feeds op en schrijft docs/news.json (gebruikt door de GitHub Action).
import { writeFileSync } from 'node:fs';

const SOURCES = [
  { name: 'Digitale Overheid', url: 'https://www.digitaleoverheid.nl/feed/', all: true },
  { name: 'Computable', url: 'https://www.computable.nl/feed/', all: false },
];
const STRONG = /gemeente|gemeentelijk|VNG|Common Ground|GEMMA|ZGW|Haal Centraal|Dimpact|Logius|FSC|bronontsluiting|datadelen|dienstverlening|Archiefwet|Woo\b|open source/i;
const WEAK = /overheid|kabinet|BZK|rijks|provincie|waterschap|UWV|digitale|soeverein|cloud|AI|beveilig|cyber/i;

const strip = s => s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ')
  .replace(/&#8217;|&#8216;/g, "'").replace(/&#8220;|&#8221;/g, '"').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, '').replace(/\s+/g, ' ')
  .replace(/(The post|Het bericht) .*$/, '').trim();
const tag = (it, k) => (it.match(new RegExp(`<${k}>([\\s\\S]*?)</${k}>`)) || [, ''])[1];

function parse(xml, src) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => ({
    source: src.name,
    title: strip(tag(it, 'title')),
    link: strip(tag(it, 'link')),
    date: new Date(strip(tag(it, 'pubDate'))).toISOString(),
    desc: strip(tag(it, 'description')),
    cats: [...it.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(m => strip(m[1])),
  })).filter(i => src.all || i.cats.includes('Overheid') || STRONG.test(i.title + ' ' + i.desc) || WEAK.test(i.title + ' ' + i.desc));
}

const items = [];
for (const s of SOURCES) {
  try {
    const r = await fetch(s.url, { headers: { 'User-Agent': 'gemeentelijk-it-kompas' } });
    items.push(...parse(await r.text(), s));
  } catch (e) { console.error(s.name, e.message); }
}
if (!items.length) { console.error('Geen items; news.json ongewijzigd'); process.exit(0); }
writeFileSync('docs/news.json', JSON.stringify({ updated: new Date().toISOString(), items }, null, 1));
console.log(`${items.length} items geschreven`);
