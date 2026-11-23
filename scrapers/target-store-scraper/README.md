# Target Store Scraper (store locator page)

Turn a Target (target.com) store page into JSON with the store's details:
- **Store details:** store id, name, status, opening message, full address with county, coordinates, phone, time zone and building area.
- **Hours:** store hours for the next 7 days, including holiday closures, and today's department hours (CVS pharmacy, Starbucks, Target Optical, wine and beer).
- **Services:** pickup and delivery options, store features (EV Charging, Accepts WIC, ...) and a map link.

Good for store locators, retail location datasets and holiday-hours checks.

**Catalog:** [extracthub.io/extractor/@extracthub1/target-store](https://extracthub.io/extractor/@extracthub1/target-store)
**Extractor id:** `@extracthub1/target-store@1` · **Price:** $0.0035 per page

## Input

A Target store page:

```
https://www.target.com/sl/<store-slug>/<store-id>
```

e.g. `https://www.target.com/sl/alameda/2829`. The store id is what counts: Target opens the right store even when
the slug is wrong. Store links per state are on `https://www.target.com/store-locator/store-directory/<state>`.

## Output

| Field | Type | Description |
|---|---|---|
| `storeId` | string | e.g. `2829` |
| `name` | string | e.g. `Target Alameda` |
| `locationName` | string \| null | e.g. `Alameda` |
| `status` | string \| null | store status, e.g. `Open` (the store operates; not "open right now") |
| `hoursMessage` | string \| null | as shown at fetch time, e.g. `Opens at 7am`, `Open until 11pm` |
| `street` | string \| null | e.g. `2700 Fifth Street` |
| `city` | string \| null | e.g. `Alameda` |
| `county` | string \| null | e.g. `Alameda` |
| `state` | string \| null | e.g. `California` |
| `stateCode` | string \| null | e.g. `CA` |
| `postalCode` | string \| null | e.g. `94501-6574` |
| `phone` | string \| null | e.g. `510-214-0931` |
| `latitude`, `longitude` | number \| null | e.g. `37.788701`, `-122.280262` |
| `timeZone` | string \| null | e.g. `America/Los_Angeles` |
| `buildingAreaSqFt` | number \| null | building area in square feet, e.g. `140194` |
| `hours[]` | array | the next 7 days: `date` (e.g. `Thursday, November 26`) and `hours` (e.g. `7am open • 10pm close`, `Closed`) |
| `departmentHours[]` | array | today's hours per department: `name`, `hours` (a pharmacy lunch break gives two ranges) |
| `fulfillment[]` | array | `name` (e.g. `Order Pickup`, `Drive Up`, `Same Day Delivery`) and `description` |
| `features[]` | array | store features and services: `name` (e.g. `CVS pharmacy`, `EV Charging`), `url` (`null` when not linked) |
| `mapUrl` | string \| null | Google Maps link to the address |
| `pageUrl` | string \| null | canonical store page |

Full example: [sample-output.json](sample-output.json) (Target Alameda, store 2829).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/target-store@1" \
  --data-urlencode "target_url=https://www.target.com/sl/alameda/2829"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/target-store@1` on these Target store pages and tell me which stores are closed on
> Thanksgiving and which have a CVS pharmacy.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Browser needed:** the page streams some of its sections in, and the store features land in a random order
  without a browser. This extractor uses JavaScript rendering through a US proxy. Address, coordinates, phone and
  time zone come from the page's embedded store data.
- **Hours are relative to the fetch:** `hours` starts at the store's current day and holds dates without the year;
  `departmentHours` and `hoursMessage` are for the day of the fetch.
- **Features differ per store:** a store without Target Optical or EV charging simply has fewer `features`.
- **Business data only:** the page holds the store's public contact details, no staff names.
- **Tested** on 4 stores (Alameda, Anaheim Hills, Albany, Bakersfield NE).

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real store page
