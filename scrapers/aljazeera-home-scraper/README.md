# Al Jazeera Home Scraper (front page)

Turn the Al Jazeera front page into JSON: the sections of the navigation bar and every story card on the page
in page order with headline, link and the card details. Good for news monitoring, headline feeds and finding article
links for the [Al Jazeera Article Scraper](../aljazeera-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/aljazeera-home](https://extracthub.io/extractor/@extracthub1/aljazeera-home)
**Extractor id:** `@extracthub1/aljazeera-home@1` · **Price:** $0.0025 per page

## Input

```
https://www.aljazeera.com/
```

For section pages use the [Al Jazeera Section Scraper](../aljazeera-section-scraper/) (same output).

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | the page `<title>` |
| `url` | string \| null | canonical link |
| `sections[]` | array | the navigation bar: `{ name, url, subsections[] }`: News (Middle East, Africa, Asia, US & Canada, Latin America, Europe, Asia Pacific), Explained, Sport, Opinion, Video, Interactives, Originals (with its series) |
| `subsections[]` | array | the secondary bar under the menu: `{ name, url }`, trending topics and regions (e.g. US-Israel war on Iran, Yemen conflict, Middle East, Africa, ...) |
| `stories[]` | array | every story card, in page order (required) |
| `stories[].position` | number | 1-based position |
| `stories[].headline` | string | the headline |
| `stories[].url` | string | story link |
| `stories[].summary` | string \| null | excerpt, on cards that show one |
| `stories[].label` | string \| null | card label, e.g. `Explainer`, `Live` |
| `stories[].dateLabel` | string \| null | date as shown on section pages, e.g. `26 Nov 2026` |
| `stories[].image` | string \| null | card image |

Full example: [sample-output.json](sample-output.json) (shortened by the catalog to 5 sections and 5 stories, then to 3 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/aljazeera-home@1" \
  --data-urlencode "target_url=https://www.aljazeera.com/"
```

Pipeline to the articles (one call per story found):

```json
"steps": [
  { "extractor_id": "@extracthub1/aljazeera-home@1", "url_output_field": "stories[].url" },
  { "extractor_id": "@extracthub1/aljazeera-article@1" }
]
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **All cards:** lead stories, the feed below and the "Most read" / trending list are all read (`<article>` cards with a
  headline list: `.article-card__title` → `.gc__title` → trending title, `combineStrategy: "first"`). A story can appear
  in more than one list; each occurrence is kept.
- **Size:** about 35 cards per page. Video, podcast and live-blog links are included; the article extractor
  is made for regular articles.
- **Plain fetch** through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition
- [`sample-output.json`](sample-output.json): output on the example page
