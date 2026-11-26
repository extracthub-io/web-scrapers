# AP News Article Scraper (headline, authors, dates, full text)

Turn an AP News article into JSON: headline, summary, section, published and modified time, byline and authors
with their profile links, publisher, lead image with caption, keywords, subheadings, every body paragraph and the
full text. Good for news monitoring, media research, archives and feeding articles to AI models.

**Catalog:** [extracthub.io/extractor/@extracthub1/apnews-article](https://extracthub.io/extractor/@extracthub1/apnews-article)
**Extractor id:** `@extracthub1/apnews-article@1` · **Price:** $0.0025 per page

## Input

An AP News article page:

```
https://apnews.com/article/<slug>-<id>
```

e.g. `https://apnews.com/article/grok-lawsuit-elon-musk-ai-abuse-images-452cc64e7169a55868f797982d0e8238`
(States sue Musk companies over sexualized images made with Grok). Article links of a topic page come from the
[AP News Hub Scraper](../apnews-hub-scraper/).

## Output

| Field | Type | Description |
|---|---|---|
| `url` | string | canonical article URL |
| `headline` | string | e.g. `States sue Musk companies over flood of sexualized images made with AI chatbot Grok` (required) |
| `summary` | string | AP's summary of the story (JSON-LD description) |
| `section` / `sectionUrl` | string | breadcrumb section, e.g. `U.S. News`, `https://apnews.com/us-news` |
| `articleType` | string | schema.org type, e.g. `NewsArticle` |
| `datePublished` / `dateModified` | string | ISO time, e.g. `2026-11-23T13:44:14Z` |
| `byline` | string | as shown, e.g. `By SARAH RANKIN` |
| `authors` / `authorUrls` | string[] | author names and AP profile links |
| `publisher` | string | `AP News` |
| `image` | string | lead image URL (1200 px) |
| `imageCaption` | string \| null | caption of the lead photo; `null` when the story opens with a video or has no photo |
| `keywords` | string[] | AP subject tags, e.g. `Lawsuits`, `Elon Musk` |
| `subheadings` | string[] | `h2` subheadings in the body, may be empty |
| `paragraphs` | string[] | body paragraphs in order (required) |
| `text` | string | the paragraphs joined with spaces |
| `content` | string | the whole body as Markdown in reading order: `## subheadings` in place between the paragraphs, lists, links, bold / italics and in-body images; "Related Stories" boxes, "Read More" embeds and ads removed. Use it when the order of subheadings and paragraphs matters |

Full example: [sample-output.json](sample-output.json) (the article above; `paragraphs`, `text` and `content` shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/apnews-article@1" \
  --data-urlencode "target_url=https://apnews.com/article/grok-lawsuit-elon-musk-ai-abuse-images-452cc64e7169a55868f797982d0e8238"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/apnews-article@1` on
> https://apnews.com/article/grok-lawsuit-elon-musk-ai-abuse-images-452cc64e7169a55868f797982d0e8238
> and summarize the story in five bullet points with its author and publication time.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through a US proxy: dates, summary, publisher, image and keywords come from the page's
  `NewsArticle` JSON-LD, headline, byline and body from the page markup. No browser is needed.
- **Body only:** `paragraphs` are the direct paragraphs of the story body; ads, embedded videos, their captions and
  "related" boxes are left out.
- **Authors** are AP journalists as credited on the page (upper case as AP shows them in the byline).
- **Not included:** comments (loaded in the browser by a third-party widget) and the related-stories rail.
- **Tested** on three articles: a U.S. news story, a markets story and a science story.

## Versions

- **1.1.0:** adds `content` (the body as Markdown). No breaking changes: callers on `@1` get it automatically.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the article above
