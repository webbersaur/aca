# ACA Landscaping, LLC — acalandscapingct.com

Static rebuild of the old Webbersaur.us site, self-contained and deployed on Vercel.
Plain HTML/CSS/JS — no framework or bundler. Design system reused from `pavement-protectors`
(sister brand), recolored to a landscaping green palette.

## Structure
- `index.html` + flat service/content pages (`construction.html`, `maintenance.html`, …)
- `css/styles.css` — single stylesheet (green palette in `:root`)
- `js/main.js` — nav, hero slideshow, scroll-reveal, gallery filter, lightbox, contact form
- `api/contact.js` — Vercel serverless function; emails leads via Resend
- `images/` — all photos (downloaded off the old S3 bucket, SEO-renamed, `.jpg` + `.webp`)
- `scripts/build_site.mjs` — generator that writes all HTML pages (shared head/header/footer
  + per-page content). **Edit content here and re-run, don't hand-edit the HTML.**
- `vercel.json` — `trailingSlash:false`, 308 redirects from legacy `/page/<id>-Name` URLs,
  cache + security headers
- `_crawl/`, `images-raw/` — local working copies of the scrape; excluded from deploy

## Build
```
node scripts/build_site.mjs
```

## Local preview
```
python3 -m http.server 8099   # then open http://localhost:8099
# or: vercel dev  (also exercises vercel.json redirects + the contact API)
```

## Deploy
Push/deploy to Vercel. Set these env vars for the contact form to deliver email:
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (e.g. ACALandscapingCT@gmail.com)
- `CONTACT_FROM_EMAIL` (verified sender, e.g. `ACA Landscaping <noreply@acalandscapingct.com>`)

## DNS cutover (go-live)
Point the apex `A` record for `acalandscapingct.com` → `76.76.21.21` and `www` →
`cname.vercel-dns.com`. Old Webbersaur site stays live until DNS flips. The legacy
`/page/<id>-Name` URLs 308-redirect to the new pages, preserving SEO equity.
