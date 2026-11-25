# TripAdvisor Destination Scraper (Tourism page of a city, region or country)

Turn a TripAdvisor destination page (`Tourism-g...`) into JSON: geo id, name, review and photo counts, location
breadcrumbs, links to the destination's hotels, restaurants, things to do and forum, the top things to do, hotels
and restaurants with rating and review count, the themed tours and experiences with price and, on region and
country pages, the best cities to visit. Good for destination guides, travel apps and as the entry point to the
other TripAdvisor scrapers.

**Catalog:** [extracthub.io/extractor/@extracthub1/tripadvisor-destination](https://extracthub.io/extractor/@extracthub1/tripadvisor-destination)
**Extractor id:** `@extracthub1/tripadvisor-destination@1` · **Price:** $0.0025 per page

## Input

A TripAdvisor destination page:

```
https://www.tripadvisor.com/Tourism-g<geoId>-<Name>-Vacations.html
```

e.g. `https://www.tripadvisor.com/Tourism-g14782503-Yogyakarta_Yogyakarta_Region_Java-Vacations.html`.

```
https://www.tripadvisor.com/Tourism-g187147-Paris_Ile_de_France-Vacations.html   city
https://www.tripadvisor.com/Tourism-g294228-Java-Vacations.html                    region (has destinations[])
https://www.tripadvisor.com/Tourism-g294225-Indonesia-Vacations.html               country (has destinations[])
```

The [TripAdvisor Search Autocomplete Scraper](../tripadvisor-autocomplete-scraper/) finds these pages by name
(results with `type: "GEO"`), and `destinations[].url` links to more of them.

## Output

| Field | Type | Description |
|---|---|---|
| `geoId` | string | TripAdvisor location id, e.g. `14782503` |
| `name` | string | e.g. `Yogyakarta, Indonesia` |
| `reviewCount` | number \| null | reviews of all hotels, restaurants and attractions of the destination |
| `photoCount` | number \| null | photos of the destination |
| `image` | string \| null | main photo |
| `breadcrumbs[]` | array | `{ name, url }` location path, e.g. Asia › Indonesia › Java › Yogyakarta Region › Yogyakarta |
| `thingsToDoUrl`, `hotelsUrl`, `restaurantsUrl`, `forumUrl` | string \| null | the destination's lists (input for the TripAdvisor Attractions, Hotels and Restaurants Scrapers) |
| `thingsToDo[]` | array | top things to do: `{ locationId, name, url, rating, reviewCount, category }` |
| `hotels[]` | array | popular hotels: `{ locationId, name, url, rating, reviewCount, travelersChoice }` (cities) |
| `restaurants[]` | array | popular restaurants: `{ locationId, name, url, rating, reviewCount, priceRange, cuisines }` (cities) |
| `experiences[]` | array | themed shelves ("Yogyakarta Is Great For", "Paris is known for"): `{ theme, items[] }`, each item `{ name, url, rating, reviewCount, price, priceText }` |
| `destinations[]` | array | best cities to visit: `{ geoId, name, url }` (regions and countries; `[]` on a city) |
| `url` | string | canonical destination link |

Full example: [sample-output.json](sample-output.json) (Yogyakarta; lists shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tripadvisor-destination@1" \
  --data-urlencode "target_url=https://www.tripadvisor.com/Tourism-g14782503-Yogyakarta_Yogyakarta_Region_Java-Vacations.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tripadvisor-destination@1` on TripAdvisor's Java page, then on each of its best cities, and
> make a table of each city's top 3 things to do with rating and reviews.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **What a page shows depends on its size:** a city has things to do, hotels and restaurants (6 each); a region or
  country has 12 things to do and the best cities (10), without hotels and restaurants. Missing sections are `[]`.
- **Only the top of each list:** for the full lists use `thingsToDoUrl`, `hotelsUrl` and `restaurantsUrl` with the
  list scrapers. TripAdvisor has no separate full list of destinations; `destinations[]` is what it shows.
- **Prices of experiences** are the lowest tour or ticket price in USD (`from $45 per adult`); `null` for places
  without tickets.
- **Fragile parts:** the things to do, hotels and restaurants cards and the experience shelves are found through
  page markup without stable hooks (`category`, `cuisines` and experience names included); they may need a fix
  when TripAdvisor changes its layout. Names, ratings, review counts and links use stable hooks.
- **Not extracted:** forum topics and their authors, and the AI generated travel tips.
- **Bot checks:** a page without geo id or name fails with HTTP 422 `required_fields_missing` and is still
  charged. Batches retry it once.
- **US view:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real destination page
