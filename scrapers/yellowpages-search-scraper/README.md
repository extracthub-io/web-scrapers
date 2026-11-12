# Yellow Pages Search Scraper (local businesses)

Turn a Yellow Pages search into JSON: the 30 businesses of a results page with name, link, categories, phone,
street address, city / state / ZIP, website, review count, star rating, years in business, opening status and
description snippet, plus the total number of results and the next page link. Ads are skipped. Good for local
lead lists, business directories and market research by trade and city.

**Catalog:** [extracthub.io/extractor/@extracthub1/yellowpages-search](https://extracthub.io/extractor/@extracthub1/yellowpages-search)
**Extractor id:** `@extracthub1/yellowpages-search@1` · **Price:** $0.0025 per page

## Input

A Yellow Pages search page: what to find, where, and optionally the page number:

```
https://www.yellowpages.com/search?search_terms=<what>&geo_location_terms=<City>%2C+<ST>[&page=<N>]
```

e.g. `https://www.yellowpages.com/search?search_terms=plumber&geo_location_terms=Dallas%2C+TX`.

## Output

| Field | Type | Description |
|---|---|---|
| `searchTitle` | string \| null | e.g. `Plumber in Dallas, TX` |
| `totalResults` | number \| null | businesses matching the search, e.g. `792` |
| `businesses[]` | array | the businesses on this page (30), ads excluded |
| `businesses[].position` | number | 1-based position on the page |
| `businesses[].name` | string | e.g. `Roto-Rooter Plumbing & Water Cleanup` |
| `businesses[].url` | string | Yellow Pages business page |
| `businesses[].categories` | string[] | e.g. `["Plumbers", "Water Heater Repair"]` |
| `businesses[].phone` | string \| null | e.g. `(469) 923-9039` |
| `businesses[].streetAddress` | string \| null | e.g. `1412 Main St` (missing for service-area businesses) |
| `businesses[].locality` | string \| null | e.g. `Dallas, TX 75202` |
| `businesses[].city` | string \| null | e.g. `Dallas` |
| `businesses[].state` | string \| null | e.g. `TX` |
| `businesses[].postalCode` | string \| null | e.g. `75202` |
| `businesses[].website` | string \| null | the business's own website |
| `businesses[].reviewCount` | number \| null | Yellow Pages reviews, e.g. `3` |
| `businesses[].ratingStars` | string \| null | stars in words, as the page has them: `five`, `four half`, `three` ... (the number is in `schemaListings[].rating`) |
| `businesses[].yearsInBusiness` | number \| null | e.g. `91` |
| `businesses[].yearsWithYellowPages` | number \| null | e.g. `12` |
| `businesses[].openStatus` | string \| null | `open now`, `closed now`, `open 24 hours` |
| `businesses[].snippet` | string \| null | description or review excerpt shown on the card |
| `businesses[].image` | string \| null | thumbnail |
| `schemaListings[]` | array | the same businesses, in the same order, from the page's schema.org data |
| `schemaListings[].name` | string | business name |
| `schemaListings[].url` | string | Yellow Pages business page (join key with `businesses[].url`) |
| `schemaListings[].rating` | number | average rating, e.g. `4.67` (only when rated) |
| `schemaListings[].reviewCount` | number | e.g. `3` (only when rated) |
| `schemaListings[].telephone` | string | e.g. `(214) 894-0018` |
| `schemaListings[].streetAddress` / `city` / `state` / `postalCode` | string | address parts (only when published) |
| `schemaListings[].openingHours` | string[] | e.g. `["Mo-Fr 08:00-17:00"]` |
| `nextPageUrl` | string \| null | next results page, e.g. `https://www.yellowpages.com/search?search_terms=plumber&geo_location_terms=Dallas%2C%20TX&page=2` |

Full example: [sample-output.json](sample-output.json) (plumber in Dallas, TX; both lists shortened to 3 of 30).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/yellowpages-search@1" \
  --data-urlencode "target_url=https://www.yellowpages.com/search?search_terms=plumber&geo_location_terms=Dallas%2C+TX"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/yellowpages-search@1` on the first 3 pages of Yellow Pages results for "plumber" in
> Dallas, TX and make a table of name, phone, address, website and years in business, longest in business first.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the businesses are in the page HTML. No browser is needed.
- **Ads are skipped:** the sponsored blocks above and below the results are not in `businesses[]`.
- **Two lists:** `businesses[]` comes from the result cards (categories, website, years in business);
  `schemaListings[]` comes from the page's schema.org data and adds the numeric rating and opening hours. Both
  have the same businesses in the same order. In `schemaListings[]` a value the business does not have is left
  out (not `null`).
- **Order changes:** Yellow Pages rotates the default order between calls, so the same URL can return the
  businesses in another order.
- **Ratings** are Yellow Pages' own reviews; many businesses have none.
- **Pages:** follow `nextPageUrl` (`&page=2`, `&page=3`, ...) until it is null. 30 businesses per page.
- **Business contacts only:** phone numbers and websites are the public business listings.
- **US view:** fetched through a US proxy.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page
