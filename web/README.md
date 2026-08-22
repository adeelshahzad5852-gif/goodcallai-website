# GoodcallAI — website

Plain HTML and CSS. No framework, no build step, no install.

Open `index.html` in a browser and it works. That is the whole thing.

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole site — one page |
| `privacy.html`, `terms.html` | Kept separate, linked in the footer |
| `assets/styles.css` | All styling. Colours are the tokens at the top. |
| `assets/fonts/` | Archivo + Public Sans, self-hosted |
| `assets/img/` | Photos, WebP, already compressed |
| `assets/audio/` | Empty. The three call recordings go here. |
| `robots.txt`, `sitemap.xml` | For Google |

## Turning the recordings section on

1. Put three `.mp3` files in `assets/audio/`:
   `no-cooling.mp3`, `burst-pipe.mp3`, `estimate.mp3`
2. Put a matching `.vtt` transcript beside each one.
3. In `index.html`, find the block marked `Recordings` and delete the two
   lines that say `CUT BELOW` and `CUT ABOVE`, plus the comment markers
   around them.

It is commented out rather than hidden because a hidden `<track>` is still
fetched by the browser, which 404s on every page load.

## Changing the colours

Every colour is a token at the top of `assets/styles.css`. Change it there
once and it changes everywhere.

- `--rust` `#D9531E` — orange on light backgrounds
- `--ember` `#FF6A28` — orange on dark backgrounds
- `--ink` `#141210` — near-black
- `--paper` `#FAF7F3` — off-white

Two oranges on purpose: a single one either goes muddy on white or glares
on black.

## Images

Compressed to WebP at 1400px wide. Originals were 1.8 MB each — 11.7 MB for
the set, which is unusable on mobile data. They are 338 KB now.

If you add a photo, resize it to about 1400px wide and save as WebP first.

## Hosting

Static files. Point any host at this folder.

On Vercel: New Project, pick this repo, set **Root Directory** to `web`,
framework preset **Other**. No build command, no output directory.
