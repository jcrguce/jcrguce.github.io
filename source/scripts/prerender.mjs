// After `vite build`: give every route its own HTML file so GitHub Pages serves
// real URLs (and refreshes) without server rewrites, then write sitemap.xml and 404.html.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const SITE = 'https://jcrguce.github.io';
const dist = new URL('../dist/', import.meta.url);
const data = JSON.parse(readFileSync(new URL('data/portfolio.json', dist), 'utf8'));
const html = readFileSync(new URL('index.html', dist), 'utf8');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const projects = data.projects.filter(p => p.published !== false);
const urls = [SITE + '/'];
for (const p of projects) {
  const url = `${SITE}/projects/${p.id}/`;
  urls.push(url);
  const page = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title + ' · ' + data.name)}</title>`)
    .replace(`<link rel="canonical" href="${SITE}/"/>`, `<link rel="canonical" href="${url}"/>`)
    .replace(`<meta property="og:url" content="${SITE}/"/>`, `<meta property="og:url" content="${url}"/>`);
  mkdirSync(new URL(`projects/${p.id}/`, dist), { recursive: true });
  writeFileSync(new URL(`projects/${p.id}/index.html`, dist), page);
}
// Unknown URLs: GitHub Pages serves 404.html; the app shows its own "Page not found" view.
writeFileSync(new URL('404.html', dist), html.replace('<head>', '<head><meta name="robots" content="noindex"/>'));
const today = new Date().toISOString().slice(0, 10);
writeFileSync(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`Prerendered ${projects.length} project pages, 404.html and sitemap.xml`);
