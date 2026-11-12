# Booking.com Hotel Scraper (property page)

Turn a Booking.com property page into JSON: hotel id, name, star class, guest review score, score word and
reviews count, review subscores (cleanliness, comfort, facilities, location, staff, value for money, free WiFi),
location score, address, coordinates, description, most popular facilities, check-in and check-out times, house
rules and the main photo. Good for hotel research, competitor monitoring and travel apps. Property links come
from the [Booking.com Search Scraper](../booking-search-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/booking-hotel](https://extracthub.io/extractor/@extracthub1/booking-hotel)
**Extractor id:** `@extracthub1/booking-hotel@1` · **Price:** $0.0025 per page

## Input

A Booking.com property page:

```
https://www.booking.com/hotel/<country-code>/<property-name>.html
```

e.g. `https://www.booking.com/hotel/id/novotel-bali-ngurah-rai-airport-opening-june-2016.html`.

## Output

| Field | Type | Description |
|---|---|---|
| `hotelId` | string | Booking.com property id, e.g. `1527745` |
| `name` | string | e.g. `Novotel Bali Ngurah Rai Airport` |
| `stars` | number \| null | star class, e.g. `4` (`0` or `null` when not rated) |
| `reviewScore` | number \| null | guest review score (1 to 10), e.g. `8.7` |
| `reviewScoreWord` | string \| null | e.g. `Excellent`, `Very Good` |
| `reviewCount` | number \| null | number of reviews, e.g. `3945` |
| `subscores[]` | array | category scores: `{ name, score }`, e.g. `{ "name": "Cleanliness", "score": 9.1 }` |
| `locationScore` | number \| null | location score from the header, e.g. `9.6` |
| `address` | string \| null | e.g. `Jalan Raya Ngurah Rai, Tuban, 80362 Kuta, Indonesia` |
| `region` | string \| null | e.g. `Bali` |
| `postalCode` | string \| null | e.g. `80362` |
| `country` | string \| null | e.g. `Indonesia` |
| `latitude` | number \| null | e.g. `-8.746722` |
| `longitude` | number \| null | e.g. `115.166776` |
| `description` | string \| null | the property's description |
| `popularFacilities[]` | string[] | e.g. `Outdoor swimming pool`, `Fitness center`, `Bar` |
| `checkIn` | string \| null | check-in time and note, e.g. `From 2:00 PM Guests are required to show a photo ID ...` |
| `checkOut` | string \| null | e.g. `Until 12:00 PM` |
| `policies[]` | string[] | every house rule as one text: check-in, check-out, cancellation, children and beds, age, pets, groups, payment methods |
| `image` | string \| null | main photo |
| `url` | string | property link |

Full example: [sample-output.json](sample-output.json) (Novotel Bali Ngurah Rai Airport; policies shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/booking-hotel@1" \
  --data-urlencode "target_url=https://www.booking.com/hotel/id/novotel-bali-ngurah-rai-airport-opening-june-2016.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/booking-hotel@1` on these Booking.com hotel links and make a table of name, stars, review
> score, cleanliness and location subscores, check-in time and whether pets are allowed.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** name, scores and address come from the schema.org data in the HTML Booking.com sends; the
  rest from the page itself. No browser is needed.
- **No room prices:** the property page without dates lists no prices. Use the
  [Booking.com Search Scraper](../booking-search-scraper/) with `checkin` / `checkout` for prices.
- **Policies are texts:** Booking.com writes house rules as free text, so each rule is one string starting with
  its title (`Pets Pets are not allowed.`); `checkIn` and `checkOut` are those two rules without the title.
- **Subscores order:** Booking.com orders the categories differently per property; match them by `name`.
- **Reviews:** only the totals and subscores are extracted; individual reviews and reviewer names are not.
- **US view:** fetched through a US proxy, so texts are in English and distances in miles.
- **Removed properties / bot checks:** a page without hotel id, name or link fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real property page
