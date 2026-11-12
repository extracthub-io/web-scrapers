# Realtor.com Search Scraper (homes for sale)

Turn a Realtor.com home search into JSON: about 42 homes per page with address, link, list price, home type,
bedrooms, floor size, street / city / state / ZIP, coordinates and photo, plus the total number of results and
the next page link. Good for housing market research, price tracking and lead lists of properties. Details of
each home come from the [Realtor.com Property Scraper](../realtor-property-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/realtor-search](https://extracthub.io/extractor/@extracthub1/realtor-search)
**Extractor id:** `@extracthub1/realtor-search@1` · **Price:** $0.0025 per page

## Input

A Realtor.com search page for a city, ZIP code or neighborhood, with or without filters and page number:

```
https://www.realtor.com/realestateandhomes-search/<City>_<ST>[/<filters>][/pg-<N>]
```

e.g. `https://www.realtor.com/realestateandhomes-search/Austin_TX`.

## Output

| Field | Type | Description |
|---|---|---|
| `searchTitle` | string \| null | e.g. `Austin, TX homes for sale & real estate` |
| `totalResults` | number \| null | homes matching the search, e.g. `6658` |
| `homes[]` | array | the homes on this page (about 42) |
| `homes[].position` | number | 1-based position on the page |
| `homes[].address` | string | full address, e.g. `1704 Shelbourne Dr, Austin, TX 78752` |
| `homes[].url` | string | property page link |
| `homes[].price` | number \| null | list price, e.g. `400000` |
| `homes[].currency` | string \| null | `USD` |
| `homes[].homeType` | string \| null | schema.org type, e.g. `SingleFamilyResidence`, `Apartment` |
| `homes[].bedrooms` | number \| null | e.g. `3` (missing for land) |
| `homes[].floorSizeSqft` | number \| null | living area in sq ft, e.g. `1556` |
| `homes[].streetAddress` | string \| null | e.g. `1704 Shelbourne Dr` |
| `homes[].city` | string \| null | e.g. `Austin` |
| `homes[].state` | string \| null | e.g. `TX` |
| `homes[].postalCode` | string \| null | e.g. `78752` |
| `homes[].latitude` | number \| null | e.g. `30.327864` |
| `homes[].longitude` | number \| null | e.g. `-97.683779` |
| `homes[].image` | string \| null | main photo |
| `nextPageUrl` | string \| null | next results page, e.g. `https://www.realtor.com/realestateandhomes-search/Austin_TX/pg-2` |

Full example: [sample-output.json](sample-output.json) (Austin, TX; homes shortened to 3 of 42).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/realtor-search@1" \
  --data-urlencode "target_url=https://www.realtor.com/realestateandhomes-search/Austin_TX"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/realtor-search@1` on the first 3 pages of Realtor.com homes for sale in Austin, TX and make
> a table of address, price, bedrooms, square feet and price per square foot, cheapest first.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the homes come from the schema.org list Realtor.com puts in the page HTML. No browser is
  needed. Bathrooms, status badges and agent names are not in that list: use the
  [Realtor.com Property Scraper](../realtor-property-scraper/) on `homes[].url` for those.
- **Order:** homes come in Realtor.com's default order ("Relevant listings"), which can change between calls.
- **Light pages:** Realtor.com sometimes answers with a page that has no listings yet (only placeholders). That
  page fails with HTTP 422 `required_fields_missing` (still charged); batches retry it once.
- **Pages:** follow `nextPageUrl` (`/pg-2`, `/pg-3`, ...) until it is null.
- **JavaScript rendering is not used:** a JS-rendered fetch answered HTTP 429 twice in testing, the plain fetch
  works.
- **US view:** fetched through a US proxy.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page
