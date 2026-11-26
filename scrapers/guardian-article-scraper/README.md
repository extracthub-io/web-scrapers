# The Guardian Article Scraper (headline, authors, dates, full text)

Turn a Guardian article into JSON: headline, standfirst, section label and link, published and modified time,
dateline, byline with authors and their profile links, publisher, lead image with alt text and caption, keywords,
subheadings, every body paragraph and the full text. Good for news monitoring, media research, archives and
feeding articles to AI models.

**Catalog:** [extracthub.io/extractor/@extracthub1/guardian-article](https://extracthub.io/extractor/@extracthub1/guardian-article)
**Extractor id:** `@extracthub1/guardian-article@1` · **Price:** $0.0025 per page

## Input

A Guardian article page:

```
https://www.theguardian.com/<section>/<yyyy>/<mon>/<dd>/<slug>
```

e.g. `https://www.theguardian.com/technology/2026/nov/24/china-media-jensen-huang-nvidia-ceo`
(Chinese media hail Huang’s Nvidia return with warning over ‘witch-hunts’). Article links of a section front come
from the [Guardian Section Scraper](../guardian-section-scraper/).

## Output

| Field | Type | Description |
|---|---|---|
| `url` | string | canonical article URL |
| `headline` | string | e.g. `Chinese media hail Huang’s Nvidia return with warning over ‘witch-hunts’` (required) |
| `standfirst` | string \| null | the summary under the headline |
| `label` / `labelUrl` | string \| null | the topic label above the headline and its link, e.g. `Nvidia`, `https://www.theguardian.com/technology/nvidia` |
| `section` | string | Guardian section, e.g. `Technology` |
| `articleType` | string | schema.org type, e.g. `NewsArticle` |
| `datePublished` / `dateModified` | string | ISO time, e.g. `2026-11-24T14:45:03.000Z` |
| `dateline` | string \| null | publish time as shown, e.g. `Tue 24 Nov 2026 09.45 EST` |
| `byline` | string | as shown, e.g. `Amy Hawkins Senior China correspondent`, or an agency such as `Agence France-Presse` |
| `authors` / `authorUrls` | string[] | Guardian contributors and their profile links (empty for agency copy) |
| `publisher` | string | `The Guardian` |
| `isAccessibleForFree` | boolean | from the JSON-LD (Guardian articles are free) |
| `image` / `imageAlt` | string \| null | lead image URL and its alt text |
| `imageCaption` | string \| null | caption with the photo credit |
| `keywords` | string[] | Guardian tags, e.g. `Nvidia`, `Jensen Huang`, `Technology` |
| `subheadings` | string[] | `h2` subheadings in the body, may be empty |
| `paragraphs` | string[] | body paragraphs in order (required) |
| `text` | string | the paragraphs joined with spaces |
| `content` | string | the whole body as Markdown in reading order: `## subheadings` in place between the paragraphs, lists, links, bold / italics and in-body images; "Read more" rich links, newsletter sign-up boxes and the sign-in gate removed. Use it when the order of subheadings and paragraphs matters |

Full example: [sample-output.json](sample-output.json) (the article above; `paragraphs`, `text` and `content` shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/guardian-article@1" \
  --data-urlencode "target_url=https://www.theguardian.com/technology/2026/nov/24/china-media-jensen-huang-nvidia-ceo"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/guardian-article@1` on
> https://www.theguardian.com/technology/2026/nov/24/china-media-jensen-huang-nvidia-ceo
> and summarize the story in five bullet points with its author and publication time.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through the proxy: dates, section and keywords come from the article meta tags, publisher and
  type from the `NewsArticle` JSON-LD, headline, byline and body from the page's `data-gu-name` blocks. No
  browser is needed.
- **Body only:** `paragraphs` are the direct paragraphs of the story body; rich links, embeds, ads and the sign-in
  gate are left out.
- **Agency stories** (AFP, Reuters, AP) have the agency as `byline` and empty `authors`; some have no `dateline`.
- **Lead media:** `image` is the lead picture of the article; it is a small thumbnail on some feature layouts and
  `null` when the story opens with a video.
- **Live blogs and interactive pages** (`/live/`, `/ng-interactive/`) use other layouts and were not tested.
- **Not included:** comments (loaded in the browser) and the related / most viewed rails.
- **Tested** on three articles: a technology news story, an agency world story and a long feature with subheadings.

## Versions

- **1.1.0:** adds `content` (the body as Markdown). No breaking changes: callers on `@1` get it automatically.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through the proxy)
- [`sample-output.json`](sample-output.json): output on the article above
