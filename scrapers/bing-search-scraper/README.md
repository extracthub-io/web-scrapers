# Bing Search Scraper (SERP)

Turn a Bing search results page into JSON: the organic web results with position, title, link, displayed
URL, site name, snippet and date, plus the query, the result count, related searches and the next-page URL.
Good for rank tracking, SEO research and feeding search results to an AI agent.

**Catalog:** [extracthub.io/extractor/@extracthub1/bing-serp](https://extracthub.io/extractor/@extracthub1/bing-serp)
**Extractor id:** `@extracthub1/bing-serp@1` · **Price:** $0.0025 per page

## Input

A Bing web search URL:

```
https://www.bing.com/search?q=<query>
https://www.bing.com/search?q=<query>&first=<offset>
```

e.g. `https://www.bing.com/search?q=web+scraping+api`

## Output

| Field | Type | Description |
|---|---|---|
| `query` | string | the search words as Bing read them, e.g. `web scraping api` |
| `resultStats` | string \| null | result count as shown, e.g. `152,000 results`; missing on some layouts |
| `organicResults[]` | array | organic web results in page order (ads are not included) |
| `organicResults[].position` | number | 1-based position on this page |
| `organicResults[].title` | string | e.g. `ScrapingBee – The Best Web Scraping API` |
| `organicResults[].url` | string | Bing click link (`https://www.bing.com/ck/a?...`); it redirects to the result |
| `organicResults[].urlBase64` | string \| null | the result's own URL as base64url text, e.g. `aHR0cHM6Ly93d3cuc2NyYXBpbmdiZWUuY29tLw` = `https://www.scrapingbee.com/` |
| `organicResults[].displayedUrl` | string \| null | URL as shown, e.g. `https://www.scrapingbee.com` or `https://floppydata.com › web-scraping` |
| `organicResults[].siteName` | string \| null | e.g. `ScrapingBee` or `floppydata.com` |
| `organicResults[].snippet` | string \| null | result text, cut by Bing with `…` |
| `organicResults[].date` | string \| null | date in the snippet when Bing shows one, e.g. `3 days ago`, `May 20, 2024` |
| `relatedSearches` | array | e.g. `["free web scrape api", "web scraping api python"]`; empty on some layouts |
| `nextPageUrl` | string \| null | URL of the next results page |

Full example: [sample-output.json](sample-output.json) (the `web scraping api` page above; 4 of 10 results shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/bing-serp@1" \
  --data-urlencode "target_url=https://www.bing.com/search?q=web+scraping+api"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/bing-serp@1` on
> https://www.bing.com/search?q=web+scraping+api
> and list the title and site of every result.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the results are in the HTML Bing sends; no browser is needed, fetched through a US proxy.
- **Links are Bing click links.** The result's own URL is inside the link as base64url text, returned as
  `urlBase64`. Decode it in your code, e.g. `Buffer.from(urlBase64, "base64url").toString()` in Node.js or
  `base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))` in Python. `displayedUrl` is for display only: Bing
  shortens long paths.
- **The number of results per page varies.** Bing answers the same query with different layouts. In 4 fetches
  of the example page, 2 had 10 organic results and 2 had only 2 or 3 (a page filled with an AI summary and
  ads). Follow `nextPageUrl` to continue: it starts after the last result of the page you got.
- **`resultStats` and `relatedSearches` depend on the layout:** each was missing on some of the test pages.
- **Ads, the AI summary, videos and news boxes** are not extracted; only the organic web results.
- **Results change** per request and per proxy location (US), so two calls can return a different order.
- **Tested queries:** `web scraping api`, `best running shoes`, `tesla`.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real results page (shortened)
