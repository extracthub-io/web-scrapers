# Airbnb Listing Scraper (room page)

Turn an Airbnb listing page into JSON: listing id, name, property and room type, guests / bedrooms / beds /
baths, location and neighborhood, coordinates, overall rating and reviews count, Guest favorite badge, category
ratings (cleanliness, accuracy, check-in, communication, location, value), highlights, description, host
(Superhost, verified, rating, reviews, years hosting, response rate and time), amenities by group, house rules,
safety and property notes and photos. Good for short-term rental market research, competitor tracking and travel
apps.

**Catalog:** [extracthub.io/extractor/@extracthub1/airbnb-listing](https://extracthub.io/extractor/@extracthub1/airbnb-listing)
**Extractor id:** `@extracthub1/airbnb-listing@1` · **Price:** $0.0025 per page

## Input

An Airbnb listing page:

```
https://www.airbnb.com/rooms/<listing-id>
```

e.g. `https://www.airbnb.com/rooms/7743405`.

## Output

| Field | Type | Description |
|---|---|---|
| `listingId` | string | Airbnb listing id, e.g. `7743405` |
| `name` | string | e.g. `Chiado Luxury Apartment` |
| `url` | string | canonical listing link |
| `propertyType` | string \| null | e.g. `Entire rental unit` |
| `roomType` | string \| null | `Entire home/apt`, `Private room`, `Shared room`, `Hotel room` |
| `headline` | string \| null | e.g. `Entire rental unit in Lisbon, Portugal` |
| `overview[]` | string[] | e.g. `6 guests`, `3 bedrooms`, `4 beds`, `2 baths` |
| `guests` | number \| null | maximum guests, e.g. `6` |
| `location` | string \| null | e.g. `Lisbon, Portugal` |
| `neighborhood` | string \| null | e.g. `São Paulo, Lisbon` |
| `latitude` | number \| null | approximate, e.g. `38.7107` |
| `longitude` | number \| null | approximate, e.g. `-9.1442` |
| `rating` | number \| null | overall rating (1 to 5), e.g. `4.99` |
| `reviewCount` | number \| null | e.g. `508` |
| `isGuestFavorite` | boolean \| null | Airbnb's Guest favorite badge |
| `categoryRatings[]` | array | `{ category, rating }`, e.g. `{ "category": "Cleanliness", "rating": 5 }` |
| `highlights[]` | string[] | e.g. `Top 5% of homes`, `In Chiado, Lisbon's historic center` |
| `description` | string \| null | the listing's summary |
| `host` | object | `{ name, isSuperhost, isVerified, rating, reviewCount, yearsHosting, monthsHosting }` |
| `hostResponseRate` | string \| null | e.g. `100%` |
| `hostResponseTime` | string \| null | e.g. `Responds within an hour` |
| `amenities[]` | array | `{ group, items[] }`, e.g. `{ "group": "Internet and office", "items": ["Fast wifi – 359 Mbps", "Dedicated workspace"] }` |
| `houseRules[]` | array | `{ rule, details }`, e.g. `{ "rule": "Quiet hours", "details": "9:00 PM - 8:00 AM" }` |
| `safetyAndProperty[]` | array | `{ group, items[] }`, e.g. safety devices, property info |
| `images[]` | string[] | first photos of the listing (about 8) |

Full example: [sample-output.json](sample-output.json) (Chiado Luxury Apartment; amenities and images shortened,
host name shortened to initials).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/airbnb-listing@1" \
  --data-urlencode "target_url=https://www.airbnb.com/rooms/7743405"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/airbnb-listing@1` on these Airbnb listings and make a table of name, bedrooms, rating,
> reviews count, cleanliness rating, Superhost and whether pets are allowed.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything comes from the listing data Airbnb embeds in the page HTML (plus its schema.org
  block for description and photos). No browser is needed.
- **No prices:** Airbnb loads nightly prices after the page, for chosen dates, even when `check_in` /
  `check_out` are in the URL. A JS-rendered test with dates still showed "Add dates for prices", so prices are
  not extracted.
- **Amenities:** grouped as Airbnb shows them in "What this place offers"; the group `Not included` lists what
  the place does NOT have (e.g. `Carbon monoxide alarm`).
- **Location:** coordinates are Airbnb's approximate map pin. `location` / `neighborhood` can be null on some
  responses; the coordinates are always there.
- **Host:** only the public host card (name, badges, stats); no contact details. Reviews and reviewer names are
  not extracted, only the rating totals.
- **US view:** fetched through a US proxy, so texts are in English.
- **Removed listings / bot checks:** a page without listing id, name or link fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real listing page
