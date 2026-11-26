# detik.com Home Scraper (portal front page)

Turn the detik.com portal front page (www.detik.com) into JSON: the navigation bar with all detik channels and the
stories on the page with headline, link, publish time and image. Good for news monitoring and as the entry point to
the [detik.com Section Scraper](../detik-section-scraper/) and the [detik.com Article Scraper](../detik-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/detik-home](https://extracthub.io/extractor/@extracthub1/detik-home)
**Extractor id:** `@extracthub1/detik-home@1` · **Price:** $0.0025 per page

## Input

```
https://www.detik.com/
```

For channel and category pages (news.detik.com, news.detik.com/berita, finance.detik.com, ...) use the
[detik.com Section Scraper](../detik-section-scraper/) (same output).

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
  --data-urlencode "extractor_id=@extracthub1/detik-home@1" \
  --data-urlencode "target_url=https://www.detik.com/"
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **One card rule for all layouts:** detik pages mix a headline block, lists, a "news feed" and sliders; every story
  card is an `<article>` with a `.media__title` link, so all of them are read with one selector. Cards without a
  headline (sliders, placeholders) are skipped.
- **Duplicates:** a story can appear in more than one block; each occurrence is kept.
- **About 75 stories** on the front page.
- **Indonesian view:** fetched through an Indonesian proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through an Indonesian proxy)
- [`sample-output.json`](sample-output.json): output on the example page
