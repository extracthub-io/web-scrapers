# TripAdvisor Restaurant Scraper (restaurant page)

Turn a TripAdvisor restaurant page into JSON: restaurant id, name, rating, review count, ranking in the city,
price range, cuisines, meal types, special diets, features, reservations, public phone, menu link, address,
coordinates, opening hours, image, location breadcrumbs and the latest reviews. Good for restaurant research,
competitor monitoring and review analysis.

**Catalog:** [extracthub.io/extractor/@extracthub1/tripadvisor-restaurant](https://extracthub.io/extractor/@extracthub1/tripadvisor-restaurant)
**Extractor id:** `@extracthub1/tripadvisor-restaurant@1` · **Price:** $0.0025 per page

## Input

A TripAdvisor restaurant page:

```
https://www.tripadvisor.com/Restaurant_Review-g<geoId>-d<restaurantId>-Reviews-<Name>-<Location>.html
```

e.g. `https://www.tripadvisor.com/Restaurant_Review-g60763-d1236281-Reviews-Club_A_Steakhouse-New_York_City_New_York.html`.
The [TripAdvisor Restaurants Scraper](../tripadvisor-restaurants-scraper/) lists them in `restaurants[].url`.

## Output

| Field | Type | Description |
|---|---|---|
| `restaurantId` | string | TripAdvisor restaurant id, e.g. `1236281` |
| `name` | string | e.g. `Club A Steakhouse` |
| `rating` / `reviewCount` | number \| null | average rating (1-5) and number of reviews |
| `ranking` | string \| null | e.g. `#18 of 13,936 Restaurants in New York City` |
| `rankPosition` / `rankTotal` | number \| null | e.g. `18` / `13936` |
| `priceRange` | string \| null | e.g. `$$$$` |
| `cuisines[]` | string[] | e.g. `["Steakhouse", "Seafood"]` |
| `details[]` | array | `{ label, value }` rows of the Features box, e.g. `Meal types` / `Dinner`, `Special Diets` / `Gluten free options` |
| `features[]` | string[] | e.g. `Accepts Credit Cards`, `Private Dining`, `Wheelchair Accessible` |
| `acceptsReservations` | boolean \| null | |
| `telephone` | string \| null | the restaurant's public phone |
| `menuUrl` | string \| null | menu link, when listed |
| `streetAddress`, `city`, `region`, `postalCode`, `country` | string \| null | address |
| `latitude` / `longitude` | number \| null | coordinates |
| `openingHours[]` | array | `{ day, opens, closes }` (`HH:MM:SS`, local time); closed days are missing |
| `image` | string \| null | main photo |
| `breadcrumbs[]` | string[] | location path |
| `reviews[]` | array | latest reviews on the page (15): `{ position, title, text, rating, url }` |
| `url` | string | canonical restaurant link |

Full example: [sample-output.json](sample-output.json) (Club A Steakhouse, New York; reviews and features shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tripadvisor-restaurant@1" \
  --data-urlencode "target_url=https://www.tripadvisor.com/Restaurant_Review-g60763-d1236281-Reviews-Club_A_Steakhouse-New_York_City_New_York.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tripadvisor-restaurant@1` on these TripAdvisor restaurant links and compare rating,
> ranking, price range and what the latest reviews praise or criticize.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Reviews:** the first page of reviews (15), with text as sent in the HTML. Reviewer names and profiles are
  deliberately not extracted.
- **No website:** TripAdvisor adds the restaurant's website link with JavaScript, so it is not in the output.
- **`details` and `features`** come from page markup without stable hooks; they may need a fix when TripAdvisor
  changes its layout. Everything else comes from schema.org data or stable page hooks.
- **Removed restaurants / bot checks:** a page without id or name fails with HTTP 422 `required_fields_missing`
  and is still charged. Batches retry it once.
- **US view:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real restaurant page
