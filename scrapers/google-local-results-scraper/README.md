# Google Local Results Scraper (places list)

Turn Google's local results ("Places" tab) into JSON: every place with its name, rating, review count,
category, price range, address, years in business, opening status and phone, 20 per page with a link to the
next page. Good for local lead lists and market scans. No browser rendering needed, so it is cheaper than the
[Google Maps Scraper](../google-maps-scraper/), and it pages past the first 20 results.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-local-results](https://extracthub.io/extractor/@extracthub1/google-local-results)
**Extractor id:** `@extracthub1/google-local-results@1` · **Price:** $0.0025 per page

## Input

A Google search URL with `tbm=lcl` (the local results):

```
https://www.google.com/search?q=<query>&tbm=lcl&hl=en&gl=us
```

Write the query with `+` for spaces, e.g. `plumbers+in+denver+co`. `hl=en` keeps the labels in English (the
fields below read English text such as "years in business"). For page 2, 3, ... call `nextPageUrl`, or add
`&start=20`, `&start=40`, ...

## Output

| Field | Type | Description |
|---|---|---|
| `places[]` | array | places in the order Google lists them |
| `places[].position` | number | rank on this page (1 = first) |
| `places[].name` | string | business name |
| `places[].kgmid` | string \| null | Google knowledge-graph ID, e.g. `/g/1tfw3jh7`. The `/g/` (or `/m/` for older IDs) prefix is part of the ID; open the business panel with `https://www.google.com/search?kgmid=/g/1tfw3jh7` |
| `places[].rating` | number \| null | average star rating (1 to 5) |
| `places[].reviewCount` | number \| null | number of reviews, as Google rounds it (`3.9K` → `3900`) |
| `places[].category` | string \| null | main category, e.g. `Plumber`, `Coffee shop` |
| `places[].priceRange` | string \| null | restaurants and cafes: price per person, e.g. `$10–20` |
| `places[].address` | string \| null | street address for shops and restaurants; for service-area businesses (plumbers, electricians, ...) only the city, e.g. `Denver, CO` |
| `places[].yearsInBusiness` | number \| null | service businesses: "20+ years in business" → `20` (a minimum) |
| `places[].openStatus` | string \| null | opening status at fetch time, e.g. `Open 24 hours`, `Closed · Opens 7 AM` |
| `places[].phone` | string \| null | phone number, when the list shows it (mostly service businesses) |
| `places[].reviewSnippet` | string \| null | the review quote Google shows under the place |
| `nextPageUrl` | string \| null | URL of the next 20 results; `null` on the last page |

Full example: [sample-output.json](sample-output.json) (plumbers in Denver, CO).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-local-results@1" \
  --data-urlencode "target_url=https://www.google.com/search?q=plumbers+in+denver+co&tbm=lcl&hl=en&gl=us"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-local-results@1` to get the first 3 pages of electricians in Phoenix, AZ and give me a
> table of name, rating, reviews, phone and years in business.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Google Local or Google Maps?

| | Google Local (this one) | [Google Maps](../google-maps-scraper/) |
|---|---|---|
| Price | $0.0025 per page | $0.0035 per search |
| Places | 20 per page, more pages via `nextPageUrl` | about 20 per search |
| Phone | services: yes; shops and restaurants: rarely | services: yes; others: often missing |
| Address | street, or the city for service businesses | street |
| Place ID, coordinates, website | no | yes |
| Hotels | no (see below) | yes, with price |

## Good to know

- **The fields depend on the type of place:** Google shows other lines for service businesses (years in
  business, city, phone) than for shops and restaurants (price range, street address, opening hours).
  Fields that a card doesn't show are `null`.
- **Opening status is often missing for restaurants that are open:** Google leaves that line out.
- **Hotels are not supported:** a hotel search gets Google's hotel layout instead of the list; the call
  fails with HTTP 422 `required_fields_missing` (charged). Use the [Google Maps Scraper](../google-maps-scraper/).
- **No results = failed request:** a page without the list (a bot check, or a query without local results)
  fails with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **Results are from a US location** (`proxyCountry: US`). Always name the city or area in the query.
- **Sponsored places** were not seen in the test pages; if Google shows them, they may appear in the list.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real search
