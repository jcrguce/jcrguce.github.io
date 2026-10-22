# Jullien Guce · Portfolio (GitHub Pages)

Live at **https://jcrguce.github.io/**. This repository *is* the website: GitHub Pages serves the files at the repository root as they are. There is no server, database or editor.

## Folder layout

| Path | What it is |
| --- | --- |
| `index.html`, `assets/`, `fonts/` | The built website (React app compiled by Vite). |
| `data/portfolio.json` | **All site content**: profile, bio, experience, projects, image paths, video links. |
| `work/` | Project covers, gallery artwork and portrait. |
| `portfolio.pdf` | The downloadable portfolio PDF. |
| `projects/<id>/index.html` | One page per project so direct links and refreshes work. |
| `404.html` | Shown by GitHub Pages for unknown URLs (the app shows "Page not found"). |
| `sitemap.xml`, `robots.txt`, `.nojekyll`, `share-preview.png` | Search engine and link preview files. |
| `source/` | Editable source code. Edit here, then rebuild (see below). |

## GitHub Pages settings (one time)

Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.

## Changing text, images or links

**Quick text edit, no tools needed:** edit `data/portfolio.json` directly on GitHub (pencil icon) and commit. The site reads this file when it loads, so text, link, order and image changes show up after GitHub Pages redeploys, usually within a minute. Also make the same change in `source/public/data/portfolio.json` so the next rebuild keeps it.

**Adding or removing a project, or changing code or design:** rebuild so the per-project pages and sitemap are regenerated.

```bash
cd source
npm ci                 # first time only (needs Node.js 20.19+ or 22.12+)
# edit public/data/portfolio.json, add images to public/work/, change code in app/
npm run publish-root   # builds to source/dist and copies it to the repo root
cd ..
git add -A && git commit -m "Update portfolio" && git push
```

`npm run dev` starts a local preview at http://127.0.0.1:5173/.

Content notes:
- Images: put files in `source/public/work/` and reference them as `/work/<file>`. Use WebP or JPG, about 2000 to 2400 px wide. Keep every file under 50 MB (GitHub warns at 50 MB and blocks files over 100 MB).
- Videos: use YouTube or Vimeo links with `"type": "embed"` to play inline. Other links (for example Facebook) use `"type": "link"` and open in a new tab. An optional `"thumbnail"` sets the preview image.
- A project with `"published": false` is hidden.
- `theme` can be `light`, `dark` or `system`. `accent` is a hex colour.
- To replace the PDF, overwrite `source/public/portfolio.pdf` (and `portfolio.pdf` at the root), keeping the same name.

## Where this came from

This is a static conversion of the Cloudflare Workers version (`jullien-portfolio.jcrguce.workers.dev`). That version kept content in a Cloudflare D1 database behind a password-protected `/edit` page and served it from `/api/public`. Here the content is a plain JSON file and the editor, login, upload API and Cloudflare setup scripts are removed. No passwords or keys are in this repository.
