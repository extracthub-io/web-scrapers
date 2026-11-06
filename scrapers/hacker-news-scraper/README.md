# Hacker News Scraper (stories list)

Turn a Hacker News list page into JSON: every story with its rank, id, title, link, points, author, post time,
comment count and discussion link, plus the next page link. Works on the front page, newest, ask, show and
past pages. Good for tech news monitoring, trend tracking and launch alerts.

**Catalog:** [extracthub.io/extractor/@extracthub1/hacker-news-stories](https://extracthub.io/extractor/@extracthub1/hacker-news-stories)
**Extractor id:** `@extracthub1/hacker-news-stories@1` · **Price:** $0.0025 per page

## Input

Any Hacker News story list:

```
https://news.ycombinator.com/news          front page
https://news.ycombinator.com/news?p=2      front page, page 2
https://news.ycombinator.com/newest        newest
https://news.ycombinator.com/ask           Ask HN
https://news.ycombinator.com/show          Show HN
https://news.ycombinator.com/front?day=2026-11-05   past front page
```

## Output

| Field | Type | Description |
|---|---|---|
| `stories[]` | array | 30 stories per page, in page order |
| `stories[].rank` | number \| null | rank on the page (continues on later pages: 31, 32, ...) |
| `stories[].id` | string | Hacker News item id |
| `stories[].title` | string | story title |
| `stories[].url` | string \| null | the linked article; for Ask HN and other text posts, the item page |
| `stories[].points` | number \| null | points (`null` for job ads) |
| `stories[].author` | string \| null | username of the poster (`null` for job ads) |
| `stories[].postedAt` | string \| null | post time in UTC, e.g. `2026-11-05T22:17:15` |
| `stories[].commentCount` | number \| null | number of comments (`null` when there are none yet, or for job ads) |
| `stories[].commentsUrl` | string \| null | the discussion page on Hacker News |
| `nextPageUrl` | string \| null | the "More" link to the next page |

Full example: [sample-output.json](sample-output.json) (front page, shortened to 5 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/hacker-news-stories@1" \
  --data-urlencode "target_url=https://news.ycombinator.com/news"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/hacker-news-stories@1` on the Hacker News front page and list the stories about AI with
> their points and comment counts.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **30 stories per call:** follow `nextPageUrl` for more, one page at a time.
- **Don't run it as a parallel batch:** Hacker News throttles bursts of requests. In a test, a batch of 10 pages
  sent at once failed with HTTP 419 on every URL, while single calls a few seconds apart all worked. Call it
  one page at a time with a pause in between.
- **Job ads** (from YC companies) have no points, author or comments: those fields are `null`.
- **No stories = failed request:** a page without a story list (a wrong URL, a rate limit page) fails with HTTP
  422 `required_fields_missing`. The page was fetched, so it is still charged.
- Comments themselves are not included; `commentsUrl` points to the discussion.

## Versions

- **1.0.1:** fetches through the scraping proxy for more reliable results. Output unchanged.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy, CSS fields)
- [`sample-output.json`](sample-output.json): output on a real page
