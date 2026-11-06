# Google Maps Scraper (places search)

Turn a Google Maps search into JSON: every place in the results with its name, Google Maps link, place ID,
coordinates, rating, review count, category, address, opening status, phone and website. Good for local lead lists, competitor
maps and store locators. One API call per search, no Google Maps API key needed.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-maps-search](https://extracthub.io/extractor/@extracthub1/google-maps-search)
**Extractor id:** `@extracthub1/google-maps-search@1` · **Price:** $0.0035 per search (JavaScript tier)

## Input

A Google Maps search URL:

```
https://www.google.com/maps/search/<query>?hl=en&gl=us
```

Write the query with `+` for spaces, e.g. `plumbers+in+denver+co` or `coffee+shops+in+austin+tx`.
`hl=en` keeps the labels in English.

## Output

| Field | Type | Description |
|---|---|---|
| `places[]` | array | places in the order Google Maps lists them |
| `places[].position` | number | rank in the results (1 = first) |
| `places[].name` | string | business name |
| `places[].placeUrl` | string \| null | Google Maps link to the place |
| `places[].placeId` | string \| null | Google place ID, e.g. `ChIJXQdbzlF5bIcRisJQL72gJFI` (works with the Google Places API and `https://www.google.com/maps/place/?q=place_id:<id>`) |
| `places[].cid` | string \| null | Google Maps feature ID, e.g. `0x876c7951ce5b075d:0x5224a0bd2f50c28a` |
| `places[].latitude` | number \| null | latitude of the place |
| `places[].longitude` | number \| null | longitude of the place |
| `places[].rating` | number \| null | average star rating (1 to 5) |
| `places[].reviewCount` | number \| null | number of reviews |
| `places[].category` | string \| null | main category, e.g. `Plumber`, `Coffee shop` |
| `places[].address` | string \| null | street address as shown in the list (`null` for service-area businesses without a public address) |
| `places[].openStatus` | string \| null | opening status at fetch time, e.g. `Open 24 hours`, `Closed · Opens 7 AM` |
| `places[].phone` | string \| null | phone number, when the list shows it |
| `places[].website` | string \| null | the business website, when the list shows it (`utm_*`, `fbclid` and `gclid` parameters removed) |
| `places[].price` | string \| null | hotels: price per night as shown, e.g. `COP 207K` (the currency follows the location Google sees) |
| `places[].priceCurrency` | string \| null | hotels: the currency code before the amount, e.g. `COP` (`null` when the price is written with a symbol, such as `$120`) |
| `places[].priceAmount` | number \| null | hotels: the amount as a number, e.g. `207000` for `207K` |
| `places[].amenities` | string[] | hotels: amenities shown in the list, e.g. `Pool`, `Free Wi-Fi`; empty for other places |

Full example: [sample-output.json](sample-output.json) (plumbers in Denver, CO).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-maps-search@1" \
  --data-urlencode "target_url=https://www.google.com/maps/search/plumbers+in+denver+co?hl=en&gl=us"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-maps-search@1` to find dentists in Chicago on Google Maps and give me a table of
> name, rating, reviews, phone and website, best rated first.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **About 20 places per search:** the scraper reads the first batch of results that Google Maps loads
  (20 in most tests, sometimes more). It does not scroll for more. For wider coverage, run narrower searches
  (by neighbourhood or ZIP code) in a batch.
- **The fields depend on the type of place:** Google Maps uses a different list layout per type.
  - Services (plumbers, electricians, ...): phone and website are usually included.
  - Restaurants, cafes, dentists, ...: phone and website are often `null` in the list.
  - Hotels: no address or opening hours, but `price` and `amenities` instead.
  For full details (phone, website, hours) run the [Google Maps Place Scraper](../google-maps-place-scraper/)
  on each `placeUrl`.
- **No results = failed request:** if the page has no result list (a bot check, or a query that goes
  straight to a single place), the call fails with HTTP 422 `required_fields_missing` and is still charged.
  Batches retry it once automatically.
- **Results are from a US location** (`proxyCountry: US`). "Near me" queries are relative to that location,
  so always name the city or area in the query.

## Versions

- **1.1.0:** adds `placeId`, `cid`, `latitude`, `longitude`, `priceCurrency` and `priceAmount`; removes
  tracking parameters from `website`. No breaking changes: callers on `@1` get it automatically.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real search
