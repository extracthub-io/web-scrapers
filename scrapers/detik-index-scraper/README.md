# Detik.com Index Scraper (latest news of a detik channel)

Turn the "Indeks" (latest news) page of a detik.com channel into JSON: per story the position, headline, link,
thumbnail, publish time (Unix seconds and the WIB label) and the relative time, plus the page title, current page
and the next-page link. 20 stories per page, newest first. Good for Indonesian news monitoring, headline feeds and
media research.

**Catalog:** [extracthub.io/extractor/@extracthub1/detik-index](https://extracthub.io/extractor/@extracthub1/detik-index)
**Extractor id:** `@extracthub1/detik-index@1` · **Price:** $0.0025 per page

## Input

The index page of a detik.com channel, optionally with a page number:

```
https://<channel>.detik.com/indeks[?page=<n>]
```

e.g. `https://news.detik.com/indeks` (detikNews, page 1). Also tested on `?page=2` and on the `finance`, `sport`,
`hot` and `travel` channels.

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | e.g. `Indeks berita terbaru hari ini dari isu terkini di indonesia - 1` |
| `canonicalUrl` | string | e.g. `https://news.detik.com/indeks` |
| `currentPage` | number | the active page of the pagination, e.g. `1` |
| `nextPageUrl` | string \| null | e.g. `https://news.detik.com/indeks?page=2`; `null` on the last page |
| `stories[]` | array | the stories of the page in order, usually 20 (required) |
| `stories[].position` | number | 1-based position on the page |
| `stories[].headline` | string | e.g. `Dalih Sakit Hati di Balik Rumah Warga Bekasi Dilalap Api` |
| `stories[].url` | string | e.g. `https://news.detik.com/berita/d-8770435/dalih-sakit-hati-di-balik-rumah-warga-bekasi-dilalap-api` (videos link to `20.detik.com`) |
| `stories[].publishedAtUnix` | number \| null | publish time in Unix seconds, e.g. `1795658530` |
| `stories[].publishedAtLabel` | string \| null | publish time as shown in the tooltip, e.g. `Kamis, 26 Nov 2026 09:02 WIB` |
| `stories[].timeAgo` | string \| null | relative time as rendered for the fetch, e.g. `7 menit yang lalu` (older stories show the full date) |
| `stories[].image` | string \| null | thumbnail URL (4:3, 210 px wide) |

Full example: [sample-output.json](sample-output.json) (the detikNews index above; shortened to 5 of 20 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/detik-index@1" \
  --data-urlencode "target_url=https://news.detik.com/indeks"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/detik-index@1` on
> https://news.detik.com/indeks
> and list the latest headlines with their publish time and link.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through an Indonesian proxy (`proxyCountry: "ID"`): the index is server-rendered, no browser is
  needed.
- **Channels:** works on the channels that use the classic detik index layout (news, finance, sport, hot, travel
  were tested). **inet.detik.com uses a redesigned layout** where the story link sits on the card element itself,
  so it returns no stories there (the request fails with `required_fields_missing`); other redesigned channels
  would fail the same way.
- **Paging:** `?page=2`, `?page=3`, ... (up to 500 pages on detikNews); follow `nextPageUrl`.
- **Time:** `publishedAtUnix` is the machine-readable value; `timeAgo` depends on when the page was fetched.
- **Image host:** detik serves the same picture from `akcdn.detik.net.id` or `awsimages.detik.net.id` depending on
  the fetch, so image URLs can differ between two calls.
- Article details (author, body text, tags) come from the [Detik.com Article Scraper](../detik-article-scraper/).

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through the proxy)
- [`sample-output.json`](sample-output.json): output on the detikNews index (shortened)
