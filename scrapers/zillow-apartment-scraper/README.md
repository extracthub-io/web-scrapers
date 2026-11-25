# Zillow Apartment Scraper (rental building)

Turn a Zillow apartment building page into JSON: building name, address, coordinates, leasing office phone,
unit counts, current special offer, description, office hours, pet policies with fees, amenities, walk /
transit / bike scores, photos, every floor plan with its rent range and the available units in it, and the
assigned schools. Good for rent comparisons, lead lists of rental communities and tracking specials.

**Catalog:** [extracthub.io/extractor/@extracthub1/zillow-apartment](https://extracthub.io/extractor/@extracthub1/zillow-apartment)
**Extractor id:** `@extracthub1/zillow-apartment@1` · **Price:** $0.0025 per page

## Input

A Zillow apartment building page (`/apartments/<city>/<name>/<id>/`), e.g.
`https://www.zillow.com/apartments/denver-co/one-city-block/5XqvWd/`.

The [Zillow Search Scraper](../zillow-search-scraper/) on a rentals search (`https://www.zillow.com/denver-co/rentals/`)
lists these building URLs in `listings[].item.url`.

## Output

| Field | Type | Description |
|---|---|---|
| `buildingId` | string | Zillow building (lot) id, e.g. `1002123433` |
| `name` | string | e.g. `One City Block` |
| `url` | string \| null | the building page |
| `fullAddress`, `streetAddress`, `city`, `state`, `zipcode`, `neighborhood`, `county` | string \| null | address parts |
| `latitude` / `longitude` | number \| null | coordinates |
| `phone` | string \| null | leasing office phone |
| `buildingType` | string \| null | e.g. `FOR_RENT` |
| `homeTypes` | string[] \| null | e.g. `["apartment"]` |
| `unitCount` / `availableUnitCount` | number \| null | listed units / available units |
| `buildingDetails` | string[] \| null | e.g. `["302 units", "4 stories", "built in 2013"]` |
| `specialOffer` | string \| null | current move-in special |
| `description` | string \| null | building description |
| `officeHours` | string[] \| null | e.g. `Mon - Fri: 10:00AM - 6:00PM` |
| `pets` | string[] \| null | allowed pets, e.g. `Cats`, `Large dogs` |
| `petPolicies[]` | array \| null | `petType`, `allowed`, `deposit`, `monthlyFee`, `oneTimeFee`, `maxWeight`, `comment` |
| `amenities` | string[] \| null | building and unit amenities as listed |
| `unitAmenities` | string[] \| null | amenities in every unit, e.g. `Washer`, `Dryer` |
| `incomeToRent` | string \| null | income requirement, e.g. `2x` |
| `walkScore` / `transitScore` / `bikeScore` | number \| null | 0-100 |
| `neighborhoodMedianRent` | number \| null | median rent in the neighborhood, USD per month |
| `photoCount` | number \| null | number of photos |
| `photos[]` | array | `url` (1024 px), `roomType` |
| `floorPlans[]` | array \| null | `name`, `beds`, `baths`, `sqft`, `minPrice`, `maxPrice`, `availableFrom`, `leaseTerm`, `deposit`, `units[]` |
| `floorPlans[].units[]` | array \| null | `unitNumber`, `price`, `sqft`, `availableFrom`, `zpid` |
| `units[]` | array \| null | buildings without floor plans: `unitNumber`, `beds`, `baths`, `sqft`, `price`, `availableFrom`, `zpid` |
| `schools[]` | array \| null | `name`, `level`, `grades`, `rating` (1-10), `distance` (miles), `type`, `link` |

Full example: [sample-output.json](sample-output.json) (One City Block, Denver; photos, floor plans and
amenities shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/zillow-apartment@1" \
  --data-urlencode "target_url=https://www.zillow.com/apartments/denver-co/one-city-block/5XqvWd/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/zillow-apartment@1` on One City Block in Denver and list every available studio and
> 1-bedroom unit with its rent, size and move-in date.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **`availableFrom` is a timestamp in milliseconds** (UTC midnight of the move-in date); `0` means no date is given (usually available now).
- **Floor plans or units:** most managed buildings group units in `floorPlans[]` (then `units` is `null`);
  smaller buildings list their units in `units[]` instead.
- **Prices are monthly rent in USD** as Zillow lists them; specials (weeks free) are not deducted.
- **Business contact only:** the leasing office phone; no personal contact details.
- **No building name = failed request:** a page without the building data (a bot check, a removed building)
  fails with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US only:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; embedded page JSON)
- [`sample-output.json`](sample-output.json): output on a real building page
