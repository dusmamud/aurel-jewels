# Aurel Jewels — Fine Jewelry Website (frontend only)

Fine jewelry e-commerce website for Aurel Jewels, built to the reference
homepage design. **Frontend only, mock data** — real data replaces
`src/lib/data/site.ts` after the client approves the design.

- Stack: Svelte 5 (runes) + SvelteKit 3 + Vite 8 + Tailwind CSS 4 + TypeScript,
  `@sveltejs/adapter-static`, fully prerendered static output in `build/`.
- Brand: deep emerald `#0b3d2e`, cream `#fdfbf6`, gold `#c19a3d`;
  Playfair Display + Inter (self-hosted via `@fontsource`).
- Currency: USD ($). US store (SoHo, New York). No real orders or payments.
- Images: PNG masters in `static/images/original/`, converted with
  `npm run images` (sharp) to AVIF → WebP → JPG @ 480/800/1200/1600.
  Every image renders through `#lib/components/Picture.svelte`.
- Cart: real mock cart (`src/lib/cart.svelte.ts`) — qty, free shipping over
  $50, slide-in CartDrawer. Wishlist in `src/lib/wishlist.svelte.ts`.
- Mock checkout: cart → shipping/payment → confirmation with order ref + ETA.
- SEO: JewelryStore + Product JSON-LD (no self-rated aggregateRating),
  sitemap.xml + robots.txt as `+server.ts` endpoints.

## Scripts

```bash
npm install
npm run images   # convert PNG masters to AVIF/WebP/JPG
npm run check    # svelte-check, must be 0 errors
npm run build    # vite build → build/
npm run preview  # serve the static build
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`): push to `main` → `npm ci` →
build → wrangler deploys `build/` to Cloudflare Pages project `aurel-jewels`
(live at https://aurel-jewels.pages.dev). Requires repo secrets
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.

## Pages

Home, Shop (+ filters/sort/search), product detail `/shop/[slug]`,
Collections + `/collections/[slug]`, About, Blog + `/blog/[slug]`, Contact,
Cart, Checkout (mock 3-step), Gift Cards, FAQ, Shipping, Returns, Size Guide,
Care, Track Order, Wishlist, Privacy, Terms, 404.
