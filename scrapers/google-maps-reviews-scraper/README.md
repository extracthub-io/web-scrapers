# Google Maps Reviews Scraper (reviews of a place)

Turn the Reviews tab of a Google Maps place into JSON: the reviews Google shows without sign-in (5 on most
places, up to 13 on some) in its "Most relevant" order, each with review id, author, rating, date, full text,
language, detail ratings, photos and the owner's reply, plus the place name, average rating, review count, rating
distribution and review topics. Pairs with the [Google Maps Scraper](../google-maps-scraper/) and the
[Google Maps Place Scraper](../google-maps-place-scraper/): both return the link this extractor needs as `placeReviewsUrl`.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-maps-reviews](https://extracthub.io/extractor/@extracthub1/google-maps-reviews)
**Extractor id:** `@extracthub1/google-maps-reviews@1` · **Price:** $0.0035 per place (JavaScript tier)

## Input

The place's reviews link: the `placeReviewsUrl` of the Google Maps search (1.2.0+) or place (1.1.0+) extractor. It is built from the place's `cid` (`0x...:0x...`):

```
https://www.google.com/maps/place/data=!4m4!3m3!1s<cid>!9m1!1b1?hl=en&gl=us
```

e.g. `https://www.google.com/maps/place/data=!4m4!3m3!1s0x8644ca6bc309e81b:0x1f1a903bbb66839!9m1!1b1?hl=en&gl=us`.

- `!9m1!1b1` opens the place on its Reviews tab. A browser click on that tab does not work in the rendering
  browser, so the link has to carry it.
- Keep `hl=en`: the average `rating` is read as an English number (`4.6`; with `hl=id` the page shows `4,6`).
- A normal place link (the `placeUrl` of the search extractor) also works, but returns only the 3 reviews of the
  Overview tab.

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | place name |
| `rating` | number \| null | average star rating (1 to 5) |
| `reviewCount` | number \| null | exact number of reviews |
| `ratingDistribution` | object | reviews per star: `{ stars5, stars4, stars3, stars2, stars1 }` |
| `topics[]` | array | topics Google found in the reviews: `{ name, mentions }`, e.g. `{ "name": "outdoor seating", "mentions": 71 }`; empty on hotels and landmarks |
| `reviews[]` | array | the reviews, see below |

Each `reviews[]` entry:

| Field | Description |
|---|---|
| `reviewId` | Google's review id |
| `author` | reviewer's display name |
| `authorInfo` | e.g. `Local Guide · 165 reviews · 705 photos`; `null` when Google shows none |
| `rating` | 1 to 5 (hotel reviews from other sites can have decimals, e.g. `4.7`) |
| `date` | relative date as shown, e.g. `4 weeks ago`, `Edited 2 months ago` |
| `source` | hotels only: where the review comes from (`Google`, `Tripadvisor`, `Trip.com`); `null` elsewhere (all Google) |
| `text` | the full review text; `null` for a rating without text |
| `language` | language of the text, e.g. `en` |
| `details[]` | extra answers as text lines, e.g. `Food: 4`, `Service: 5`, `Noise level Moderate noise`, `Trip type Vacation` |
| `photos[]` | links of the photos shown on the review (up to 4) |
| `ownerReply`, `ownerReplyDate` | the owner's response and its relative date; `null` without one |

Full example: [sample-output.json](sample-output.json) (a coffee shop in Austin, TX; shortened to 2 reviews and 4
topics, reviewer names as initials).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-maps-reviews@1" \
  --data-urlencode "target_url=https://www.google.com/maps/place/data=!4m4!3m3!1s0x8644ca6bc309e81b:0x1f1a903bbb66839!9m1!1b1?hl=en&gl=us"
```

Pipeline from a Maps search, one call per place found:

```json
"steps": [
  { "extractor_id": "@extracthub1/google-maps-search@1", "url_output_field": "places[].placeReviewsUrl" },
  { "extractor_id": "@extracthub1/google-maps-reviews@1" }
]
```

## Good to know

- **Only the reviews Google shows without sign-in.** Signed-out visitors get a "limited view" of Google Maps: the
  Reviews tab ends with "See more reviews", which asks to sign in. The extractor does not sign in, so it returns
  what is on the page: 5 reviews on most places, 13 on some. Sorting (newest, highest, lowest) and searching
  reviews cannot be chosen from the link.
- **Full texts:** long reviews and owner replies are cut by Google behind a "More" button; the extractor clicks
  up to 26 of them. Now and then a run returns the cut texts (ending in `…`): run it again.
- **Hotels** mix Google reviews with reviews from Tripadvisor, Trip.com and others (`source`); those are cut by
  Google (they link to the other site) and have no `authorInfo`.
- **Auto-translation:** with another `hl`, Google translates review texts into that language.
- **No reviews on the page** (a place without reviews, or the list did not load) fails with HTTP 422
  `required_fields_missing` and is still charged; batches retry it once.
- **Fragile:** all selectors are Google's generated class names (`jftiEf`, `wiI7pd`, `MyEned`...); they may need a
  fix when Google changes its layout.
- **Personal data:** reviewer names and texts are public on Google Maps; profile links and avatars are not
  extracted.
- **US view:** fetched through a US proxy.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering with browser actions through a US proxy)
- [`sample-output.json`](sample-output.json): output on the example link
