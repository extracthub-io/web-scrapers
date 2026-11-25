# TripAdvisor Attraction Scraper (things to do page)

Turn a TripAdvisor attraction page (`Attraction_Review`) into JSON: attraction id, name, rating, review count,
ranking among the city's things to do, description, opening hours, public phone, website, address,
coordinates, image, location breadcrumbs and the latest reviews with the tour or ticket they were written for.
Good for travel apps, destination research and review analysis.

**Catalog:** [extracthub.io/extractor/@extracthub1/tripadvisor-attraction](https://extracthub.io/extractor/@extracthub1/tripadvisor-attraction)
**Extractor id:** `@extracthub1/tripadvisor-attraction@1` · **Price:** $0.0025 per page

## Input

A TripAdvisor attraction page:

```
https://www.tripadvisor.com/Attraction_Review-g<geoId>-d<attractionId>-Reviews-<Name>-<Location>.html
```

e.g. `https://www.tripadvisor.com/Attraction_Review-g60763-d104365-Reviews-Empire_State_Building-New_York_City_New_York.html`.
The [TripAdvisor Attractions Scraper](../tripadvisor-attractions-scraper/) lists them in `attractions[].url`.

## Output

| Field | Type | Description |
|---|---|---|
| `attractionId` | string | TripAdvisor attraction id, e.g. `104365` |
| `name` | string | e.g. `Empire State Building` |
| `rating` / `reviewCount` | number \| null | average rating (1-5) and number of reviews |
| `ranking` | string \| null | e.g. `#11 of 2,861 things to do in New York City` |
| `rankPosition` / `rankTotal` | number \| null | e.g. `11` / `2861` |
| `description` | string \| null | the About text |
| `openingHours` | string \| null | schema.org format, e.g. `Mo-Su 09:00-23:00` |
| `telephone` / `website` | string \| null | public phone and website |
| `streetAddress`, `city`, `region`, `postalCode`, `country` | string \| null | address |
| `latitude` / `longitude` | number \| null | coordinates |
| `image` | string \| null | main photo |
| `breadcrumbs[]` | string[] | location path |
| `reviews[]` | array | latest reviews on the page (10): `{ position, title, text, rating, writtenDate, reviewOf, url }` |
| `url` | string | canonical attraction link |

`reviewOf` is the tour or ticket the review was written for (e.g. `NYC Empire State Building Observation Deck
Ticket`); `null` for reviews of the place itself.

Full example: [sample-output.json](sample-output.json) (Empire State Building; reviews shortened to 3).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tripadvisor-attraction@1" \
  --data-urlencode "target_url=https://www.tripadvisor.com/Attraction_Review-g60763-d104365-Reviews-Empire_State_Building-New_York_City_New_York.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tripadvisor-attraction@1` on the Statue of Liberty and Empire State Building pages and
> compare rating, ranking, opening hours and the complaints in the latest reviews.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Reviews:** the first page of reviews (10), with text as sent in the HTML. Reviewer names and profiles are
  deliberately not extracted.
- **`writtenDate`** is written as TripAdvisor shows it (`November 21, 2026`).
- **Removed attractions / bot checks:** a page without id or name fails with HTTP 422 `required_fields_missing`
  and is still charged. Batches retry it once.
- **US view:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real attraction page
