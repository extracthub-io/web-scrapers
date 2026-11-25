# TripAdvisor Hotels Scraper (hotels list of a city)

Turn a TripAdvisor hotels list (`Hotels-g...`) into JSON: the 30 ranked hotels on the page with hotel id, name,
link, rating, review count, "Best Value" rank, lowest price shown, Travelers' Choice badge, short summary and a
review snippet, plus the next page link. Good for hotel market snapshots, price monitoring and feeding the
[TripAdvisor Hotel Scraper](../tripadvisor-hotel-scraper/) with hotel links.

**Catalog:** [extracthub.io/extractor/@extracthub1/tripadvisor-hotels](https://extracthub.io/extractor/@extracthub1/tripadvisor-hotels)
**Extractor id:** `@extracthub1/tripadvisor-hotels@1` · **Price:** $0.0025 per page

## Input

A TripAdvisor hotels list of a city, e.g. `https://www.tripadvisor.com/Hotels-g60763-New_York_City_New_York-Hotels.html`:

```
https://www.tripadvisor.com/Hotels-g60763-oa30-New_York_City_New_York-Hotels.html   page 2 (oa30, oa60, ...)
https://www.tripadvisor.com/Hotels-g187147-Paris_Ile_de_France-Hotels.html            another city
```

## Output

| Field | Type | Description |
|---|---|---|
| `pageUrl` | string \| null | canonical link of the list |
| `geoId` | string \| null | TripAdvisor location id, e.g. `60763` |
| `location` | string \| null | e.g. `New York City Hotels` |
| `hotels[]` | array | the ranked hotels on the page (30), sponsored cards skipped |
| `nextPageUrl` | string \| null | the next page |

Each `hotels[]` entry:

| Field | Description |
|---|---|
| `rank` | rank in the list (page 2 starts at 31) |
| `hotelId` | TripAdvisor hotel id |
| `name` | hotel name |
| `url` | hotel page (input for the TripAdvisor Hotel Scraper) |
| `rating` / `reviewCount` | average rating (1-5) and number of reviews |
| `popularity` | e.g. `#1 Best Value of 1,051 places to stay in New York City` |
| `priceFrom` / `priceText` | lowest nightly price TripAdvisor shows, e.g. `1074` / `$1,074` |
| `travelersChoice` | Travelers' Choice badge |
| `summary` | TripAdvisor's AI-written summary of the reviews |
| `reviewSnippet` | a short quote from a review |

Full example: [sample-output.json](sample-output.json) (New York City; shortened to 3 hotels).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tripadvisor-hotels@1" \
  --data-urlencode "target_url=https://www.tripadvisor.com/Hotels-g60763-New_York_City_New_York-Hotels.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tripadvisor-hotels@1` on the first 2 pages of TripAdvisor's Paris hotels and list the 10
> best-rated hotels under $250 a night.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Prices are without dates:** `priceFrom` is the lowest price TripAdvisor shows for its default dates, in USD
  (US proxy). It changes between calls; the hotel page has the booking offer.
- **Sponsored cards are skipped:** they have no rank; `rank` follows TripAdvisor's "Best Value" order.
- **No address in the list:** run the [TripAdvisor Hotel Scraper](../tripadvisor-hotel-scraper/) on `url` for
  address, phone, amenities and reviews.
- **`priceFrom` and `summary`** come from page markup without stable hooks; they may need a fix when TripAdvisor
  changes its layout.
- **No hotels = failed request:** a page without the hotel list (a bot check) fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real list page
