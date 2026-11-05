# Books to Scrape Scraper

Scrape the book list of [books.toscrape.com](https://books.toscrape.com): title, price, link and image of
every book on a page. A practice target, handy for testing an e-commerce style pipeline.

**Catalog:** [extracthub.io/extractor/@extracthub1/books-to-scrape](https://extracthub.io/extractor/@extracthub1/books-to-scrape)
**Extractor id:** `@extracthub1/books-to-scrape@1` · **Price:** $0.0005 per page (direct fetch)

## Input

A list page: `https://books.toscrape.com/`, `https://books.toscrape.com/catalogue/page-2.html`,
category pages ...

## Output

| Field | Type | Description |
|---|---|---|
| `books[]` | array | one object per book on the page |
| `books[].title` | string | book title |
| `books[].price` | number | price |
| `books[].link` | string | book page URL |
| `books[].image` | string | cover image URL |

Full example: [sample-output.json](sample-output.json).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "X-API-Key: $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/books-to-scrape@1" \
  --data-urlencode "target_url=https://books.toscrape.com/"
```

With an AI agent (ExtractHub MCP connected):
> List the 5 cheapest books on https://books.toscrape.com/ using `@extracthub1/books-to-scrape@1`.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Files

- [`sample-output.json`](sample-output.json): real output of the released version
- The extractor definition is not in this folder yet (it was built in ExtractHub Studio); see the catalog page.
