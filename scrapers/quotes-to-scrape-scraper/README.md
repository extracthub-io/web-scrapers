# Quotes to Scrape Scraper

Scrape every quote on a [quotes.toscrape.com](https://quotes.toscrape.com) list page: text, author,
author page URL and tags, plus the next-page URL. A small, free-to-practise target. It's a good first
scraper for testing your pipeline or an AI agent setup.

**Catalog:** [extracthub.io/extractor/@extracthub1/quotes-toscrape-list](https://extracthub.io/extractor/@extracthub1/quotes-toscrape-list)
**Extractor id:** `@extracthub1/quotes-toscrape-list@1` · **Price:** $0.0005 per page (direct fetch)

## Input

A list page: `https://quotes.toscrape.com/`, `https://quotes.toscrape.com/page/2/`,
`https://quotes.toscrape.com/tag/love/` ...

## Output

| Field | Type | Description |
|---|---|---|
| `quotes[]` | array | one object per quote on the page (10 per page) |
| `quotes[].text` | string | quote text |
| `quotes[].author` | string | author name |
| `quotes[].author_url` | string | absolute URL of the author page |
| `quotes[].tags` | string[] | tags |
| `nextPageUrl` | string \| null | absolute URL of the next page, `null` on the last page |

Full example: [sample-output.json](sample-output.json).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "X-API-Key: $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/quotes-toscrape-list@1" \
  --data-urlencode "target_url=https://quotes.toscrape.com/"
```

All pages: follow `nextPageUrl` until it is `null` (example in the [REST API guide](../../docs/api.md#5-pagination)).

With an AI agent (ExtractHub MCP connected):
> Scrape all pages of quotes.toscrape.com with `@extracthub1/quotes-toscrape-list@1` and count the quotes
> per author.

## Files

- [`extractor.json`](extractor.json): the extractor definition (CSS selectors on `itemprop` attributes)
- [`sample-output.json`](sample-output.json): real output of the released version
