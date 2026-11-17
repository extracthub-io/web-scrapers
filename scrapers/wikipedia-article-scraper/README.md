# Wikipedia Article Scraper

Turn a Wikipedia article into JSON: title, canonical URL, short description, Wikidata id, the lead summary (first
paragraph and all lead paragraphs), the infobox as label / value rows, the infobox image, section headings,
categories, references and language-editions counts, and the first-published and last-modified dates. Good for
knowledge bases, entity enrichment (via the Wikidata id), RAG and LLM grounding, research datasets and tracking
article changes.

**Catalog:** [extracthub.io/extractor/@extracthub1/wikipedia-article](https://extracthub.io/extractor/@extracthub1/wikipedia-article)
**Extractor id:** `@extracthub1/wikipedia-article@1` · **Price:** $0.0025 per page

## Input

A Wikipedia article page:

```
https://en.wikipedia.org/wiki/<Article_title>
```

e.g. `https://en.wikipedia.org/wiki/Python_(programming_language)`.

## Output

| Field | Type | Description |
|---|---|---|
| `title` | string | e.g. `Python (programming language)` |
| `url` | string | canonical article link |
| `shortDescription` | string \| null | e.g. `General-purpose programming language` |
| `wikidataId` | string \| null | Wikidata item, e.g. `Q28865` |
| `summary` | string \| null | first paragraph of the lead section |
| `summaryParagraphs` | string[] | every paragraph of the lead section (before the first heading) |
| `infobox[]` | array | infobox rows that have a label (header and image rows are skipped) |
| `infobox[].label` | string | e.g. `Designed by` |
| `infobox[].value` | string \| null | e.g. `Guido van Rossum` |
| `image` | string \| null | first image of the infobox (a photo, logo or map) |
| `sections` | string[] | top-level section headings, e.g. `["History", "Design philosophy and features", ...]` |
| `categories` | string[] | visible categories (hidden maintenance categories are skipped) |
| `referencesCount` | number | entries in the reference lists, e.g. `214` |
| `languagesCount` | number | other language editions of the article, e.g. `120` |
| `datePublished` | string \| null | creation of the article, ISO 8601, e.g. `2001-10-29T18:24:39Z` |
| `dateModified` | string \| null | last edit, ISO 8601, e.g. `2026-11-15T12:10:09Z` |

Full example: [sample-output.json](sample-output.json) (the Python article above; lead paragraphs and categories
shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/wikipedia-article@1" \
  --data-urlencode "target_url=https://en.wikipedia.org/wiki/Python_(programming_language)"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/wikipedia-article@1` on these Wikipedia articles and make a table with the title, short
> description, Wikidata id, the first sentence of the summary and the infobox rows you find most useful.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything comes from the article HTML (Wikipedia's Parsoid output) and its schema.org data.
  No browser is needed, fetched through a US proxy.
- **Other languages:** works on other language editions (`de.wikipedia.org`, `fr.wikipedia.org`, ...) with the
  same page layout; `title`, `summary`, `infobox` and `categories` are then in that language.
- **Footnote markers:** summary paragraphs and infobox values keep the reference markers as shown on the page
  (`[38]`, `[a]`). Infobox values are read as page text, so inline links can leave a space before punctuation
  (`Paris , France`) and list items are joined with a space.
- **Template text:** on a few pages a reference or template inside an infobox value is not parsed cleanly and
  some wiki markup (`</span>"}]]}">`) can show up in that one value (seen on the `Spouse` row of Marie Curie).
  Summary paragraphs are not affected.
- **No infobox:** articles without an infobox give `infobox: []` and `image: null`.
- **Redirects and missing pages:** a redirect title returns the target article (`url` is its canonical link). A
  page without a title or canonical link fails with HTTP 422 `required_fields_missing` and is still charged.
  Batches retry it once.
- **Content license:** Wikipedia text is CC BY-SA 4.0; keep the attribution when you republish it.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real article
