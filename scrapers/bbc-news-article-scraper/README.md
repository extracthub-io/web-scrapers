# BBC News Article Scraper (headline, byline, dates, full text)

Turn a BBC News article into JSON: headline, summary, ISO publish and update time, authors with their role and
location line, article type, main image, every image with caption and credit, subheadings, the body as paragraphs
and as one text, topic tags with links and the related stories block. Good for news archives, media monitoring,
NLP datasets and citation tools.

**Catalog:** [extracthub.io/extractor/@extracthub1/bbc-news-article](https://extracthub.io/extractor/@extracthub1/bbc-news-article)
**Extractor id:** `@extracthub1/bbc-news-article@1` · **Price:** $0.0025 per page

## Input

A BBC News article on bbc.com:

```
https://www.bbc.com/news/articles/<id>
```

e.g. `https://www.bbc.com/news/articles/cqe9k09j9jv4o` (San Francisco is enjoying an AI boom, but worries about a
crash are growing).

## Output

| Field | Type | Description |
|---|---|---|
| `url` | string | canonical URL, e.g. `https://www.bbc.com/news/articles/cqe9k09j9jv4o` |
| `headline` | string | e.g. `San Francisco is enjoying an AI boom, but worries about a crash are growing` |
| `summary` | string \| null | standfirst / meta description |
| `articleType` | string \| null | schema.org type, e.g. `ReportageNewsArticle` |
| `datePublished` | string \| null | ISO time, e.g. `2026-11-23T00:08:00.937Z` |
| `dateModified` | string \| null | ISO time |
| `timeLabel` | string \| null | relative time as shown in the byline, e.g. `2 hours ago` |
| `authors` | string[] | e.g. `["Zoe Corbyn"]`; several authors can come as one string (`Mark Poynting, Esme Stallard and Justin Rowlatt`) |
| `authorRoles` | string[] | role / location lines of the byline, e.g. `Technology reporter, San Francisco` |
| `publisher` | string \| null | e.g. `BBC News` |
| `image` | string \| null | main image (1024 px) |
| `images[]` | array | images in the article: `src`, `alt`, `caption`, `credit` |
| `subheadings` | string[] | crossheads in the body, often empty |
| `paragraphs` | string[] | body paragraphs in order |
| `text` | string | all paragraphs joined with a space |
| `content` | string | the whole body as Markdown in reading order: `## subheadings` in place between the paragraphs, lists, links, bold / italics and in-body images; the headline, byline, ads, "Related" link boxes and topic tags removed. Use it when the order of subheadings and paragraphs matters |
| `topics[]` | array | topic tags: `name` (e.g. `Artificial intelligence`), `url` |
| `relatedStories[]` | array | "Related" block: `headline`, `url` |

Full example: [sample-output.json](sample-output.json) (the article above; paragraphs shortened to 5 of 34, `content` to the first blocks, text cut,
related stories to 3 of 7).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/bbc-news-article@1" \
  --data-urlencode "target_url=https://www.bbc.com/news/articles/cqe9k09j9jv4o"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/bbc-news-article@1` on
> https://www.bbc.com/news/articles/cqe9k09j9jv4o
> and summarize the article in 5 bullet points with its author and publish date.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** dates, authors, summary and main image come from the schema.org JSON-LD, the body from the
  server-rendered article blocks; fetched through the proxy, no browser needed.
- **Text only:** embedded videos, social posts, charts and "Read more" link boxes are not part of `paragraphs`.
- **Live pages** (`/news/live/...`) and video pages use other layouts and are not covered.
- **Tested** on three /news/articles pages (technology, climate, business), with 1 to 3 authors, 23 to 40
  paragraphs.

## Versions

- **1.1.0:** adds `content` (the body as Markdown). No breaking changes: callers on `@1` get it automatically.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through the proxy)
- [`sample-output.json`](sample-output.json): output on the article above (shortened)
