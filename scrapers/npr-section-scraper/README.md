# NPR Section Scraper (section pages)

Turn a NPR section page into JSON: the sections of the navigation bar and every story card on the page
in page order with headline, link and the card details. Good for news monitoring, headline feeds and finding article
links for the [NPR Article Scraper](../npr-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/npr-section](https://extracthub.io/extractor/@extracthub1/npr-section)
**Extractor id:** `@extracthub1/npr-section@1` · **Price:** $0.0025 per page

## Input

```
https://www.npr.org/sections/news/       (example)
https://www.npr.org/sections/world/
https://www.npr.org/sections/business/
https://www.npr.org/sections/health/
```

Tested on News, World, Business and Health. For the front page use the [NPR Home Scraper](../npr-home-scraper/) (same output).

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | the page `<title>` |
| `url` | string \| null | canonical link |
| `sections[]` | array | the navigation bar: `{ name, url, subsections[] }`: Home, News (National, World, Politics, Business, Health, Science, Climate, Race), Culture (Books, Movies, Television, Pop Culture, Food, Art & Design, Performing Arts, Life Kit, Gaming), Music, Podcasts & Shows, and NPR's own links (Search, Newsletters, NPR Shop, Get NPR+) |
| `stories[]` | array | every story card, in page order (required) |
| `stories[].position` | number | 1-based position |
| `stories[].headline` | string | the headline |
| `stories[].url` | string | story link |
| `stories[].label` | string \| null | eyebrow / program, e.g. `Culture`, `World`, `Only on NPR` |
| `stories[].teaser` | string \| null | teaser text (on section pages it starts with the date) |
| `stories[].date` | string \| null | date, e.g. `2026-11-26` |
| `stories[].image` | string \| null | card image |

Full example: [sample-output.json](sample-output.json) (shortened by the catalog to 5 sections and 5 stories, then to 3 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/npr-section@1" \
  --data-urlencode "target_url=https://www.npr.org/sections/news/"
```

Pipeline to the articles (one call per story found):

```json
"steps": [
  { "extractor_id": "@extracthub1/npr-section@1", "url_output_field": "stories[].url" },
  { "extractor_id": "@extracthub1/npr-article@1" }
]
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Two card layouts:** the home page uses promo cards (`c-promo-card`), section pages use list items (`article.item`).
  The cards are read with one selector for both, and each field uses a selector list with `combineStrategy: "first"`
  (`.c-promo-card__title` → `h2.title`, the same for label and teaser).
- **Size:** 24 cards per page. Video, podcast and live-blog links are included; the article extractor
  is made for regular articles.
- **Plain fetch** through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition
- [`sample-output.json`](sample-output.json): output on the example page
