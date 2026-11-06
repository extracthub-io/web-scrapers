# Google Play App Scraper (app page)

Turn a Google Play app page into JSON: app id, name, developer, category, rating, exact rating count,
downloads, content rating, price, ads / in-app purchase notices, last update date, description, icon and
screenshots. Good for app store optimization (ASO), competitor tracking and app market research.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-play-app](https://extracthub.io/extractor/@extracthub1/google-play-app)
**Extractor id:** `@extracthub1/google-play-app@1` · **Price:** $0.0025 per app

## Input

A Google Play app page:

```
https://play.google.com/store/apps/details?id=<package name>&hl=en&gl=US
```

e.g. `id=com.spotify.music`. `hl=en` keeps the labels in English (the `downloads` field reads the English word
"Downloads"); `gl` sets the store country, which decides the price and currency.

## Output

| Field | Type | Description |
|---|---|---|
| `appId` | string \| null | package name, e.g. `com.spotify.music` |
| `name` | string | app name |
| `developer` | string \| null | developer name |
| `developerWebsite` | string \| null | the developer's website |
| `developerUrl` | string \| null | the developer's page on Google Play |
| `category` | string \| null | category as shown, e.g. `Music & Audio` |
| `categoryId` | string \| null | Google's category code, e.g. `MUSIC_AND_AUDIO` (for games it can differ from `category`) |
| `rating` | number \| null | average rating (1 to 5), unrounded, e.g. `4.349` |
| `ratingCount` | number \| null | exact number of ratings |
| `downloads` | string \| null | downloads as shown, e.g. `1B+`, `500M+` |
| `downloadsMin` | number \| null | the same as a number (the minimum), e.g. `1000000000` |
| `contentRating` | string \| null | e.g. `Everyone`, `Teen`, `Everyone 10+` |
| `price` | number \| null | price in `currency`; `0` for free apps |
| `currency` | string \| null | e.g. `USD` |
| `notices` | string[] | e.g. `Contains ads`, `In-app purchases`; empty when there are none |
| `updated` | string \| null | last update date as shown, e.g. `Nov 5, 2026` |
| `summary` | string \| null | the short description |
| `description` | string \| null | the full description, with line breaks |
| `icon` | string \| null | URL of the app icon |
| `screenshots` | string[] | URLs of the screenshots |

Full example: [sample-output.json](sample-output.json) (Spotify; screenshots shortened to 3).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-play-app@1" \
  --data-urlencode "target_url=https://play.google.com/store/apps/details?id=com.spotify.music&hl=en&gl=US"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-play-app@1` on the Google Play pages of Duolingo, Babbel and Busuu and compare their
> rating, rating count, downloads and last update in a table.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Not included:** version number, Android requirement, "What's new" and reviews. Google Play loads them only
  in a browser (a dialog on the page).
- **App not on Google Play:** the page answers HTTP 404 and the call fails with `target_error` (charged, as the
  page was fetched). An unavailable app in the chosen country may also fail.
- **No app name = failed request:** if the page has no app data (a bot check), the call fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; JSON-LD + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real app page
