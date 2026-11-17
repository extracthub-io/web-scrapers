# Google News Scraper (topic articles)

Turn a Google News topic page into JSON: every article on the page (about 130-240 on a topic page) with
title, Google News article id and article link, source name and website, publish time (ISO and as shown), author and image.
Works on the topic pages (Technology, Business, World, Science, ...) of any edition. Good for media
monitoring, news dashboards and tracking which outlets cover a subject.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-news](https://extracthub.io/extractor/@extracthub1/google-news)
**Extractor id:** `@extracthub1/google-news@1` · **Price:** $0.0025 per page

## Input

A Google News topic page (open a topic in Google News and copy the URL):

```
https://news.google.com/topics/<topic id>?hl=en-US&gl=US&ceid=US:en
```

e.g. `https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en`
(Technology). `hl`, `gl` and `ceid` pick the edition (language and country).

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | e.g. `Google News - Technology - Latest` |
| `pageUrl` | string \| null | the topic page's canonical URL, e.g. `https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen` |
| `articles[]` | array | articles in page order (story clusters flattened) |
| `articles[].position` | number | 1-based position on the page |
| `articles[].title` | string | e.g. `iOS 27.3 gives Apple’s Calendar app new design updates` |
| `articles[].articleId` | string | Google News article id |
| `articles[].url` | string \| null | article link, e.g. `https://news.google.com/read/CBMijgFBVV95cUxOVXZO...?hl=en-US&gl=US&ceid=US%3Aen`; opens the publisher's article in a browser |
| `articles[].source` | string \| null | publisher, e.g. `9to5Mac` |
| `articles[].sourceUrl` | string \| null | publisher home page (not the article), e.g. `https://9to5mac.com` |
| `articles[].publishedAt` | string \| null | ISO time (UTC), e.g. `2026-11-16T18:52:00Z` |
| `articles[].timeText` | string \| null | as shown, e.g. `9 hours ago` |
| `articles[].author` | string \| null | byline, e.g. `Ryan Christoffel`; `null` when not shown |
| `articles[].image` | string \| null | thumbnail URL; most articles inside a cluster have none |
| `articlesCount` | number | articles on the page, e.g. `216` |

Full example: [sample-output.json](sample-output.json) (the Technology topic above; 5 of 216 articles shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-news@1" \
  --data-urlencode "target_url=https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-news@1` on
> https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en
> and list the headlines of the last 6 hours with their source.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the articles are in the page HTML; no browser is needed, fetched through a US proxy.
- **Search pages are not supported:** Google News search URLs (`/search?q=...`) failed at the scraping
  provider on every attempt (no result, not charged), with and without JavaScript rendering. Use a topic page.
- **Top stories** (`/home`) also works, but only returns the ~10 articles Google puts in that page's HTML.
- **Article links:** `url` is the article's Google News link (`news.google.com/read/<articleId>`); in a
  browser it opens the publisher's article. The publisher's own article URL is only stored encoded in the page,
  so it is not a field. `sourceUrl` is the publisher's home page.
- **Clusters:** a topic page groups several articles per story; they come as separate items in page order, so
  one story can appear from several sources.
- **Times:** `publishedAt` is UTC; `timeText` is relative to the fetch time.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real topic page (shortened)
