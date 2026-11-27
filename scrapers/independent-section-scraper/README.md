# The Independent Section Scraper (section pages)

Turn a The Independent section page into JSON: the sections of the navigation bar and every story card on the page
in page order with headline, link and the card details. Good for news monitoring, headline feeds and finding article
links for the [The Independent Article Scraper](../independent-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/independent-section](https://extracthub.io/extractor/@extracthub1/independent-section)
**Extractor id:** `@extracthub1/independent-section@1` · **Price:** $0.0025 per page

## Input

```
https://www.independent.co.uk/news/world   (example)
https://www.independent.co.uk/news/uk
https://www.independent.co.uk/sport
https://www.independent.co.uk/tech
```

Tested on World, UK, Sport and Tech. For the front page use the [The Independent Home Scraper](../independent-home-scraper/) (same output).

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | the page `<title>` |
| `url` | string \| null | canonical link |
| `sections[]` | array | the navigation bar: `{ name, url }`: the main bar, e.g. News, Sport, Voices, Culture, Lifestyle, Travel, ... (it differs a little per edition: the UK view shows Membership and Voices, the US view Money and Health & Science) |
| `stories[]` | array | every story card, in page order (required) |
| `stories[].position` | number | 1-based position |
| `stories[].headline` | string | the headline |
| `stories[].url` | string | story link |
| `stories[].label` | string \| null | kicker, e.g. `POLITICS`, `analysis` |
| `stories[].image` | string \| null | card image |

Full example: [sample-output.json](sample-output.json) (shortened by the catalog to 5 sections and 5 stories, then to 3 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/independent-section@1" \
  --data-urlencode "target_url=https://www.independent.co.uk/news/world"
```

Pipeline to the articles (one call per story found):

```json
"steps": [
  { "extractor_id": "@extracthub1/independent-section@1", "url_output_field": "stories[].url" },
  { "extractor_id": "@extracthub1/independent-article@1" }
]
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Generated class names:** the site uses generated CSS classes; the extractor relies on the structure (`article` →
  `a.card-link` → `h2`) and the `nav[aria-label="Sections"]` landmark instead.
- **No dates or summaries** on the cards; use the article extractor for them.
- **Size:** 90-120 cards per page. Video, podcast and live-blog links are included; the article extractor
  is made for regular articles.
- **Plain fetch** through a UK proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition
- [`sample-output.json`](sample-output.json): output on the example page
