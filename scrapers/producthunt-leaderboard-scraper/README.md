# Product Hunt Scraper (daily leaderboard)

Turn a Product Hunt daily leaderboard (producthunt.com) into JSON: the day's ranked launches with rank, name,
tagline, product link, topics, upvotes, comments count and thumbnail, plus the page title and the previous / next
day links. Good for tracking new tools and startups, launch research, competitor monitoring and trend analysis
of what gets upvoted.

**Catalog:** [extracthub.io/extractor/@extracthub1/producthunt-leaderboard](https://extracthub.io/extractor/@extracthub1/producthunt-leaderboard)
**Extractor id:** `@extracthub1/producthunt-leaderboard@1` · **Price:** $0.0025 per page

## Input

A Product Hunt daily leaderboard page:

```
https://www.producthunt.com/leaderboard/daily/<year>/<month>/<day>
```

e.g. `https://www.producthunt.com/leaderboard/daily/2026/11/12` (month and day without a leading zero).

## Output

| Field | Type | Description |
|---|---|---|
| `title` | string \| null | page title with the date, e.g. `Best of Product Hunt \| November 12, 2026` |
| `products[]` | array | ranked products of the day, in leaderboard order (about 15 to 20) |
| `products[].position` | number | 1-based order in the list |
| `products[].rank` | number | Product Hunt's rank of the day, e.g. `1` |
| `products[].name` | string | e.g. `Plurai Simulation` |
| `products[].tagline` | string \| null | one-line pitch, e.g. `A simulated world that makes your agent improve on every run` |
| `products[].url` | string | product page, e.g. `https://www.producthunt.com/products/plurai` |
| `products[].topics` | string[] | e.g. `["API", "Developer Tools", "Artificial Intelligence"]` |
| `products[].votes` | number | upvotes, e.g. `409` |
| `products[].comments` | number \| null | comments count, e.g. `139` |
| `products[].thumbnail` | string \| null | product icon URL (48 x 48) |
| `previousDayUrl` | string \| null | leaderboard of the day before |
| `nextDayUrl` | string \| null | leaderboard of the next day (`null` on today's page) |

Full example: [sample-output.json](sample-output.json) (the November 12, 2026 leaderboard above; list shortened
to 5 products).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/producthunt-leaderboard@1" \
  --data-urlencode "target_url=https://www.producthunt.com/leaderboard/daily/2026/11/12"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/producthunt-leaderboard@1` on the Product Hunt daily leaderboards of the last 7 days and list
> the top 3 products of each day with votes and topics.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the leaderboard is in the HTML Product Hunt sends, fetched through a US proxy. If a fetch comes
  back blocked, ExtractHub retries it once in a browser (`allowJsEscalation`, JavaScript price for that call).
- **Promoted cards skipped:** Product Hunt mixes paid "Promoted" cards (ads and products from other days) into the
  list. They have no rank and are left out, so `position` equals `rank`.
- **Votes change:** today's leaderboard is still moving; past days are final. Use a past date for stable numbers.
- **Featured only:** the daily page lists the featured launches. The page of all launches of a day
  (`/leaderboard/daily/<year>/<month>/<day>/all`) was not tested.
- **Empty or blocked pages:** a page without products (a block page, a day in the future) fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once. In tests the proxy also answered a few
  calls with `upstream_error` (502, not charged); retry those.
- **Not included:** the home page (it mixes today, yesterday, last week and last month sections), product pages
  and makers.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy, browser retry
  when blocked)
- [`sample-output.json`](sample-output.json): output on a real leaderboard page
