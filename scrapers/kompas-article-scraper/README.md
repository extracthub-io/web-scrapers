# Kompas.com Article Scraper (headline, author, dates, full text)

Turn a Kompas.com article into JSON: headline, description, section and subsection, breadcrumb, published and
modified time, author with profile link and job title, editor, dateline, word and page count, lead image with
caption, tags, subheadings, every body paragraph, the full text and the "Baca juga" related links. Good for
Indonesian news monitoring, media research, archives and feeding articles to AI models.

**Catalog:** [extracthub.io/extractor/@extracthub1/kompas-article](https://extracthub.io/extractor/@extracthub1/kompas-article)
**Extractor id:** `@extracthub1/kompas-article@1` · **Price:** $0.0025 per page

## Input

A Kompas.com article page, best with `?page=all` so that a multi-page story comes back whole:

```
https://www.kompas.com/<channel>/read/<yyyy>/<mm>/<dd>/<id>/<slug>?page=all
https://<channel>.kompas.com/read/<yyyy>/<mm>/<dd>/<id>/<slug>?page=all
```

e.g. `https://www.kompas.com/tren/read/2026/11/26/070000865/fenomena-laut-langka-guncang-panama-ekspor-minyak-ikan-anjlok-88-persen?page=all`
(Fenomena Laut Langka Guncang Panama, Ekspor Minyak Ikan Anjlok 88 Persen). Also tested on
`nasional.kompas.com` and `money.kompas.com` articles.

## Output

| Field | Type | Description |
|---|---|---|
| `url` | string | canonical article URL (without `?page=all`) |
| `headline` | string | e.g. `Fenomena Laut Langka Guncang Panama, Ekspor Minyak Ikan Anjlok 88 Persen` (required) |
| `description` | string | the meta description (summary) |
| `section` / `subsection` | string | Kompas category and subcategory, e.g. `Tren` / `Tren`, `News` / `Nasional`, `Money` / `Cuan` |
| `breadcrumb` | string[] | e.g. `["Kompas.com", "Tren"]` |
| `articleType` | string | Kompas content type, e.g. `Standard` |
| `datePublished` / `dateModified` | string | ISO time with WIB offset, e.g. `2026-11-26T07:00:00+07:00` |
| `dateLabel` | string | publish time as shown, e.g. `Kompas.com , 26 November 2026, 07:00 WIB` |
| `author` | string | writer, e.g. `Inten Esti Pratiwi` |
| `authorUrl` / `authorJobTitle` | string \| null | Kompas profile link and role, e.g. `Content Writer Tren`, `Reporter Nasional` |
| `editor` | string | editor of the story (often the writer on Tren) |
| `publisher` | string | `Kompas.com` |
| `dateline` | string \| null | e.g. `PANAMA CITY, KOMPAS.com`, `JAKARTA, KOMPAS.com` |
| `wordCount` | number | word count from the page meta, e.g. `1040` |
| `pageCount` | number | pages of the story, e.g. `3` |
| `currentPage` | string | `all` with `?page=all`, else the page number, e.g. `1` |
| `image` | string | lead image URL (1200x675, watermarked) |
| `imageCaption` | string \| null | caption of the lead image (without the photo credit) |
| `tags` | string[] | Kompas tags, e.g. `Panama`, `upwelling` |
| `subheadings` | string[] | `h2` subheadings in the body, may be empty |
| `paragraphs` | string[] | body paragraphs in order (required), without the "Baca juga: ..." lines |
| `text` | string | the paragraphs joined with spaces |
| `content` | string | the whole body as Markdown in reading order: `## subheadings` in place between the paragraphs, lists, links, bold / italics and in-body images; "Baca juga" links, ads, widgets and the support box removed. Use it when the order of subheadings and paragraphs matters |
| `relatedTitles` / `relatedUrls` | string[] | the "Baca juga" links inside the body, same order |

Full example: [sample-output.json](sample-output.json) (the article above; `paragraphs`, `text` and `content` shortened, the
story has 40 paragraphs on 3 pages).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/kompas-article@1" \
  --data-urlencode "target_url=https://www.kompas.com/tren/read/2026/11/26/070000865/fenomena-laut-langka-guncang-panama-ekspor-minyak-ikan-anjlok-88-persen?page=all"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/kompas-article@1` on
> https://www.kompas.com/tren/read/2026/11/26/070000865/fenomena-laut-langka-guncang-panama-ekspor-minyak-ikan-anjlok-88-persen?page=all
> and summarize the story in English in five bullet points with its author and publication time.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through an Indonesian proxy (`proxyCountry: "ID"`): dates, author link and publisher come from the
  `NewsArticle` JSON-LD, section, author, editor, word and page count from the `content_*` meta tags, headline,
  tags and body from the page markup. No browser is needed.
- **Add `?page=all`:** Kompas splits long stories into pages. Without it, `paragraphs` holds only the first page
  (`currentPage` is then `1` and `pageCount` tells how many pages there are).
- **"Baca juga" lines:** Kompas puts related-article links between paragraphs as their own `<p>`. They are left
  out of `paragraphs`, `text` and `content` (since 1.1.0) and returned as `relatedTitles` / `relatedUrls`.
- **Left out:** ads, polls, the Kompas.id widget, the "Terima kasih atas dukungan" box, comments and the
  "Artikel Terkait" rail.
- **Channels:** tested on `www.kompas.com/tren`, `nasional.kompas.com` and `money.kompas.com` (all the same article
  layout). Other Kompas Gramedia sites (kompas.id, kompas.tv, tribunnews) are different sites and are not covered.

## Versions

- **1.1.0:** adds `content` (the body as Markdown). `paragraphs` and `text` no longer contain the "Baca juga" lines (they stay in `relatedTitles` / `relatedUrls`). No breaking changes: callers on `@1` get it automatically.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through the proxy)
- [`sample-output.json`](sample-output.json): output on the article above (shortened)
