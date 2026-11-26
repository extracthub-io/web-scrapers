# CNN Article Scraper (headline, authors, dates, full text)

Turn a CNN article into JSON: headline, description, section and breadcrumb, read time, published and modified
time, byline and authors with their CNN profile links, publisher, word count, lead image with caption, body
paragraphs, subheadings and the full text. Good for news monitoring, media research, archives and feeding articles
to AI models. Article links come from the [CNN Section Scraper](../cnn-section-scraper/) (home page and sections).

**Catalog:** [extracthub.io/extractor/@extracthub1/cnn-article](https://extracthub.io/extractor/@extracthub1/cnn-article)
**Extractor id:** `@extracthub1/cnn-article@1` · **Price:** $0.0025 per page

## Input

A CNN article page on cnn.com or edition.cnn.com:

```
https://edition.cnn.com/<yyyy>/<mm>/<dd>/<section>/<slug>
https://www.cnn.com/<yyyy>/<mm>/<dd>/<section>/<slug>
```

e.g. `https://edition.cnn.com/2026/11/24/tech/nvidia-board-jensen-huang`
(Like ‘family businesses’: Inside the Nvidia board that ousted and rehired Jensen Huang). Article links are on
section pages such as `https://edition.cnn.com/business/tech`.

## Output

| Field | Type | Description |
|---|---|---|
| `url` | string | canonical article URL (always on `www.cnn.com`) |
| `headline` | string | e.g. `Like ‘family businesses’: Inside the Nvidia board that ousted and rehired Jensen Huang` (required) |
| `description` | string | the article's summary (meta description) |
| `section` | string | CNN section, e.g. `business` |
| `breadcrumbs` / `breadcrumbUrls` | string[] | breadcrumb above the headline, e.g. `Business`, `Tech` and their links |
| `readTime` | string \| null | e.g. `5 min read` |
| `articleType` | string | schema.org type, e.g. `NewsArticle` |
| `datePublished` / `dateModified` | string | ISO time, e.g. `2026-11-24T22:52:02.060Z` |
| `byline` | string | as shown, e.g. `By Clare Duffy`, `By Associated Press` |
| `authors` / `authorUrls` | string[] \| null | CNN authors and their profile links, e.g. `https://www.cnn.com/profiles/clare-duffy`; `null` for agency copy |
| `publisher` | string | `CNN` |
| `isAccessibleForFree` | boolean | from the JSON-LD (`false`: CNN marks articles as metered, the full body is still served) |
| `wordCount` | number | e.g. `1032` |
| `image` | string \| null | lead image URL (original size) |
| `imageCaption` | string \| null | caption of the lead image |
| `keywords` | string[] \| null | meta keywords; CNN usually leaves them empty (`null`) |
| `subheadings` | string[] | `h2` subheadings in the body, may be empty |
| `paragraphs` | string[] | body paragraphs in order (required) |
| `text` | string | the paragraphs joined with spaces |
| `content` | string | the whole body as Markdown in reading order: `## subheadings` in place between the paragraphs, lists, links, bold / italics and in-body images; "Related article" boxes and ads removed. Use it when the order of subheadings and paragraphs matters |

Full example: [sample-output.json](sample-output.json) (the article above; `paragraphs`, `text` and `content` shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/cnn-article@1" \
  --data-urlencode "target_url=https://edition.cnn.com/2026/11/24/tech/nvidia-board-jensen-huang"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/cnn-article@1` on
> https://edition.cnn.com/2026/11/24/tech/nvidia-board-jensen-huang
> and summarize the story in five bullet points with its author and publication time.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through a US proxy: type, authors, publisher, word count and the lead image come from the page's
  `NewsArticle` JSON-LD, dates and section from the meta tags, headline, breadcrumb, byline and body from CNN's
  `data-component-name` markup. No browser is needed.
- **Big pages:** CNN article pages are about 6 MB of HTML (inline scripts and styles); the catalog preview shows
  only the first part of the page.
- **Body only:** `paragraphs` are the article's paragraph components; embedded videos, image galleries, ads and
  "related" boxes are left out.
- **Agency stories** (Associated Press, Reuters) have the agency in `byline` and no `authors`.
- **Video pages and live updates** (`/video/`, `/live-news/`) use other layouts and were not tested.
- **Tested** on four articles: two technology stories (one AP), a business story and a feature.

## Versions

- **1.1.0:** adds `content` (the body as Markdown). `subheadings` now also finds CNN's current subheader markup (it was empty on such articles). No breaking changes: callers on `@1` get it automatically.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the article above
