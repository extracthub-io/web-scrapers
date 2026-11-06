# Zillow Search Scraper (homes for sale list)

Turn a Zillow search page into JSON: the total number of homes for sale, pages, the next page link, and all
41 listings on the page with address, price, bedrooms, floor size, coordinates, photo and listing link. Good
for market snapshots, lead lists and feeding the [Zillow Property Scraper](../zillow-property-scraper/) with
listing URLs.

**Catalog:** [extracthub.io/extractor/@extracthub1/zillow-search](https://extracthub.io/extractor/@extracthub1/zillow-search)
**Extractor id:** `@extracthub1/zillow-search@1` · **Price:** $0.0025 per page

## Input

A Zillow "for sale" search page for a city, ZIP code or neighborhood:

```
https://www.zillow.com/denver-co/
https://www.zillow.com/denver-co/2_p/          page 2
https://www.zillow.com/homes/for_sale/10001_rb/  ZIP code
```

## Output

| Field | Type | Description |
|---|---|---|
| `searchTitle` | string \| null | e.g. `Denver CO Real Estate & Homes For Sale` |
| `totalResults` | number \| null | homes for sale matching the search |
| `resultsPerPage` | number \| null | listings per page (41) |
| `totalPages` | number \| null | number of pages Zillow shows (at most 20) |
| `nextPageUrl` | string \| null | the next page |
| `listings[]` | array | the listings on the page, in Zillow's order |

Each `listings[]` entry is a [schema.org](https://schema.org/RealEstateListing) `ListItem`, exactly as Zillow
publishes it for search engines:

| Path in a listing | Description |
|---|---|
| `position` | rank on the page (1 = first) |
| `item.url` | the listing page (input for the Zillow Property Scraper) |
| `item.name` | full address, e.g. `5130 E 1st Avenue, Denver, CO 80220` |
| `item.image` | main photo |
| `item.offers.price` / `item.offers.priceCurrency` | list price, e.g. `2249000` / `USD` |
| `item.offers.itemOffered["@type"]` | `SingleFamilyResidence` or `Apartment` |
| `item.offers.itemOffered.numberOfBedrooms` | bedrooms |
| `item.offers.itemOffered.floorSize.value` | living area in sq ft (missing on some listings) |
| `item.offers.itemOffered.address` | `streetAddress`, `addressLocality`, `addressRegion`, `postalCode` |
| `item.offers.itemOffered.geo` | `latitude`, `longitude` |

The zpid (Zillow property id) is the number before `_zpid` in `item.url`.

Full example: [sample-output.json](sample-output.json) (Denver, CO; shortened to 3 listings).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/zillow-search@1" \
  --data-urlencode "target_url=https://www.zillow.com/denver-co/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/zillow-search@1` on zillow.com/austin-tx and make a table of the 10 cheapest listings with
> address, price, bedrooms and floor size.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Bathrooms, status, days on market and Zestimate are not in the list.** Zillow keeps them in data the
  extractor cannot read without a browser. Run the [Zillow Property Scraper](../zillow-property-scraper/) on
  `item.url` for the full details.
- **Up to 20 pages (820 listings) per search:** Zillow stops there. For more coverage, split the search by ZIP
  code or neighborhood.
- **No listings = failed request:** a page without the listing data (a bot check, a search with no results)
  fails with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; JSON-LD and embedded page JSON)
- [`sample-output.json`](sample-output.json): output on a real search page
