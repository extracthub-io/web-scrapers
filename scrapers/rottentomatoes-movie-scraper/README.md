# Rotten Tomatoes Scraper (movie page)

Turn a Rotten Tomatoes (rottentomatoes.com) movie page into JSON: title, release date, Tomatometer critics score
(certified, sentiment, reviews count, average rating, liked / not liked counts, top critics score), Popcornmeter
audience score (verified and all-audience), critics consensus, "Audience Says", synopsis, content rating, genres,
directors, poster, the top cast with roles, and every Movie Info detail (producer, screenwriter, distributor,
language, release dates, box office, runtime, sound mix, ...). Good for movie databases, recommendation apps,
box office and review research, and tracking scores over time.

**Catalog:** [extracthub.io/extractor/@extracthub1/rottentomatoes-movie](https://extracthub.io/extractor/@extracthub1/rottentomatoes-movie)
**Extractor id:** `@extracthub1/rottentomatoes-movie@1` · **Price:** $0.0025 per page

## Input

A Rotten Tomatoes movie page:

```
https://www.rottentomatoes.com/m/<movie-slug>
```

e.g. `https://www.rottentomatoes.com/m/oppenheimer_2023`.

## Output

| Field | Type | Description |
|---|---|---|
| `title` | string | movie title, e.g. `Oppenheimer` |
| `fullTitle` | string \| null | title as in the page data, often with the year, e.g. `Oppenheimer (2023)` |
| `url` | string | canonical movie link |
| `emsId` | string \| null | Rotten Tomatoes' internal movie id |
| `releaseDate` | string \| null | release date (YYYY-MM-DD), e.g. `2023-07-21` |
| `tomatometer` | number \| null | critics score in %, e.g. `93` (`null` before enough reviews) |
| `tomatometerCertified` | boolean \| null | Certified Fresh |
| `tomatometerSentiment` | string \| null | `POSITIVE` (fresh) or `NEGATIVE` (rotten) |
| `criticsReviewCount` | number \| null | number of critic reviews, e.g. `510` |
| `criticsAverageRating` | number \| null | average critic rating out of 10, e.g. `8.6` |
| `criticsLikedCount` | number \| null | positive critic reviews, e.g. `474` |
| `criticsNotLikedCount` | number \| null | negative critic reviews, e.g. `36` |
| `topCriticsScore` | number \| null | Tomatometer of top critics only, e.g. `95` |
| `topCriticsReviewCount` | number \| null | e.g. `87` |
| `audienceScore` | number \| null | Popcornmeter in % (verified audience when available), e.g. `91` |
| `audienceRatingCount` | string \| null | ratings count as shown, e.g. `10,000+ Verified Ratings` |
| `audienceAverageRating` | number \| null | average audience rating out of 5, e.g. `4.5` |
| `audienceCertified` | boolean \| null | Verified Hot |
| `audienceSentiment` | string \| null | `POSITIVE` or `NEGATIVE` |
| `allAudienceScore` | number \| null | Popcornmeter of all audience ratings, e.g. `88` |
| `allAudienceRatingCount` | string \| null | e.g. `25,000+ Ratings` |
| `criticsConsensus` | string \| null | the Critics Consensus text |
| `audienceSays` | string \| null | the "Audience Says" summary (not on every movie) |
| `synopsis` | string \| null | plot summary |
| `contentRating` | string \| null | e.g. `R`, `PG-13` |
| `genres` | string[] | e.g. `["Biography", "History", "Drama"]` |
| `directors` | string[] | e.g. `["Christopher Nolan"]` |
| `poster` | string \| null | poster image URL |
| `cast[]` | array | top cast and crew shown on the page (usually the director and 5 actors) |
| `cast[].position` | number | 1-based order on the page |
| `cast[].name` | string | e.g. `Cillian Murphy` |
| `cast[].role` | string \| null | character or job, e.g. `J. Robert Oppenheimer`, `Director` |
| `cast[].url` | string \| null | Rotten Tomatoes celebrity page |
| `cast[].image` | string \| null | photo URL |
| `details[]` | array | the Movie Info list, in page order |
| `details[].label` | string | e.g. `Producer`, `Box Office (Gross USA)`, `Runtime` |
| `details[].values` | string[] | e.g. `["Emma Thomas", "Charles Roven", "Christopher Nolan"]`, `["$330.0M"]`, `["3h 0m"]` |

Full example: [sample-output.json](sample-output.json) (the Oppenheimer page above).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/rottentomatoes-movie@1" \
  --data-urlencode "target_url=https://www.rottentomatoes.com/m/oppenheimer_2023"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/rottentomatoes-movie@1` on these Rotten Tomatoes movie pages and make a table with the title,
> release date, Tomatometer, audience score, runtime and box office.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** scores come from the page's own score JSON, the title data from schema.org, the cast and Movie
  Info from the HTML. No browser is needed, fetched through a US proxy.
- **Movie Info as a list:** the labels differ per movie (`Rerelease Date (Theaters)`, `Aspect Ratio`, no
  `Screenwriter`, ...), so `details` keeps them as label / values pairs instead of fixed fields. Pick the label you
  need, e.g. `Runtime` or `Box Office (Gross USA)`.
- **Audience score:** `audienceScore` is the verified-audience score when the movie has one, else the all-audience
  score (older movies, see `audienceRatingCount`); `allAudienceScore` is always the all-audience score.
- **Missing values:** new or small releases may have no Tomatometer, consensus or "Audience Says" yet; those
  fields are `null` then.
- **Cast:** the cast shown on the movie page (usually 6 people). The full cast is on the `/cast-and-crew` page,
  which this extractor does not read.
- **Removed pages / bot checks:** a page without title or url fails with HTTP 422 `required_fields_missing` and is
  still charged. Batches retry it once.
- **Movies only:** TV series pages (`/tv/...`) use another layout and are not covered.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real movie page
