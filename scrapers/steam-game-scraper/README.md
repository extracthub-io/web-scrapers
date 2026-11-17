# Steam Game Scraper (store page)

Turn a Steam store game page into JSON: app id, name, short description, price, original price, discount and
how long it runs, all-time and recent review summaries (label, count, % positive), release date, developers,
publishers, genres, user tags, features, supported languages, platforms, Metacritic score, description and
header image. Good for price and discount tracking, game databases, review monitoring and market research.

**Catalog:** [extracthub.io/extractor/@extracthub1/steam-game](https://extracthub.io/extractor/@extracthub1/steam-game)
**Extractor id:** `@extracthub1/steam-game@1` · **Price:** $0.0025 per page

## Input

A Steam store app page:

```
https://store.steampowered.com/app/<app-id>/<Name>/
```

e.g. `https://store.steampowered.com/app/413150/Stardew_Valley/`.

## Output

| Field | Type | Description |
|---|---|---|
| `appId` | number | Steam app id, e.g. `413150` |
| `name` | string | e.g. `Stardew Valley` |
| `url` | string | canonical store link |
| `shortDescription` | string \| null | the short text under the header image |
| `price` | number \| null | current price of the base game, e.g. `14.99`; `0` for free-to-play games |
| `currency` | string \| null | e.g. `USD` |
| `priceText` | string \| null | price as shown, e.g. `$14.99` |
| `originalPrice` | number \| null | regular price while the game is on sale, e.g. `29.99` |
| `discountPercent` | number \| null | e.g. `10` while on sale |
| `discountEnds` | string \| null | sale note, e.g. `INTRODUCTORY OFFER! Offer ends November 25` |
| `reviewsSummary` | string \| null | review score, e.g. `Overwhelmingly Positive` |
| `reviewsCount` | number \| null | reviews behind that score, e.g. `397368` |
| `reviewsPositivePercent` | number \| null | e.g. `98` |
| `recentReviewsSummary` | string \| null | score of the last 30 days, e.g. `Mostly Positive` |
| `recentReviewsCount` | number \| null | reviews in the last 30 days, e.g. `5803` |
| `recentReviewsPositivePercent` | number \| null | e.g. `98` |
| `releaseDate` | string \| null | as shown, e.g. `Feb 26, 2016` |
| `developers` | string[] | e.g. `["ConcernedApe"]` |
| `publishers` | string[] | e.g. `["ConcernedApe"]` |
| `genres` | string[] | e.g. `["Indie", "RPG", "Simulation"]` |
| `tags` | string[] | user-defined tags, most popular first (up to 20) |
| `features` | string[] | e.g. `["Single-player", "Online Co-op", "Steam Achievements", ...]` |
| `languages` | string[] | supported languages, e.g. `["English", "German", ...]` |
| `platforms` | string[] | `win`, `mac`, `linux` (from the system requirements tabs) |
| `metacriticScore` | number \| null | e.g. `89` |
| `description` | string \| null | "About This Game" as text |
| `headerImage` | string \| null | header image URL |

Full example: [sample-output.json](sample-output.json) (the Stardew Valley page above; description shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/steam-game@1" \
  --data-urlencode "target_url=https://store.steampowered.com/app/413150/Stardew_Valley/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/steam-game@1` on these Steam games and make a table with the name, price, discount, review
> score and % positive, release date and top 5 tags.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything comes from the store page HTML and its schema.org price data. No browser is
  needed, fetched through a US proxy, so prices are in USD.
- **Age-restricted games:** games with mature content (e.g. Cyberpunk 2077, app 1091500) answer with Steam's age
  check page instead of the store page. The extractor does not pass the age gate; those pages fail with HTTP 422
  `required_fields_missing` and are still charged.
- **Review score:** `reviews*` is the main score Steam shows (for the US store usually "English Reviews"; "All
  Reviews" on some games). `recentReviews*` is `null` when Steam shows no 30-day score (too few recent reviews).
- **Price:** `price` / `priceText` / `originalPrice` / `discountPercent` belong to the first purchase option (the
  base game), not to bundles or DLC on the page. Free-to-play games give `price: 0` and `priceText: null`;
  games not released yet often have no price.
- **Sale end:** `discountEnds` is the text from the page; for short deals the date is filled in by JavaScript, so
  it can end in `Offer ends in`.
- **Platforms:** read from the system requirements tabs; a game with requirements for one system only can give
  an empty list.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real game page
