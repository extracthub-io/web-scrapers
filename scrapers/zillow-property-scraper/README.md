# Zillow Property Scraper (home details)

Turn a Zillow home page into JSON: zpid, address, coordinates, price, status, price cut, beds, baths, living
area, home type, the full description, Zestimate and rent Zestimate, days on Zillow, views and saves, MLS
number, brokerage, every fact and feature by category, price history and tax history. Good for property
research, investment analysis and market studies. Pairs with the
[Zillow Search Scraper](../zillow-search-scraper/), which gives the listing URLs.

**Catalog:** [extracthub.io/extractor/@extracthub1/zillow-property](https://extracthub.io/extractor/@extracthub1/zillow-property)
**Extractor id:** `@extracthub1/zillow-property@1` · **Price:** $0.0035 per property (JavaScript tier)

## Input

A Zillow home page (`homedetails`):

```
https://www.zillow.com/homedetails/<address>/<zpid>_zpid/
```

e.g. `https://www.zillow.com/homedetails/650-N-Williams-St-Denver-CO-80218/13331758_zpid/`, or any `item.url`
from the Zillow Search Scraper.

## Output

| Field | Type | Description |
|---|---|---|
| `zpid` | string \| null | Zillow property id |
| `url` | string \| null | canonical page URL |
| `address` | string | full address |
| `streetAddress`, `city`, `state`, `zipcode` | string \| null | address parts |
| `latitude`, `longitude` | number \| null | coordinates |
| `price` | number \| null | list price |
| `currency` | string \| null | `USD` |
| `status` | string \| null | e.g. `For sale`, `Active`, `Pending` |
| `priceChange` | string \| null | latest price change as shown, e.g. `Price cut: $25K (11/5)` |
| `beds` | number \| null | bedrooms |
| `baths` | number \| null | bathrooms |
| `livingArea` | number \| null | living area in sq ft |
| `homeType` | string \| null | schema.org type, e.g. `SingleFamilyResidence`, `Apartment` |
| `atAGlance` | string[] | the "at a glance" chips, e.g. `Built in 2005`, `6,250 Square Feet Lot`, `$462/sqft`, `$710/mo HOA` |
| `description` | string \| null | the full listing description |
| `zestimate` | number \| null | Zillow's value estimate (`null` when Zillow shows "Not available") |
| `rentZestimate` | number \| null | Zillow's rent estimate per month |
| `daysOnZillow` | number \| null | days since listed |
| `views` | number \| null | page views |
| `saves` | number \| null | times saved |
| `mlsId` | string \| null | MLS listing number |
| `brokerage` | string \| null | listing brokerage as shown |
| `facts[]` | array | Facts & features: `{ category, items[] }`, e.g. `{ "category": "Heating", "items": ["Forced Air"] }` |
| `priceHistory[]` | array | `{ date, event, price, changePercent, pricePerSqft }`, newest first (the rows Zillow shows) |
| `taxHistory[]` | array | `{ year, propertyTax, taxAssessment }` |

Full example: [sample-output.json](sample-output.json) (a Denver home; `facts` shortened to 7 categories; this listing has no Zestimate).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/zillow-property@1" \
  --data-urlencode "target_url=https://www.zillow.com/homedetails/650-N-Williams-St-Denver-CO-80218/13331758_zpid/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/zillow-search@1` on zillow.com/denver-co, then `@extracthub1/zillow-property@1` on the 5
> cheapest listings, and compare price, Zestimate, price per sq ft, HOA and days on Zillow.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Browser rendering:** Zillow loads facts, Zestimate and history after the page, so this scraper renders it
  in a browser (JavaScript tier, slower than plain fetches: allow up to a minute per call).
- **Price history:** only the rows Zillow shows before "See complete history" (usually 5).
- **Listing agent contact details are not included**, only the brokerage. `brokerage` may include the
  brokerage's office phone when Zillow shows it.
- **Positional fields:** `beds` and `baths` are read from the beds / baths / sq ft line in that order; on
  land or lots without beds they can be off.
- **No address = failed request:** a page without the listing data (a bot check, a removed home) fails with
  HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy; JSON-LD + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real home page
