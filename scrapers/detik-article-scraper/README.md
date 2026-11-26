# Detik.com Article Scraper (headline, author, dates, full text)

Turn a detik.com article into JSON: article id, headline, description, author and byline, channel, breadcrumb,
content type, published and modified time, dateline city, publisher, lead image with caption, tags, subheadings,
every body paragraph (all pages of a multi-page story) and the full text. Good for Indonesian news monitoring,
media research, archives and feeding articles to AI models.

**Catalog:** [extracthub.io/extractor/@extracthub1/detik-article](https://extracthub.io/extractor/@extracthub1/detik-article)
**Extractor id:** `@extracthub1/detik-article@1` · **Price:** $0.0025 per page

## Input

A detik.com article page:

```
https://<channel>.detik.com/<subchannel>/d-<id>/<slug>
```

e.g. `https://news.detik.com/berita/d-8770435/dalih-sakit-hati-di-balik-rumah-warga-bekasi-dilalap-api`
(Dalih Sakit Hati di Balik Rumah Warga Bekasi Dilalap Api). Article links of a channel come from the
[Detik.com Index Scraper](../detik-index-scraper/).

## Output

| Field | Type | Description |
|---|---|---|
| `url` | string | canonical article URL |
| `articleId` | string | detik article id, e.g. `8770435` |
| `headline` | string | e.g. `Dalih Sakit Hati di Balik Rumah Warga Bekasi Dilalap Api` (required) |
| `description` | string | the meta description (summary) |
| `author` | string | e.g. `Wildan Noviansah`, or `Tim detikcom` |
| `byline` | string | as shown, e.g. `Wildan Noviansah - detikNews` |
| `channel` | string | channel label of the byline, e.g. `detikNews`, `detikFinance`, `Sport` |
| `breadcrumb` | string[] | e.g. `["detikNews", "Berita"]` |
| `articleType` | string | detik content type, e.g. `singlepagenews`, `longstorynews` (multi-page) |
| `datePublished` / `dateModified` | string | ISO time with WIB offset, e.g. `2026-11-26T09:02:10+07:00` |
| `dateLabel` | string | publish time as shown, e.g. `Kamis, 26 Nov 2026 09:02 WIB` |
| `publisher` | string | `detikcom` |
| `dateline` | string \| null | city at the start of the story, e.g. `Bekasi` (many stories have none) |
| `image` | string | lead image URL (16:9, 1200 px) |
| `imageCaption` | string \| null | caption with the photo credit |
| `tags` | string[] | detik tags, e.g. `kebakaran`, `bekasi` |
| `pageCount` | number \| null | number of pages of a multi-page story, e.g. `3`; `null` for single-page stories |
| `subheadings` | string[] | `h2` subheadings in the body, may be empty |
| `paragraphs` | string[] | body paragraphs in order, all pages included (required) |
| `text` | string | the paragraphs joined with spaces |
| `content` | string | the whole body as Markdown in reading order: `## subheadings` in place between the paragraphs, lists, links, bold / italics and in-body images; "Baca juga" boxes, ads, video embeds, page buttons and tags removed. Use it when the order of subheadings and paragraphs matters |

Full example: [sample-output.json](sample-output.json) (the article above; `paragraphs`, `text` and `content` shortened, the
story has 20 paragraphs on 3 pages).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/detik-article@1" \
  --data-urlencode "target_url=https://news.detik.com/berita/d-8770435/dalih-sakit-hati-di-balik-rumah-warga-bekasi-dilalap-api"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/detik-article@1` on
> https://news.detik.com/berita/d-8770435/dalih-sakit-hati-di-balik-rumah-warga-bekasi-dilalap-api
> and summarize the story in English in five bullet points with its author and publication time.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through an Indonesian proxy (`proxyCountry: "ID"`): dates, publisher and image come from the
  `NewsArticle` JSON-LD, id, author, type and page count from the `dtk:` meta tags, headline, byline, tags and body
  from the page markup. No browser is needed.
- **Multi-page stories** ("longstory", "Halaman 2 dari 3"): detik sends all pages in one HTML page, so
  `paragraphs` covers the whole story without fetching the next pages.
- **Body only:** "Baca juga" boxes, ads, the "SCROLL TO CONTINUE" label and the editor initials at the end
  (`(mea/mea)`) are left out of `paragraphs`. `content` keeps the editor initials and the "Simak juga Video ...:"
  line before the video embed. On multi-page stories detik's HTML splits the subheading at a page break inside
  its `<h2>`, so that one heading can come out glued to the next paragraph in `content`.
- **Channels:** tested on detikNews (a 3-page story and an international round-up), detikFinance and detikSport.
  inet.detik.com and other redesigned channels may use another article layout and were not tested; photo
  (`/foto-news/`) and video (`20.detik.com`) pages are not articles.
- **Image host:** detik serves the same picture from `akcdn.detik.net.id` or `awsimages.detik.net.id` depending on
  the fetch, so `image` can differ between two calls.

## Versions

- **1.1.0:** adds `content` (the body as Markdown). `paragraphs` and `text` no longer contain the "Simak juga Video ..." line. No breaking changes: callers on `@1` get it automatically.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through the proxy)
- [`sample-output.json`](sample-output.json): output on the article above (shortened)
