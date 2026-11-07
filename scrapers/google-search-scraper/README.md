# Google Search Scraper (SERP Scraper)

Scrape Google search result pages into JSON: organic results (including video results), "People also ask"
questions, related searches and the next-page URL. No browser, no proxies to manage: one API call per
results page.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-serp](https://extracthub.io/extractor/@extracthub1/google-serp)
**Extractor id:** `@extracthub1/google-serp@1` · **Price:** $0.0025 per page (proxy, no JavaScript)

## Input

A Google web search URL, e.g. `https://www.google.com/search?q=tesla&hl=en&gl=us`.
`hl` (language) and `gl` (country) control the result language and market. Page 2+: use `nextPageUrl`, or
add `&start=10`, `&start=20`, ...

## Output

| Field | Type | Description |
|---|---|---|
| `organicResults[]` | array | one object per result, in page order |
| `organicResults[].title` | string | result title |
| `organicResults[].url` | string | Google's link for the result (`https://www.google.com/goto?url=...`, redirects to the page) |
| `organicResults[].directUrl` | string \| null | the target URL when the page provides it (video results), else `null` |
| `organicResults[].displayedUrl` | string | the green breadcrumb (`https://www.example.com › path`), or meta text for video / social results ("25K+ views · 5 years ago", "11M+ followers") |
| `organicResults[].source` | string | site or channel name ("Wikipedia", "YouTube · Channel") |
| `organicResults[].snippet` | string \| null | description text (`null` for video cards) |
| `peopleAlsoAsk[]` | string[] | "People also ask" questions (questions only) |
| `relatedSearches[]` | string[] | related search suggestions at the bottom of the page |
| `nextPageUrl` | string \| null | absolute URL of the next results page |

Full example: [sample-output.json](sample-output.json).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "X-API-Key: $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-serp@1" \
  --data-urlencode "target_url=https://www.google.com/search?q=tesla&hl=en&gl=us"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-serp@1` to get the Google results for "tesla" (US, English) and list the
> titles and sources.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Result URLs.** For normal results Google hands out its own `/goto?url=` link (the token is encrypted), so
  `url` is that link. Follow its redirect if you need the final page. Video results also carry the real
  URL in `directUrl`.
- **Layouts change per query.** Some queries return a page made almost entirely of videos. Then
  `organicResults` holds the video cards, and `relatedSearches` / `peopleAlsoAsk` are empty because Google
  doesn't show those blocks there.
- `peopleAlsoAsk` has the questions only: Google loads the answers later with JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (request options + field config), ready to
  study, fork or import into ExtractHub Studio
- [`sample-output.json`](sample-output.json): real output of the released version
