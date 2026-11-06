# Google Maps Place Scraper (place details)

Turn a Google Maps place page into JSON: name, category, rating, review count, full address, phone, website,
Plus Code, opening status and weekly hours, description, place ID, coordinates and the top reviews on the
page. Pairs with the [Google Maps Scraper](../google-maps-scraper/): search first, then fetch the details of
every place it found (its `placeUrl`), for complete lead lists with phone and website.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-maps-place](https://extracthub.io/extractor/@extracthub1/google-maps-place)
**Extractor id:** `@extracthub1/google-maps-place@1` · **Price:** $0.0035 per place (JavaScript tier)

## Input

A Google Maps place URL, best the `placeUrl` from `@extracthub1/google-maps-search`:

```
https://www.google.com/maps/place/<name>/data=!4m7!3m6!1s0x...:0x...!8m2!3d<lat>!4d<lng>!16s...!19sChIJ...?hl=en&gl=us
```

Add `hl=en&gl=us` to get English labels and US number formats (without `gl=us`, phones come as
`+1 720-670-6361` and addresses end with `, United States`).

A Maps search URL that opens one place directly (`/maps/search/<name and address>`) also works, but then
`placeId`, `cid`, `kgmid`, `latitude` and `longitude` are `null`: they are read from the place URL.

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | place name |
| `category` | string \| null | main category, e.g. `Plumber`, `Coffee shop` (`null` for hotels) |
| `hotelClass` | number \| null | hotels: star class, e.g. `5` for "5-star hotel" |
| `rating` | number \| null | average star rating (1 to 5) |
| `reviewCount` | number \| null | exact number of reviews |
| `address` | string \| null | full address, e.g. `2525 W 6th Ave, Denver, CO 80204` |
| `phone` | string \| null | phone number as shown, e.g. `(303) 758-6237` |
| `phoneInternational` | string \| null | phone in international format, e.g. `+13037586237` |
| `website` | string \| null | the business website (`utm_*`, `fbclid`, `gclid` removed) |
| `plusCode` | string \| null | Google Plus Code, e.g. `PXGJ+9M Denver, Colorado` |
| `openStatus` | string \| null | opening status at fetch time, e.g. `Open 24 hours`, `Open · Closes 10 PM` |
| `hours[]` | array | weekly opening hours, starting with today: `{ "day": "Thursday", "hours": "7 AM to 6 PM" }`; empty when the page doesn't show the table (see below) |
| `description` | string \| null | Google's short description of the place |
| `placeId` | string \| null | Google place ID (`ChIJ...`), usable with the Google Places API |
| `cid` | string \| null | Google Maps feature ID, e.g. `0x876c7951ce5b075d:0x5224a0bd2f50c28a` |
| `kgmid` | string \| null | Google knowledge-graph ID, e.g. `/g/1tfw3jh7`. The `/g/` (or `/m/` for older IDs) prefix is part of the ID; open the business panel with `https://www.google.com/search?kgmid=/g/1tfw3jh7` |
| `latitude`, `longitude` | number \| null | coordinates of the place |
| `topReviews[]` | array | the (up to 3) reviews shown on the place page: `author`, `rating` (1 to 5), `date` (relative, e.g. `2 months ago`), `text` (Google cuts long ones with `…`) |

Full example: [sample-output.json](sample-output.json) (a coffee shop in Austin, TX; `topReviews` left out of
this file because it holds reviewers' names).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-maps-place@1" \
  --data-urlencode "target_url=https://www.google.com/maps/place/Epoch+Coffee/data=!4m7!3m6!1s0x8644ca6bc309e81b:0x1f1a903bbb66839!8m2!3d30.3186037!4d-97.7245402!16s%2Fg%2F1v76_180!19sChIJG-gJw2vKRIYROWi2uwOp8QE?hl=en&gl=us"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-maps-search@1` to find plumbers in Denver, CO, then `@extracthub1/google-maps-place@1`
> on each `placeUrl`, and give me a table of name, phone, website, address and rating.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Two page layouts:** Google Maps sometimes folds the weekly hours into one "Open · Closes 10 PM" line. Then
  `openStatus` holds that line and `hours` is empty.
- **Hotels:** `category` is `null` and `hotelClass` holds the stars; hotel pages show no opening hours or
  reviews in this view. Room prices are not included.
- **No place = failed request:** if the page has no place name (a bot check, or a URL that doesn't open one
  place), the call fails with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **Fetched from a US location** (`proxyCountry: US`), so places anywhere in the world work, with labels in
  the language of `hl`.
- **Reviews are personal data:** reviewer names and texts belong to their authors. Process them only where
  you have a right to.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real place page
