# Zillow Home Values Scraper (housing market overview)

Turn a Zillow home values page into JSON: the typical home value (Zillow Home Value Index) and its 1-year
change, the state / county / national comparison, for-sale inventory, new listings, median list and sale
price, sale-to-list ratio, share of homes sold above and below list, days to pending, average rent, about
8 years of monthly home value and rent history, and nearby regions with their home values. Good for market
reports, comparing cities or neighborhoods, and tracking prices over time.

**Catalog:** [extracthub.io/extractor/@extracthub1/zillow-home-values](https://extracthub.io/extractor/@extracthub1/zillow-home-values)
**Extractor id:** `@extracthub1/zillow-home-values@1` · **Price:** $0.0025 per page

## Input

A Zillow home values page (`/home-values/<regionId>/<region>/`) of a city, neighborhood, ZIP code, county or
state, e.g. `https://www.zillow.com/home-values/11093/denver-co/`:

```
https://www.zillow.com/home-values/11093/denver-co/                 city
https://www.zillow.com/home-values/275564/central-park-denver-co/   neighborhood
https://www.zillow.com/home-values/10/co/                           state
```

The `nearbyRegions[].regionId` of one page gives the home values page of that region:
`https://www.zillow.com/home-values/<regionId>/<any-slug>/`.

## Output

| Field | Type | Description |
|---|---|---|
| `regionId` | number | Zillow region id, e.g. `11093` |
| `regionName` | string | e.g. `Denver` |
| `regionType` | string \| null | `city`, `neighborhood`, `zip`, `county`, `state` |
| `state` / `county` | string \| null | parent state and county (city and ZIP pages) |
| `homeValue` | number | typical home value (ZHVI) in USD, e.g. `517745` |
| `homeValueDate` | string \| null | month of that value, e.g. `2026-10-31` |
| `homeValueChange1y` | number \| null | 1-year change as a fraction, e.g. `-0.0209` = -2.1% |
| `stateHomeValue` / `countyHomeValue` / `nationalHomeValue` | number \| null | typical home value of the parent state, county and the US |
| `forSaleInventory` | number \| null | homes for sale |
| `newListings` | number \| null | new listings in the month |
| `medianListPrice` | number \| null | median list price |
| `medianDaysToPending` | number \| null | median days until a listing goes pending |
| `listingsDate` | string \| null | month of the listing figures |
| `medianSalePrice` | number \| null | median sale price |
| `medianSaleToListRatio` | number \| null | e.g. `0.991` = sold at 99.1% of list price |
| `soldAboveListShare` / `soldBelowListShare` | number \| null | share of sales above / below list price, e.g. `0.23` |
| `salesDate` | string \| null | month of the sale figures |
| `averageRent` | number \| null | typical rent (Zillow Observed Rent Index), USD per month |
| `nationalAverageRent` | number \| null | same for the US |
| `homeValueHistory[]` | array | `date`, `value`: monthly home value, newest first (100 months) |
| `rentHistory[]` | array \| null | `date`, `rent`: monthly rent, newest first |
| `nearbyRegions[]` | array | `regionId`, `name`, `homeValue`, `url` of nearby neighborhoods or cities |

Full example: [sample-output.json](sample-output.json) (Denver, CO; histories shortened to 3 months).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/zillow-home-values@1" \
  --data-urlencode "target_url=https://www.zillow.com/home-values/11093/denver-co/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/zillow-home-values@1` on the Denver home values page and its nearby regions, and make a
> table of each region's typical home value and 1-year change.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Whole dollars:** values are cut to whole dollars (Zillow publishes them with decimals); ratios and shares
  are fractions, not percentages.
- **Not every region has every figure:** neighborhoods often have no rent data (`averageRent` and
  `rentHistory` are `null`), and `state` / `county` are only filled on city and ZIP pages. A nearby region
  can have no `homeValue`.
- **Monthly data:** Zillow updates these figures once a month; sale figures lag one month behind listings.
- **No home value = failed request:** a page without the market data (a bot check, an unknown region) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US only:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; embedded page JSON)
- [`sample-output.json`](sample-output.json): output on a real home values page
