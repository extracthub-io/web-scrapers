# Craigslist Search Scraper (listings)

Turn a Craigslist search or category page into JSON: every listing on the page (often 300+) with title, price,
location and link, plus a schema.org list with the home type, bedrooms, bathrooms, coordinates and city that
Craigslist publishes for housing posts. Works on any city and category (apartments, for sale, cars & trucks,
services, ...) and on keyword searches. Good for rent and price monitoring, market research and listing alerts.

**Catalog:** [extracthub.io/extractor/@extracthub1/craigslist-search](https://extracthub.io/extractor/@extracthub1/craigslist-search)
**Extractor id:** `@extracthub1/craigslist-search@1` · **Price:** $0.0025 per page

## Input

A Craigslist search page of any city and category, with or without a keyword:

```
https://<city>.craigslist.org/search/<category>[?query=<keywords>]
```

e.g. `https://sfbay.craigslist.org/search/apa` (SF Bay Area apartments / housing for rent). Other categories
work the same way (`/search/sss?query=<keywords>` for all for-sale posts, `/search/cta` for cars & trucks), and
so do filters in the URL (`min_price`, `max_price`, `bedrooms`, ...).

## Output

| Field | Type | Description |
|---|---|---|
| `listings[]` | array | listings in page order |
| `listings[].position` | number | 1-based position on the page |
| `listings[].title` | string | e.g. `Now Open, Whiskey Lounge, Pets Welcome, All New` |
| `listings[].price` | number \| null | e.g. `3710`; `null` when the post has no price |
| `listings[].priceText` | string \| null | as shown, e.g. `$3,710` |
| `listings[].location` | string \| null | neighborhood or city as written by the poster, e.g. `santa clara` |
| `listings[].url` | string | post link, e.g. `https://www.craigslist.org/view/d/santa-clara-now-open-whiskey-lounge/jStHkxm8kVymgok5JiViUf` |
| `listingsCount` | number | listings on the page, e.g. `356` |
| `searchDescription` | string \| null | e.g. `Apartments / Housing For Rent in SF Bay Area` |
| `schemaListings[]` | array | the page's schema.org list, same order as `listings` |
| `schemaListings[].name` | string | listing title |
| `schemaListings[].type` | string \| null | e.g. `Apartment`, `House`, `Product` |
| `schemaListings[].bedrooms` | number \| null | housing only, e.g. `1` |
| `schemaListings[].bathrooms` | number \| null | housing only, e.g. `1` |
| `schemaListings[].latitude` / `longitude` | number \| null | housing only, e.g. `37.4096801058484`, `-121.966958237425` |
| `schemaListings[].city` / `region` | string \| null | housing only, e.g. `Santa Clara`, `CA` |

Full example: [sample-output.json](sample-output.json) (the SF Bay Area apartments page above; 5 of 356
listings shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/craigslist-search@1" \
  --data-urlencode "target_url=https://sfbay.craigslist.org/search/apa"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/craigslist-search@1` on https://sfbay.craigslist.org/search/apa and list the 10 cheapest
> 2-bedroom apartments with their price, city and link.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** Craigslist ships a static list of the results in the page HTML (its app draws the gallery
  with JavaScript); no browser is needed, fetched through a US proxy.
- **No posting date:** the static list has no date, image or post id; open the post link for those.
- **Two lists:** `listings` (from the page) and `schemaListings` (from the page's JSON-LD) come in the same
  order. On the pages tested the JSON-LD list had the same items, so item N of one matches item N of the other.
  Outside housing, `schemaListings` only has the title and `type: "Product"`.
- **Location** is free text written by the poster (`hayward / castro valley`, `San Francisco, CA`).
- **Price `0`:** some posts show `$0` (price on request); it is returned as `0`.
- **Empty searches:** a search with no listings fails with HTTP 422 `required_fields_missing` (the list is
  required) and is still charged.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page (shortened)
