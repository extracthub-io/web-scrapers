# Realtor.com Property Scraper (home details)

Turn a Realtor.com property page into JSON: property and listing id, status, address, county, neighborhoods,
coordinates, list price, price per sq ft, last price change, value estimates, property type, beds, baths, sq ft,
lot size, year built, stories, garage, HOA fee, tax rate and annual tax, list date, days on MLS, last sale, status
flags (price reduced, pending, foreclosure, short sale, ...), description, tags, every detail section of the page
(interior, exterior, HOA, schools, utilities, ...), listing agent and brokerage, MLS and photos. Good for
property research, comps and investment analysis. Property links come from the
[Realtor.com Search Scraper](../realtor-search-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/realtor-property](https://extracthub.io/extractor/@extracthub1/realtor-property)
**Extractor id:** `@extracthub1/realtor-property@1` · **Price:** $0.0025 per page

## Input

A Realtor.com property page:

```
https://www.realtor.com/realestateandhomes-detail/<address-slug>_M<property-id>
```

e.g. `https://www.realtor.com/realestateandhomes-detail/1704-Shelbourne-Dr_Austin_TX_78752_M81029-30727`.

## Output

| Field | Type | Description |
|---|---|---|
| `propertyId` | string | Realtor.com property id, e.g. `8102930727` |
| `listingId` | string \| null | current listing id, e.g. `2991781467` |
| `url` | string | property link |
| `status` | string \| null | `for_sale`, `pending`, `sold`, `off_market`, ... |
| `address` | string | street line, e.g. `1704 Shelbourne Dr` |
| `city` / `state` / `postalCode` | string \| null | e.g. `Austin`, `TX`, `78752` |
| `county` | string \| null | e.g. `Travis` |
| `neighborhoods[]` | string[] | e.g. `Creekside`, `Coronado Hills`, `East Austin` |
| `latitude` / `longitude` | number \| null | e.g. `30.327864`, `-97.683779` |
| `price` | number \| null | list price, e.g. `400000` |
| `pricePerSqft` | number \| null | e.g. `257` |
| `lastPriceChange` | number \| null | last price change in USD (negative = reduced), e.g. `5000` |
| `estimates[]` | array | value estimates `{ estimate, isBest }`, e.g. `{ "estimate": 391000, "isBest": true }` |
| `propertyType` | string \| null | e.g. `single_family`, `condos`, `townhomes`, `land` |
| `beds` | number \| null | e.g. `3` |
| `baths` | number \| null | e.g. `2`, `2.5` |
| `bathsFull` / `bathsHalf` | number \| null | e.g. `2`, `null` |
| `sqft` | number \| null | living area, e.g. `1556` |
| `lotSqft` | number \| null | lot size, e.g. `9561` |
| `yearBuilt` | number \| null | e.g. `1969` |
| `stories` | number \| null | e.g. `1` |
| `garage` | number \| null | garage spaces, e.g. `2` |
| `hoaFee` | number \| null | monthly HOA fee, e.g. `0` |
| `propertyTaxRate` | number \| null | e.g. `0.030605` |
| `taxAmount` | number \| null | annual tax from the MLS, e.g. `12242` |
| `listDate` | string \| null | e.g. `2026-02-21T14:21:38Z` |
| `daysOnMls` | number \| null | e.g. `238` |
| `lastUpdated` | string \| null | last MLS update, e.g. `2026-11-03T13:04:11Z` |
| `lastSoldDate` | string \| null | e.g. `2022-10-21` |
| `lastSoldPrice` | number \| null | null where the state hides sale prices (e.g. Texas) |
| `flags` | object | `{ isNewListing, isPriceReduced, isPending, isContingent, isComingSoon, isForeclosure, isShortSale, isNewConstruction }` (`true` or null) |
| `description` | string \| null | the listing remarks |
| `tags[]` | string[] | e.g. `Private Swimming Pool`, `Open concept living` |
| `details[]` | array | every detail section: `{ category, group, features[] }`, e.g. `{ "category": "School Information", "group": "Community", "features": ["Elementary School: Andrews", ...] }` |
| `listingAgent` | string \| null | listing agent's name |
| `brokerage` | string \| null | e.g. `eXp Realty, LLC` |
| `mlsName` | string \| null | e.g. `UnlockMLS` |
| `mlsListingId` | string \| null | MLS number, e.g. `3401964` |
| `photoCount` | number \| null | e.g. `38` |
| `photos[]` | string[] | photo links |

Full example: [sample-output.json](sample-output.json) (1704 Shelbourne Dr, Austin, TX; details and photos
shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/realtor-property@1" \
  --data-urlencode "target_url=https://www.realtor.com/realestateandhomes-detail/1704-Shelbourne-Dr_Austin_TX_78752_M81029-30727"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/realtor-property@1` on these Realtor.com homes and compare price, price per sq ft, the best
> value estimate, year built, lot size, annual tax and the elementary school.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything comes from the property data Realtor.com embeds in the page HTML
  (`__NEXT_DATA__`). No browser is needed.
- **Details are MLS texts:** `details[].features` are the lines the page shows (`Garage Spaces: 2`); their
  wording differs per MLS and region.
- **Estimates:** Realtor.com shows up to three value estimates from different providers; `isBest` marks the
  one it shows first. Provider names are not in the page.
- **Sale prices:** in non-disclosure states (e.g. Texas) `lastSoldPrice` stays null.
- **Contacts:** only the listing agent's name and the brokerage are extracted, no emails or phone numbers. The
  MLS detail lines can contain a public HOA office phone.
- **US view:** fetched through a US proxy.
- **Removed homes / bot checks:** a page without property id, link or address fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real property page
