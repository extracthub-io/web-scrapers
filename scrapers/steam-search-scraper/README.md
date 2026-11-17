# Steam Search Scraper

Turn a Steam store search into JSON: 50 games per page with app id, name, capsule image, platforms, release
date, review summary, review count and % positive, price, original price, discount and a free flag, plus the
total number of results. Works on keyword searches and on tag, genre, sort and filter URLs (e.g. specials).
Good for discount tracking, catalog monitoring and market research on Steam.

**Catalog:** [extracthub.io/extractor/@extracthub1/steam-search](https://extracthub.io/extractor/@extracthub1/steam-search)
**Extractor id:** `@extracthub1/steam-search@1` · **Price:** $0.0025 per page

## Input

A Steam store search page:

```
https://store.steampowered.com/search/?term=<keywords>
```

e.g. `https://store.steampowered.com/search/?term=strategy`. Filters and sorting work the same way
(`&specials=1`, `&tags=<id>`, `&sort_by=Reviews_DESC`); add `&page=2`, `&page=3`, ... for the next pages.

## Output

| Field | Type | Description |
|---|---|---|
| `results[]` | array | games in page order, 50 per page |
| `results[].position` | number | 1-based position on the page |
| `results[].name` | string | e.g. `Wall World Strategy` |
| `results[].image` | string \| null | capsule image URL |
| `results[].appId` | number \| null | Steam app id, e.g. `4218360`; `null` for bundles and packages |
| `results[].platforms` | string[] | `win`, `mac`, `linux` |
| `results[].releaseDate` | string \| null | as shown, e.g. `Nov 11, 2026` |
| `results[].reviewSummary` | string \| null | e.g. `Mostly Positive`; `null` when the game has too few reviews |
| `results[].reviewsPositivePercent` | number \| null | e.g. `70` |
| `results[].reviewsCount` | number \| null | e.g. `162` |
| `results[].price` | number \| null | current price, e.g. `16.99`; `null` when free or not for sale |
| `results[].priceText` | string \| null | price as shown, e.g. `$16.99` or `Free` |
| `results[].originalPrice` | number \| null | regular price while on sale, e.g. `19.99` |
| `results[].discountPercent` | number \| null | e.g. `15`; `0` when not on sale |
| `results[].isFree` | boolean | `true` when the price shows `Free` |
| `totalResults` | number \| null | results of the whole search, e.g. `76936` |
| `showing` | string \| null | e.g. `showing 1 - 50 of 76936` |

Full example: [sample-output.json](sample-output.json) (the "strategy" search above; 5 of 50 results shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/steam-search@1" \
  --data-urlencode "target_url=https://store.steampowered.com/search/?term=strategy"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/steam-search@1` on the Steam search for "strategy" and list the 10 discounted games with the
> best review %, with their price, original price and discount.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the result rows are in the page HTML; no browser is needed, fetched through a US proxy, so
  prices are in USD. The store's infinite scroll is not used: each request returns one page of 50.
- **Game links:** the row link is not in the output; a game's store page is
  `https://store.steampowered.com/app/<appId>/` (use it with
  [`@extracthub1/steam-game`](../steam-game-scraper/)).
- **Bundles and packages** appear in the results with `appId: null` (their image is under `/subs/` or
  `/bundles/`).
- **Order:** the default order is Steam's relevance and can change between requests; use `&sort_by=` for a
  stable order.
- **Empty searches:** a search with no results fails with HTTP 422 `required_fields_missing` (the result list
  is required) and is still charged.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page (shortened)
