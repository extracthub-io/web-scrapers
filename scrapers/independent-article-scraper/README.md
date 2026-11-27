# The Independent Article Scraper (headline, authors, dates, full text)

Turn a The Independent article into JSON: headline, standfirst or description, section, published and modified time, authors,
lead image, subheadings, paragraphs, the full text and the whole body as Markdown with the subheadings in place. Good
for news monitoring, media research, archives and feeding articles to AI models. Article links come from the
[The Independent Home Scraper](../independent-home-scraper/) and the [The Independent Section Scraper](../independent-section-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/independent-article](https://extracthub.io/extractor/@extracthub1/independent-article)
**Extractor id:** `@extracthub1/independent-article@1` · **Price:** $0.0025 per page

## Input

A The Independent article, e.g.

```
https://www.independent.co.uk/news/world/americas/us-politics/trump-thanksgiving-journalist-attack-truth-social-b3092020.html
```

## Output

| Field | Type | Description |
|---|---|---|
| `url` | string | canonical link (required) |
| `headline` | string | (required) |
| `standfirst` | string \| null | the description under the headline |
| `section` | string \| null | e.g. `US politics` |
| `datePublished` / `dateModified` | string | ISO time from the page data |
| `author` / `authorUrl` | string \| null | the author and the profile link |
| `isAccessibleForFree` | boolean \| null | `false` for member-only (premium) articles |
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
  --data-urlencode "extractor_id=@extracthub1/independent-article@1" \
  --data-urlencode "target_url=https://www.independent.co.uk/news/world/americas/us-politics/trump-thanksgiving-journalist-attack-truth-social-b3092020.html"
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Premium articles** (`isAccessibleForFree: false`) may return only the opening paragraphs.
- **Removed from `content`:** membership and bookmark prompts, "deeper dive" and Taboola recommendations, comments and
  embedded widgets.
- **Plain fetch** through a UK proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition
- [`sample-output.json`](sample-output.json): output on the example article
