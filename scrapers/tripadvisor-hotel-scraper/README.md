# TripAdvisor Hotel Scraper (hotel page)

Turn a TripAdvisor (tripadvisor.com) hotel page into JSON: hotel id, name, rating, reviews count, ranking in the
city, hotel class, price range, a featured booking offer, address, coordinates, public phone and website,
amenities, description, main image, location breadcrumbs and the latest reviews. Good for hotel research,
competitor monitoring, travel apps and review analysis.

**Catalog:** [extracthub.io/extractor/@extracthub1/tripadvisor-hotel](https://extracthub.io/extractor/@extracthub1/tripadvisor-hotel)
**Extractor id:** `@extracthub1/tripadvisor-hotel@1` · **Price:** $0.0025 per page

## Input

A TripAdvisor hotel page:

```
https://www.tripadvisor.com/Hotel_Review-g<geoId>-d<hotelId>-Reviews-<Hotel_Name>-<Location>.html
```

e.g. `https://www.tripadvisor.com/Hotel_Review-g60763-d1776857-Reviews-The_Langham_New_York_Fifth_Avenue-New_York_City_New_York.html`.

## Output

| Field | Type | Description |
|---|---|---|
| `hotelId` | string | TripAdvisor hotel id, e.g. `1776857` |
| `name` | string | hotel name, e.g. `The Langham, New York, Fifth Avenue` |
| `rating` | number \| null | average traveler rating (1 to 5), e.g. `4.7` |
| `reviewCount` | number \| null | number of reviews, e.g. `3437` |
| `ranking` | string \| null | e.g. `#88 of 530 hotels in New York City` |
| `hotelClass` | number \| null | star class, e.g. `5` |
| `priceRange` | string \| null | e.g. `$$$` |
| `offerPrice` | number \| null | price of the first booking offer shown, e.g. `965` |
| `offerProvider` | string \| null | booking site of that offer, e.g. `Expedia.com` |
| `telephone` | string \| null | the hotel's public phone, e.g. `1 (212) 695-4005` |
| `website` | string \| null | the hotel's website, when TripAdvisor lists it |
| `streetAddress` | string \| null | e.g. `400 Fifth Avenue, New York` |
| `city` | string \| null | e.g. `New York City` |
| `region` | string \| null | e.g. `New York` |
| `postalCode` | string \| null | e.g. `10018-2753` |
| `country` | string \| null | e.g. `US` |
| `latitude` | number \| null | e.g. `40.75007` |
| `longitude` | number \| null | e.g. `-73.983765` |
| `amenities[]` | string[] | e.g. `Free High Speed Internet (WiFi)`, `Bar / lounge` |
| `description` | string \| null | the hotel's About text |
| `image` | string \| null | main photo |
| `breadcrumbs[]` | string[] | location path, e.g. `["United States", "New York (NY)", "New York City", "New York City Hotels", "The Langham, New York, Fifth Avenue"]` |
| `reviews[]` | array | latest reviews on the page (10): `{ position, title, text, rating, url }` |
| `url` | string | canonical hotel link |

Full example: [sample-output.json](sample-output.json) (The Langham, New York, Fifth Avenue; amenities and reviews
shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tripadvisor-hotel@1" \
  --data-urlencode "target_url=https://www.tripadvisor.com/Hotel_Review-g60763-d1776857-Reviews-The_Langham_New_York_Fifth_Avenue-New_York_City_New_York.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tripadvisor-hotel@1` on these TripAdvisor hotel links and make a table of name, rating,
> reviews count, ranking, price range and the most common complaint in the latest reviews.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** most fields come from the schema.org data in the HTML TripAdvisor sends; ranking, hotel class,
  offer, description and reviews come from the page itself. No browser is needed.
- **Offers change:** `offerPrice` and `offerProvider` are the first offer shown for the default dates of that
  request, not necessarily the cheapest, and they differ between calls.
- **Reviews:** the first page of reviews (10), with text as sent in the HTML. Reviewer names and
  profiles are deliberately not extracted, and management responses are not included.
- **Missing values:** independent hotels often have no `telephone` or `website` on TripAdvisor; those fields are
  `null` then.
- **Removed hotels / bot checks:** a page without hotel id or name fails with HTTP 422 `required_fields_missing`
  and is still charged. Batches retry it once.
- **US view:** fetched through a US proxy from tripadvisor.com, so prices are in USD.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real hotel page
