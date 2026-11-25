# TripAdvisor Attractions Scraper (things to do list by category)

Turn a TripAdvisor things to do list of one category (`Attractions-g...-Activities-c...`: Sights & Landmarks,
Museums, Nature & Parks ...) into JSON: the 30 ranked attractions on the page with attraction id, name,
link, rating, review count, categories, lowest ticket price, Travelers' Choice badge and a review snippet, plus
the next page link. Good for destination guides, travel apps and feeding the
[TripAdvisor Attraction Scraper](../tripadvisor-attraction-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/tripadvisor-attractions](https://extracthub.io/extractor/@extracthub1/tripadvisor-attractions)
**Extractor id:** `@extracthub1/tripadvisor-attractions@1` · **Price:** $0.0025 per page

## Input

A category list of a city, e.g. Sights & Landmarks in New York City:
`https://www.tripadvisor.com/Attractions-g60763-Activities-c47-New_York_City_New_York.html`

```
https://www.tripadvisor.com/Attractions-g60763-Activities-c49-New_York_City_New_York.html       Museums
https://www.tripadvisor.com/Attractions-g60763-Activities-c47-oa30-New_York_City_New_York.html  page 2
https://www.tripadvisor.com/Attractions-g187147-Activities-c47-Paris_Ile_de_France.html          another city
```

Common categories: `c47` Sights & Landmarks, `c49` Museums, `c57` Nature & Parks, `c26` Shopping. Tested on
Sights & Landmarks and Museums; tour and ticket lists (`c42`) are product pages and are not covered.
The city's main "Things to Do" page (without `-c..`) is a page of carousels, not a list: use a category.

## Output

| Field | Type | Description |
|---|---|---|
| `pageUrl` | string \| null | canonical link of the list |
| `geoId` | string \| null | TripAdvisor location id |
| `title` | string \| null | e.g. `THE 10 BEST New York City Sights & Historical Landmarks` |
| `attractions[]` | array | the ranked attractions on the page (30) |
| `nextPageUrl` | string \| null | the next page |

Each `attractions[]` entry:

| Field | Description |
|---|---|
| `rank` | rank in the list (page 2 starts at 31) |
| `attractionId` | TripAdvisor attraction id |
| `name` / `url` | name and attraction page (input for the TripAdvisor Attraction Scraper) |
| `rating` / `reviewCount` | average rating (1-5) and number of reviews |
| `categories[]` | e.g. `["Points of Interest & Landmarks", "Parks"]` |
| `ticketPrice` / `ticketText` | lowest ticket or tour price, e.g. `51` / `Admission tickets from $51`; `null` when none is sold |
| `travelersChoice` | Travelers' Choice badge |
| `reviewSnippet` | a short quote from a review |

Full example: [sample-output.json](sample-output.json) (New York City Sights & Landmarks; shortened to 3).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tripadvisor-attractions@1" \
  --data-urlencode "target_url=https://www.tripadvisor.com/Attractions-g60763-Activities-c47-New_York_City_New_York.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tripadvisor-attractions@1` on TripAdvisor's New York museums list and make a table of the
> top 10 with rating, reviews and ticket price.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **`categories`, `ticketPrice` and `ticketText`** come from page markup without stable hooks; they may need a
  fix when TripAdvisor changes its layout. Id, name, link, rating and reviews use stable hooks.
- **Prices in USD:** fetched through a US proxy, without JavaScript.
- **No attractions = failed request:** a page without the list (a bot check, the main Things to Do page) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real list page
