# detik.com Section Scraper (channel and category pages)

Turn a detik.com channel or category page (news.detik.com, news.detik.com/berita, finance.detik.com, ...) into JSON:
the navigation bar with the channel's categories and the stories on the page with headline, link, publish time and
image. Good for news monitoring and finding article links for the [detik.com Article Scraper](../detik-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/detik-section](https://extracthub.io/extractor/@extracthub1/detik-section)
**Extractor id:** `@extracthub1/detik-section@1` · **Price:** $0.0025 per page

## Input

A channel home or a category page:

```
https://news.detik.com/berita          (example)
https://news.detik.com/
https://finance.detik.com/
```

For the portal front page (www.detik.com) use the [detik.com Home Scraper](../detik-home-scraper/); for the
latest-news list with paging (`/indeks`) the [detik.com Index Scraper](../detik-index-scraper/).

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | the page `<title>` |
| `url` | string \| null | canonical link |
| `sections[]` | array | the navigation bar: `{ name, url }`. On www.detik.com: detikNews, detikFinance, detikHot, detikInet, detikSport, detikOto, detikTravel, detikFood, detikHealth, Wolipop, 20detik and the regional channels; on a channel: its categories (detikNews: Home, Berita, Jabodetabek, Internasional, Hukum, detikX, Kolom, ...) |
| `stories[]` | array | every story card with a headline, in page order (required) |
| `stories[].position` | number | 1-based position |
| `stories[].headline` | string | the headline |
| `stories[].url` | string | story link (input for the [detik.com Article Scraper](../detik-article-scraper/)) |
| `stories[].publishedAtUnix` | number \| null | publish time in Unix seconds |
| `stories[].publishedAtLabel` | string \| null | publish time as in the tooltip, e.g. `Jumat, 27 Nov 2026 04:51 WIB` |
| `stories[].timeAgo` | string \| null | relative time, e.g. `50 menit yang lalu` |
| `stories[].image` | string \| null | thumbnail when the card has it in the HTML (the news feed loads most images with JavaScript, so often `null`) |

Full example: [sample-output.json](sample-output.json) (shortened by the catalog to 5 sections and 5 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/detik-section@1" \
  --data-urlencode "target_url=https://news.detik.com/berita"
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **One card rule for all layouts:** detik pages mix a headline block, lists, a "news feed" and sliders; every story
  card is an `<article>` with a `.media__title` link, so all of them are read with one selector. Cards without a
  headline (sliders, placeholders) are skipped.
- **Duplicates:** a story can appear in more than one block; each occurrence is kept.
- **About 70 stories** per channel or category page; tested on news.detik.com, /berita and finance.detik.com.
- **Indonesian view:** fetched through an Indonesian proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through an Indonesian proxy)
- [`sample-output.json`](sample-output.json): output on the example page
