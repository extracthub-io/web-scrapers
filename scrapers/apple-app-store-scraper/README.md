# Apple App Store Scraper (app page)

Turn an App Store app page (apps.apple.com) into JSON: app id, bundle id, name, subtitle, developer, category,
rating, exact rating count, price, latest version with release notes, size, age rating, compatibility,
description, icon and screenshots. Good for app store optimization (ASO), competitor tracking and app market
research. Pairs with the [Google Play App Scraper](../google-play-app-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/apple-app-store-app](https://extracthub.io/extractor/@extracthub1/apple-app-store-app)
**Extractor id:** `@extracthub1/apple-app-store-app@1` · **Price:** $0.0025 per app

## Input

An App Store app page:

```
https://apps.apple.com/<country>/app/<name>/id<number>
```

e.g. `https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580`. The country code (`us`, `gb`,
`id`, ...) picks the store: it sets the price, currency, rating count and language.

## Output

| Field | Type | Description |
|---|---|---|
| `appId` | string \| null | App Store id, e.g. `324684580` |
| `bundleId` | string \| null | bundle id, e.g. `com.spotify.client` |
| `name` | string | app name |
| `subtitle` | string \| null | the short line under the name |
| `developer` | string \| null | developer name |
| `developerUrl` | string \| null | the developer's App Store page |
| `category` | string \| null | main category, e.g. `Music` |
| `genres` | string[] | all categories |
| `rating` | number \| null | average rating (1 to 5) in this country's store |
| `ratingCount` | number \| null | exact number of ratings in this country's store |
| `price` | number \| null | price; `0` for free apps |
| `currency` | string \| null | e.g. `USD`, `GBP` |
| `priceLabel` | string \| null | price as shown, e.g. `Free · In‑App Purchases`, `$6.99` |
| `isEditorsChoice` | boolean \| null | Editors' Choice badge |
| `version` | string \| null | latest version, e.g. `9.1.94` |
| `versionDate` | string \| null | release date of that version, e.g. `2026-10-23` |
| `releaseNotes` | string \| null | "What's New" text of that version |
| `size` | string \| null | download size as shown, e.g. `325.1 MB` |
| `ageRating` | string \| null | e.g. `4+`, `13+` |
| `information[]` | array | the Information section as `{ label, value }`, e.g. Seller, Size, Category, Compatibility, Languages, Age Rating, In-App Purchases, Copyright |
| `compatibility` | string \| null | OS requirement, e.g. `Requires iOS 16.1 or later. ...` |
| `devices` | string[] | e.g. `iPhone`, `iPad`, `Apple Watch` |
| `description` | string \| null | the full description, with line breaks |
| `icon` | string \| null | URL of the app icon |
| `screenshots` | string[] | iPhone screenshots, then iPad ones (iPad-only apps: iPad screenshots) |

Full example: [sample-output.json](sample-output.json) (Spotify; screenshots shortened to 3).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/apple-app-store-app@1" \
  --data-urlencode "target_url=https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/apple-app-store-app@1` on the App Store pages of Duolingo, Babbel and Busuu and compare
> rating, rating count, price, size and last update in a table.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Not included:** user reviews and version history (Apple loads them separately).
- **Screenshot size:** the URLs are 300 px wide. Apple serves other sizes from the same URL: replace
  `300x650bb` with e.g. `600x1300bb`.
- **App not in that country's store:** the page answers HTTP 404 and the call fails with `target_error` (charged,
  as the page was fetched).

## Versions

- **1.0.1:** fetches through the scraping proxy for more reliable results. Output unchanged.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; JSON-LD, embedded page JSON + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real app page
