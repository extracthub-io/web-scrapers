# Redfin Search Scraper (homes for sale)

Turn a Redfin home search into JSON: about 40 homes per page with address, link, property id, list price, beds,
baths, square feet, street / city / state / ZIP, coordinates, photo and listing brokerage, plus the total number
of homes, the current page and the number of pages. Good for housing market research, price tracking and lead
lists of properties.

**Catalog:** [extracthub.io/extractor/@extracthub1/redfin-search](https://extracthub.io/extractor/@extracthub1/redfin-search)
**Extractor id:** `@extracthub1/redfin-search@1` · **Price:** $0.0025 per page

## Input

A Redfin search page for a city, ZIP code or neighborhood, with or without filters and page number:

```
https://www.redfin.com/city/<id>/<ST>/<City>[/filter/<filters>][/page-<N>]
https://www.redfin.com/zipcode/<ZIP>[/page-<N>]
```

e.g. `https://www.redfin.com/city/30749/NY/New-York`.

## Output

| Field | Type | Description |
|---|---|---|
| `searchTitle` | string \| null | e.g. `New York, NY homes for sale & real estate` |
| `totalResults` | number \| null | homes matching the search, e.g. `19112` |
| `homes[]` | array | the homes on this page (about 40) |
| `homes[].position` | number | 1-based position on the page |
| `homes[].address` | string | full address, e.g. `2 E 55th St Unit 903W12, New York, NY 10022` |
| `homes[].url` | string | property page link |
| `homes[].propertyId` | string \| null | Redfin home id, e.g. `206936005` |
| `homes[].price` | number \| null | list price in USD, e.g. `235000` |
| `homes[].beds` | number \| null | e.g. `2` (null for a studio) |
| `homes[].bedsText` | string \| null | as shown, e.g. `2 beds`, `Studio` |
| `homes[].baths` | number \| null | e.g. `2`, `3.5` |
| `homes[].sqft` | number \| null | living area in sq ft, e.g. `1382` |
| `homes[].keyFacts` | string[] | highlights, e.g. `["$2,820 HOA", "Built 1904"]` (first 5 homes only) |
| `homes[].badges` | string[] | e.g. `["NEW 4 HRS AGO", "VIDEO TOUR"]` (first 5 homes only) |
| `homes[].streetAddress` | string \| null | e.g. `2 E 55th St Unit 903W12` |
| `homes[].city` | string \| null | e.g. `New York` |
| `homes[].state` | string \| null | e.g. `NY` |
| `homes[].postalCode` | string \| null | e.g. `10022` |
| `homes[].latitude` | number \| null | e.g. `40.7612128` |
| `homes[].longitude` | number \| null | e.g. `-73.9729824` |
| `homes[].homeType` | string \| null | schema.org type, e.g. `SingleFamilyResidence`, `Accommodation` |
| `homes[].image` | string \| null | main photo |
| `homes[].listingSource` | string \| null | e.g. `Listing by Compass • Provided by RLS at REBNY` |
| `currentPage` | number \| null | e.g. `1` |
| `totalPages` | number \| null | e.g. `465` |

Full example: [sample-output.json](sample-output.json) (New York, NY; homes shortened to 3 of 41).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/redfin-search@1" \
  --data-urlencode "target_url=https://www.redfin.com/city/30749/NY/New-York"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/redfin-search@1` on the first 3 pages of Redfin homes for sale in New York, NY and make a
> table of address, price, beds, baths, square feet and price per square foot, cheapest first.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the home cards are in the page HTML. No browser is needed.
- **Pages:** there is no next-page link in the HTML. Add `/page-2`, `/page-3`, ... to the search URL, up to
  `totalPages`.
- **Key facts and badges** are in the HTML only for the first 5 homes of a page; the others return `[]`.
- **Order:** homes come in Redfin's default order ("Recommended"), which can change between calls.
- **Studios** have `beds: null` and `bedsText: "Studio"`.
- **Home details** (description, year built, HOA dues, agents) are on the property page (`homes[].url`); this
  collection has no Redfin property scraper yet.
- **US view:** fetched through a US proxy.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page
