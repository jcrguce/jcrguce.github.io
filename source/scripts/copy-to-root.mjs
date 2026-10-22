// Replace the published site at the repository root with the fresh build in source/dist.
import { rmSync, cpSync, readdirSync, existsSync } from 'node:fs';
const root = new URL('../../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const generated = ['assets', 'data', 'fonts', 'projects', 'work', 'index.html', '404.html', 'sitemap.xml', 'robots.txt', 'favicon.svg', 'share-preview.png', 'portfolio.pdf', '.nojekyll'];
for (const name of generated) if (existsSync(new URL(name, root))) rmSync(new URL(name, root), { recursive: true, force: true });
for (const name of readdirSync(dist)) cpSync(new URL(name, dist), new URL(name, root), { recursive: true });
console.log('Copied source/dist to the repository root.');
