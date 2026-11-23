# BBC News Section Scraper (headlines of a BBC News section page)

Turn a BBC News section or topic page into JSON: the page's story blocks in page order (the unnamed top stories
block, then blocks such as "More Tech", "Watch", "Listen" or "In case you missed it") with their name and link,
and per story the headline, link, summary, time label ("2 hrs ago"), topic tag and image. Good for news monitoring,
headline feeds and media research.

**Catalog:** [extracthub.io/extractor/@extracthub1/bbc-news-section](https://extracthub.io/extractor/@extracthub1/bbc-news-section)
**Extractor id:** `@extracthub1/bbc-news-section@1` · **Price:** $0.0025 per page

## Input

A BBC section page on bbc.com:

```
https://www.bbc.com/news/<section>
https://www.bbc.com/<section>
```

e.g. `https://www.bbc.com/news/technology` (BBC Technology). Also tested on `/news/world` and `/business`.

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | e.g. `BBC Technology \| Technology, Health, Environment, AI` |
| `pageUrl` | string \| null | canonical URL, e.g. `https://www.bbc.com/technology` |
| `sections[]` | array | the story blocks of the page, in page order |
| `sections[].name` | string \| null | block title, e.g. `More Tech`, `Watch`; `null` for the top stories block |
| `sections[].link` | string \| null | the block's "see more" link when the title is a link, e.g. `https://www.bbc.com/future/tags/keeping-tabs` |
| `sections[].stories[]` | array | the stories of the block |
| `sections[].stories[].headline` | string | e.g. `San Francisco is enjoying an AI boom, but worries about a crash are growing` |
| `sections[].stories[].url` | string \| null | e.g. `https://www.bbc.com/news/articles/cqe9k09j9jv4o`; `null` for clips that play in the page ("Watch" block) |
| `sections[].stories[].summary` | string \| null | standfirst under the headline |
| `sections[].stories[].timeLabel` | string \| null | relative time as shown, e.g. `2 hrs ago` |
| `sections[].stories[].topic` | string \| null | topic tag, e.g. `Business` |
| `sections[].stories[].image` | string \| null | image URL |
| `sections[].stories[].imageAlt` | string \| null | image description |

Full example: [sample-output.json](sample-output.json) (the Technology page above; stories shortened to 3 per block).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/bbc-news-section@1" \
  --data-urlencode "target_url=https://www.bbc.com/news/technology"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/bbc-news-section@1` on
> https://www.bbc.com/news/technology
> and give me the top stories with their links and summaries.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the section page is server-rendered; fetched through the proxy, no browser needed.
- **Blocks differ per section:** the Technology page had 7 blocks (72 stories), World 5 (31), Business 10 (64).
  Several blocks have no title (`name: null`), and the same story can appear in two blocks.
- **Times are relative:** cards show a relative time such as "2 hrs ago", not a timestamp. Use
  [`bbc-news-article`](../bbc-news-article-scraper/) on a story for its ISO publish time.
- **Video clips:** stories in "Watch" carousels play inside the page and have no link (`url: null`).
- **Audio carousels:** some blocks (e.g. "Latest Audio" on /business) use another card layout and come back with
  an empty `stories` list.
- **Content changes all the time:** the page is updated many times a day, so two calls rarely match.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through the proxy)
- [`sample-output.json`](sample-output.json): output on the Technology page (shortened)
