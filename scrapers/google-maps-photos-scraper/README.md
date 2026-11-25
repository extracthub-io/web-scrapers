# Google Maps Photos Scraper (photos of a place)

Turn the photo gallery of a Google Maps place into JSON: the 10 photos and videos Google shows without sign-in,
each with its image link, a base link to request any size, a video flag and duration and its position, plus the
place name. Pairs with the [Google Maps Scraper](../google-maps-scraper/) and the
[Google Maps Place Scraper](../google-maps-place-scraper/): both return the link this extractor needs as `placePhotosUrl`.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-maps-photos](https://extracthub.io/extractor/@extracthub1/google-maps-photos)
**Extractor id:** `@extracthub1/google-maps-photos@1` · **Price:** $0.0035 per place (JavaScript tier)

## Input

The place's gallery link: the `placePhotosUrl` of the Google Maps search (1.2.0+) or place (1.1.0+) extractor. It is built from the place's `cid` (`0x...:0x...`):

```
https://www.google.com/maps/place/data=!4m3!3m2!1s<cid>!10e5?hl=en&gl=us
```

e.g. `https://www.google.com/maps/place/data=!4m3!3m2!1s0x8644ca6bc309e81b:0x1f1a903bbb66839!10e5?hl=en&gl=us`.

- `!10e5` opens the place's photo gallery. A normal place link has no gallery and fails with HTTP 422
  `required_fields_missing` (`photos`).
- Keep `hl=en`: `name` is read from the English gallery label ("Photos of ..."); with another language it is `null`.

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string \| null | place name |
| `photos[]` | array | the photos and videos of the gallery, in Google's order |

Each `photos[]` entry:

| Field | Description |
|---|---|
| `position` | 1-based position in the gallery |
| `image` | thumbnail link as shown, e.g. `https://lh3.googleusercontent.com/gps-cs-s/...=w203-h152-k-no` |
| `imageBase` | the link without its size suffix; append one of Google's image size suffixes to pick a size, e.g. `=w1600` or `=s0` (not checked by the extractor) |
| `isVideo` | `true` for a video (then `image` is its poster frame) |
| `videoDuration` | videos: length as shown, e.g. `0:09`; `null` for photos |

Full example: [sample-output.json](sample-output.json) (a coffee shop in Austin, TX; shortened to 3 photos).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-maps-photos@1" \
  --data-urlencode "target_url=https://www.google.com/maps/place/data=!4m3!3m2!1s0x8644ca6bc309e81b:0x1f1a903bbb66839!10e5?hl=en&gl=us"
```

Pipeline from a Maps search, one call per place found:

```json
"steps": [
  { "extractor_id": "@extracthub1/google-maps-search@1", "url_output_field": "places[].placePhotosUrl" },
  { "extractor_id": "@extracthub1/google-maps-photos@1" }
]
```

## Good to know

- **Only the 10 photos Google shows without sign-in.** Signed-out visitors get a "limited view" of Google Maps:
  the gallery ends with "See more photos", which asks to sign in, and has no category tabs (Latest, Menu, By
  owner...). The extractor does not sign in.
- **No photo details:** the gallery shows no author, date or caption for a photo, and no video file link.
- **Fragile:** the photo tiles are found through `a[data-photo-index]` and the video length through a generated
  class name (`bKP3Ce`); they may need a fix when Google changes its layout.
- **US view:** fetched through a US proxy.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on the example link
