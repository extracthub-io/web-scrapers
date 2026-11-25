# AP News Hub Scraper (latest stories of a topic or section)

Turn an AP News hub (topic / section) page into JSON: every story listed on it with position, headline, link,
summary, published and updated time, authors, image and comment count, plus the page title and description. Good
for news monitoring, topic feeds and collecting article links for the
[AP News Article Scraper](../apnews-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/apnews-hub](https://extracthub.io/extractor/@extracthub1/apnews-hub)
**Extractor id:** `@extracthub1/apnews-hub@1` · **Price:** $0.0025 per page

## Input

An AP News hub page:

```
https://apnews.com/hub/<topic>
```

e.g. `https://apnews.com/hub/technology` (Technology). Other hubs work the same way: `artificial-intelligence`,
`science`, `business`, ...

## Output

| Field | Type | Description |
|---|---|---|
| `title` | string | hub heading, e.g. `Technology` |
| `pageTitle` | string | the page `<title>` |
| `description` | string | meta description of the hub |
| `canonicalUrl` | string | e.g. `https://apnews.com/technology` |
| `stories[]` | array | every story card on the page, in page order (required) |
| `stories[].position` | number | 1-based position on the page |
| `stories[].headline` | string | (required) |
| `stories[].url` | string | article link (required) |
| `stories[].summary` | string \| null | teaser text, only on lead cards |
| `stories[].publishedAtMs` / `updatedAtMs` | number \| null | Unix time in milliseconds, e.g. `1795475064000` |
| `stories[].authors` / `authorUrls` | string[] | authors when the card shows them, else empty |
| `stories[].image` / `imageAlt` | string \| null | card image URL and its alt text |
| `stories[].commentCount` | number \| null | comment count shown on the card |

Full example: [sample-output.json](sample-output.json) (the Technology hub above; `stories` shortened to 8).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/apnews-hub@1" \
  --data-urlencode "target_url=https://apnews.com/hub/technology"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/apnews-hub@1` on
> https://apnews.com/hub/technology
> and list today's stories with their links, newest first.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through a US proxy; the hub page is rendered on the server. No browser is needed.
- **All modules in one list:** the lead block, topic carousels and the "Latest news" column come as one flat
  `stories` list in page order (35-66 stories per hub in tests), with no duplicates. Video playlist items are
  not story cards and are skipped.
- **Times** are the card's `data-posted-date-timestamp` / `data-updated-date-timestamp`, in milliseconds; a few
  cards (galleries, videos) have none.
- **No pagination:** a hub shows one page of stories; follow `stories[].url` to the article pages.
- **Changes all the time:** the story list differs from one request to the next; the catalog preview and the
  sample come from the same fetch.
- **Tested** on the Technology, Artificial Intelligence and Science hubs.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the Technology hub
