# Booking.com Reviews Scraper (guest reviews of a property)

Turn a Booking.com property page into its guest reviews as JSON: the first 10 reviews of the page's review list
(Booking.com's "Most relevant" order) with guest first name and country, room, nights, stay month, traveler type,
review date, title, score, what the guest liked and disliked and the start of the property's reply, plus the
hotel id, name, overall review score and review count. Good for review monitoring, sentiment analysis and hotel
research. Property links come from the [Booking.com Search Scraper](../booking-search-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/booking-hotel-reviews](https://extracthub.io/extractor/@extracthub1/booking-hotel-reviews)
**Extractor id:** `@extracthub1/booking-hotel-reviews@1` · **Price:** $0.0035 per page (JavaScript rendering)

## Input

A Booking.com property page, the same link as for the [Booking.com Hotel Scraper](../booking-hotel-scraper/):

```
https://www.booking.com/hotel/<country-code>/<property-name>.html
```

e.g. `https://www.booking.com/hotel/us/hyatt-place-new-york-city-times-square.html`. Extra parameters and a
`#tab-reviews` ending work too.

## Output

| Field | Type | Description |
|---|---|---|
| `hotelId` | string | Booking.com property id, e.g. `5218600` |
| `name` | string \| null | e.g. `Hyatt Place New York City - Times Square` |
| `reviewScore` | number | overall guest score, e.g. `7.8` |
| `reviewCount` | number \| null | number of reviews, e.g. `16309` |
| `reviews[]` | array | the first 10 reviews of the review list |

Each `reviews[]` entry:

| Field | Description |
|---|---|
| `guestName` | first name as shown by Booking.com (or `Anonymous`) |
| `guestCountry` | e.g. `United Kingdom` |
| `roomType` | booked room, e.g. `Standard King Room with Sofa Bed` |
| `nights` | nights stayed, e.g. `2` |
| `stayMonth` | month of the stay, e.g. `November 2026` |
| `travelerType` | `Couple`, `Family`, `Solo traveler`, `Group`, `Business traveler`... |
| `reviewDate` | e.g. `November 24, 2026` |
| `title` | review title |
| `score` | guest score, 1 to 10 |
| `liked`, `disliked` | the two review texts; `null` when the guest left one empty |
| `propertyReply` | the start of the property's answer (Booking.com shows it cut, ending in `...`); `null` without one |

Full example: [sample-output.json](sample-output.json) (shortened to 3 reviews; guest names as initials).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/booking-hotel-reviews@1" \
  --data-urlencode "target_url=https://www.booking.com/hotel/us/hyatt-place-new-york-city-times-square.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/booking-hotel-reviews@1` on these 15 Booking.com hotels and list for each the 3 most common
> complaints in the reviews.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **How it works:** the property page has no review list in its HTML, only 10 short "featured" reviews. The
  extractor renders the page in a browser, clicks the "Guest reviews" tab and reads the review list that opens.
- **Only the first 10 reviews, in Booking.com's default order.** Other pages, sorting and filters are not
  reachable from the page link. The list loads through Booking.com's review API, but the browser's captured
  requests stop before it, so it cannot be read that way.
- **A page where the review list did not open** fails with HTTP 422 `required_fields_missing` (no `reviewScore`)
  and is still charged; batches retry it once. A property without reviews fails the same way.
- **Fragile part:** the guest country is read from the reviewer block without a dedicated hook. All other fields
  use Booking.com's `data-testid` hooks.
- **Personal data:** review texts and first names are public on Booking.com; avatars are not extracted.
- **US view:** fetched through a US proxy, labels in English.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering with browser actions through a US proxy)
- [`sample-output.json`](sample-output.json): output on the example page
