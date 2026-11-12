# Booking.com Search Scraper (hotel search results)

Turn a Booking.com search results page into JSON: for every property in the page HTML (about 15 to 20) its name,
link, photo, area, review score, score word and reviews count, the recommended room and beds, the price per
night, the total price for the stay, the original price and deal badge when discounted, and free cancellation,
plus the number of properties found. Good for hotel price monitoring, travel market research and finding
property links for the [Booking.com Hotel Scraper](../booking-hotel-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/booking-search](https://extracthub.io/extractor/@extracthub1/booking-search)
**Extractor id:** `@extracthub1/booking-search@1` · **Price:** $0.0025 per page

## Input

A Booking.com search page, with dates for prices:

```
https://www.booking.com/searchresults.html?ss=<destination>&checkin=<YYYY-MM-DD>&checkout=<YYYY-MM-DD>&group_adults=2&no_rooms=1
https://www.booking.com/searchresults.html?ss=<destination>&checkin=...&checkout=...&offset=25
```

e.g. `https://www.booking.com/searchresults.html?ss=Bali&checkin=2026-12-14&checkout=2026-12-15&group_adults=2&no_rooms=1`.

## Output

| Field | Type | Description |
|---|---|---|
| `totalResults` | number \| null | properties found, e.g. `14239` |
| `properties[]` | array | the properties on the page, in page order |
| `properties[].position` | number | position on the page (1 = first) |
| `properties[].name` | string | e.g. `Manggar Indonesia Hotel` |
| `properties[].url` | string \| null | property page, without tracking or date parameters |
| `properties[].image` | string \| null | photo (240 px) |
| `properties[].area` | string \| null | neighborhood and town, e.g. `Kartika Plaza, Kuta (Kartika Plaza)` |
| `properties[].reviewScore` | number \| null | guest review score (1 to 10), e.g. `8.6` |
| `properties[].reviewScoreWord` | string \| null | e.g. `Excellent`, `Very Good` |
| `properties[].reviewCount` | number \| null | number of reviews, e.g. `2463` |
| `properties[].roomName` | string \| null | recommended room for the search, e.g. `Deluxe Double Room` |
| `properties[].beds` | string \| null | beds (or unit layout for apartments), e.g. `1 queen bed` |
| `properties[].pricePerNight` | number \| null | the "Per night" price shown on the card, e.g. `12` |
| `properties[].price` | number \| null | the main price shown for the whole stay, e.g. `14` |
| `properties[].priceText` | string \| null | that price as shown, e.g. `$14` |
| `properties[].originalPrice` | number \| null | struck-through price when discounted, e.g. `41` |
| `properties[].stay` | string \| null | what the price covers, e.g. `1 night, 2 adults` |
| `properties[].deal` | string \| null | deal badge, e.g. `Limited-time Deal`, `Late Escape Deal` |
| `properties[].freeCancellation` | boolean | `true` when the recommended room has free cancellation |

Full example: [sample-output.json](sample-output.json) (Bali, 1 night for 2 adults; shortened to 3 properties).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/booking-search@1" \
  --data-urlencode "target_url=https://www.booking.com/searchresults.html?ss=Bali&checkin=2026-12-14&checkout=2026-12-15&group_adults=2&no_rooms=1"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/booking-search@1` on booking.com searches for Lisbon for 2 adults on the next three
> weekends and compare the cheapest properties with a review score of 8 or more.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch, 15 to 20 per page:** the cards come from the HTML Booking.com sends, no browser needed. A
  Booking.com result page has 25 properties, but its HTML holds only the first 15 to 20 (the rest load while
  scrolling). `offset=25`, `offset=50`, ... give the following pages.
- **Add dates:** without `checkin` / `checkout` Booking.com shows no prices, and the price fields are `null`.
- **Two prices:** `pricePerNight` is the small "Per night" figure and `price` the large figure for the whole
  stay in `stay`; on some cards they differ for a 1-night stay (Booking.com shows them that way).
- **US view, USD:** fetched through a US proxy, so prices are in US dollars and texts in English.
- **Results change:** order, prices and deals differ between requests and dates, like in a browser.
- **No properties = failed request:** a page without property cards (a bot check, an unknown destination)
  fails with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page
