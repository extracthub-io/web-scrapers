# TripAdvisor Restaurants Scraper (restaurants list of a city)

Turn a TripAdvisor restaurants list (`Restaurants-g...`) into JSON: the 30 ranked restaurants on the page with
restaurant id, name, link, rating, review count, price range, cuisines, public phone, address, coordinates,
reservations, menu link, image and opening hours, plus the next page link. Good for restaurant lead lists, local
market research and feeding the [TripAdvisor Restaurant Scraper](../tripadvisor-restaurant-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/tripadvisor-restaurants](https://extracthub.io/extractor/@extracthub1/tripadvisor-restaurants)
**Extractor id:** `@extracthub1/tripadvisor-restaurants@1` · **Price:** $0.0025 per page

## Input

A TripAdvisor restaurants list of a city, e.g. `https://www.tripadvisor.com/Restaurants-g60763-New_York_City_New_York.html`:

```
https://www.tripadvisor.com/Restaurants-g60763-oa30-New_York_City_New_York.html   page 2 (oa30, oa60, ...)
https://www.tripadvisor.com/Restaurants-g35805-Chicago_Illinois.html              another city
```

## Output

| Field | Type | Description |
|---|---|---|
| `pageUrl` | string \| null | canonical link of the list |
| `geoId` | string \| null | TripAdvisor location id, e.g. `60763` |
| `location` | string \| null | e.g. `New York City Restaurants` |
| `restaurants[]` | array | the ranked restaurants on the page (30) |
| `nextPageUrl` | string \| null | the next page |

Each `restaurants[]` entry:

| Field | Description |
|---|---|
| `rank` | position on the page (1-30 on every page) |
| `restaurantId` | TripAdvisor restaurant id |
| `name` / `url` | name and restaurant page (input for the TripAdvisor Restaurant Scraper) |
| `rating` / `reviewCount` | average rating (1-5) and number of reviews |
| `priceRange` | e.g. `$$ - $$$` |
| `cuisines` | e.g. `Italian, Steakhouse` |
| `telephone` | the restaurant's public phone |
| `address` / `postalCode` | full street address and postal code |
| `latitude` / `longitude` | coordinates |
| `acceptsReservations` | boolean |
| `menuUrl` | menu link, when listed |
| `image` | main photo |
| `openingHours[]` | `{ day, opens, closes }` (`HH:MM:SS`, local time) |

Full example: [sample-output.json](sample-output.json) (New York City; shortened to 3 restaurants and 2 days of hours).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tripadvisor-restaurants@1" \
  --data-urlencode "target_url=https://www.tripadvisor.com/Restaurants-g60763-New_York_City_New_York.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tripadvisor-restaurants@1` on TripAdvisor's Chicago restaurants and list the steakhouses
> open on Monday with their rating and phone.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Schema.org data:** every value comes from the list TripAdvisor publishes for search engines, which is
  stable. Sponsored cards are not in it.
- **`rank` restarts on each page:** it is the position on that page; on page 2 add 30.
- **Missing values:** `menuUrl`, `openingHours` and `telephone` are left out when a restaurant has none.
- **No restaurants = failed request:** a page without the list (a bot check) fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once.
- **US view:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy; JSON-LD)
- [`sample-output.json`](sample-output.json): output on a real list page
