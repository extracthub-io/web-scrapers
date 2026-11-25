# TripAdvisor Search Autocomplete Scraper (search suggestions)

Turn a search term into TripAdvisor's search suggestions as JSON: the matching destinations, hotels, restaurants
and attractions with type, location id, full name with location, coordinates and TripAdvisor link. Good for
finding the TripAdvisor id and page of a place from its name, location pickers in travel apps, and feeding the
other TripAdvisor scrapers (a destination's `locationId` is the `g...` geo id of its hotels, restaurants and
things to do lists).

**Catalog:** [extracthub.io/extractor/@extracthub1/tripadvisor-autocomplete](https://extracthub.io/extractor/@extracthub1/tripadvisor-autocomplete)
**Extractor id:** `@extracthub1/tripadvisor-autocomplete@1` · **Price:** $0.0025 per query

## Input

TripAdvisor's suggestion endpoint with the search term in `query` (URL-encoded):

```
https://www.tripadvisor.com/TypeAheadJson?action=API&query=<search term>&max=10
```

e.g. `https://www.tripadvisor.com/TypeAheadJson?action=API&query=paris&max=10`.

| Parameter | Description |
|---|---|
| `query` | the search term, URL-encoded (`sagrada%20familia`, `m%C3%BCnchen`) |
| `max` | number of suggestions (default 10; TripAdvisor returns at most about 15) |
| `types` | optional filter, comma-separated: `geo` destinations, `hotel`, `eat` restaurants, `attr` attractions; without it the results are mixed |

```
https://www.tripadvisor.com/TypeAheadJson?action=API&query=sushi%20tokyo&types=eat&max=10      restaurants only
https://www.tripadvisor.com/TypeAheadJson?action=API&query=bali&types=hotel&max=15             hotels only
https://www.tripadvisor.com/TypeAheadJson?action=API&query=m%C3%BCnchen&types=geo&max=5        destinations only
```

## Output

| Field | Type | Description |
|---|---|---|
| `query` | string | the search term as TripAdvisor read it |
| `types` | string \| null | the `types` filter, when given |
| `results[]` | array | the suggestions in TripAdvisor's order; `[]` when nothing matches |

Each `results[]` entry:

| Field | Description |
|---|---|
| `type` | `GEO`, `HOTEL`, `EATERY` or `ATTRACTION` |
| `category` | `Destinations`, `Hotels`, `Restaurants` or `Attractions` |
| `locationId` | TripAdvisor location id: the `g...` id for a destination, the `d...` id for a place |
| `name` | name with its location, e.g. `Pullman Paris Tour Eiffel, Paris, Ile-de-France, France` |
| `url` | TripAdvisor page (input for the TripAdvisor [Destination](../tripadvisor-destination-scraper/), Hotel, Restaurant or Attraction Scraper) |
| `latitude` / `longitude` | coordinates; `null` for the odd place without them |

Full example: [sample-output.json](sample-output.json) (`paris`; shortened to 3 of 10).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tripadvisor-autocomplete@1" \
  --data-urlencode "target_url=https://www.tripadvisor.com/TypeAheadJson?action=API&query=paris&max=10"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tripadvisor-autocomplete@1` to find the TripAdvisor pages of these 20 hotels by name, then
> run the TripAdvisor Hotel Scraper on each link.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **The legacy suggestion endpoint:** the search box on tripadvisor.com now asks for suggestions over a
  WebSocket, which an extractor cannot call. This endpoint gives the same places as JSON; it has fewer extras
  (no photos, no tours and tickets, no sponsored results) and may be retired by TripAdvisor some day.
- **Matching is fuzzy:** `big ben` also finds Big Bend; check `type` and `name` before using a result.
- **No results is not an error:** an unknown term returns `results: []` and is charged like any query.
- **US view:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch of a JSON endpoint through a US proxy)
- [`sample-output.json`](sample-output.json): output for the example query
