# Al Jazeera Article Scraper (headline, authors, dates, full text)

Turn a Al Jazeera article into JSON: headline, standfirst or description, section, published and modified time, authors,
lead image, subheadings, paragraphs, the full text and the whole body as Markdown with the subheadings in place. Good
for news monitoring, media research, archives and feeding articles to AI models. Article links come from the
[Al Jazeera Home Scraper](../aljazeera-home-scraper/) and the [Al Jazeera Section Scraper](../aljazeera-section-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/aljazeera-article](https://extracthub.io/extractor/@extracthub1/aljazeera-article)
**Extractor id:** `@extracthub1/aljazeera-article@1` · **Price:** $0.0025 per page

## Input

A Al Jazeera article, e.g.

```
https://www.aljazeera.com/news/2026/11/26/can-trump-continue-with-iran-war-despite-funding-restrictions
```

## Output

| Field | Type | Description |
|---|---|---|
| `url` | string | canonical link (required) |
| `headline` | string | (required) |
| `standfirst` | string \| null | the line under the headline |
| `label` | string \| null | e.g. `EXPLAINER`, `FEATURE` |
| `topics` | string[] | breadcrumb topics, e.g. `["News", "Explainer"]` |
| `datePublished` / `dateModified` | string | ISO time from the page data |
| `authors` / `authorUrls` | string[] | authors and their profile links |
| `image` | string \| null | lead image |
| `subheadings` | string[] | subheadings in the body, may be empty |
| `paragraphs` | string[] | body paragraphs in order (required) |
| `text` | string | the paragraphs joined with spaces |
| `content` | string | the whole body as Markdown in reading order: subheadings in place between the paragraphs, lists, links, bold / italics and in-body images. Use it when the order of subheadings and paragraphs matters |

Full example: [sample-output.json](sample-output.json) (the article above; `paragraphs`, `text` and `content` shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/aljazeera-article@1" \
  --data-urlencode "target_url=https://www.aljazeera.com/news/2026/11/26/can-trump-continue-with-iran-war-despite-funding-restrictions"
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Links in `content`** stay as Al Jazeera writes them (relative, e.g. `/economy/2026/...`); prefix `https://www.aljazeera.com`.
- **Removed from `content`:** the "Recommended Stories" box and ads.
- **Plain fetch** through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition
- [`sample-output.json`](sample-output.json): output on the example article
