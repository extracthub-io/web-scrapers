# CNN Section Scraper (home page and section pages)

Turn the CNN home page or any CNN section page into a list of stories: headline, link, story type (article, video,
gallery, live story), image and image credit, in the order they appear on the page, plus the page title,
description and link and the sections in the page's navigation bar. Good for news monitoring, tracking what CNN puts on its front pages, and finding article links
for the [CNN Article Scraper](../cnn-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/cnn-section](https://extracthub.io/extractor/@extracthub1/cnn-section)
**Extractor id:** `@extracthub1/cnn-section@1` · **Price:** $0.0025 per page

## Input

The CNN home page or a section / subsection page:

```
https://edition.cnn.com/
https://edition.cnn.com/<section>
https://edition.cnn.com/<section>/<subsection>/<page>
```

e.g. `https://edition.cnn.com/health`. Tested on the home page, `/health`, `/health/life-but-better/food`,
`/entertainment`, `/world`, `/world/asia`, `/business/tech`, `/politics`, `/science`, `/travel`, `/style` and
`/sport`.

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string \| null | page title without " \| CNN", e.g. `Health`, `Food: Life, But Better` |
| `description` | string \| null | the page's meta description |
| `url` | string \| null | canonical link of the page (on `www.cnn.com`) |
| `sections[]` | array | the navigation bar of the page: `{ name, url, active }`. The home page shows the main sections (US, World, Politics, Business, Health ...); a section page shows its own subsections (Health: Life, But Better, Fitness, Food, Sleep ...; Entertainment: Movies, Television, Celebrity). `active` is `true` for the page you are on |
| `stories[]` | array | every story card on the page, in page order (required) |

Each `stories[]` entry:

| Field | Description |
|---|---|
| `position` | 1-based position on the page |
| `headline` | the headline as shown on the card |
| `url` | link of the story (input for the CNN Article Scraper when `type` is `article`) |
| `type` | `article`, `video`, `vertical-video`, `gallery`, `live-story` or `card` (newsletter sign-ups, interactive pages and other promos) |
| `image` | card image (original size) |
| `imageCredit` | photo credit, e.g. `Northwestern Medicine` |

Full example: [sample-output.json](sample-output.json) (`/health`; shortened to 4 of 36 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/cnn-section@1" \
  --data-urlencode "target_url=https://edition.cnn.com/health"
```

Pipeline section → articles (one call per story found):

```json
"steps": [
  { "extractor_id": "@extracthub1/cnn-section@1", "url_output_field": "stories[].url" },
  { "extractor_id": "@extracthub1/cnn-article@1" }
]
```

Video, gallery and `card` links are not articles and the article extractor is not made for them; when you run
the two steps yourself, keep only `type: "article"`.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **One layout for all sections:** section pages look different (lead story with headlines, grids, vertical strips,
  carousels, "spotlight" packages), but every story card uses the same CNN card markup, so one extractor covers
  the home page and all sections. Sponsored cards are left out.
- **Duplicates:** the home page and some sections show a story in more than one block (e.g. 120 cards, 115
  different links on the home page); the list keeps each occurrence with its position.
- **Size of the list:** from about 30 stories on a small section to 100+ on the home page and `/world`; `/sport`
  has a large vertical-video carousel (300+ `vertical-video` cards).
- **No dates or summaries:** CNN cards show only headline and image; use the CNN Article Scraper for dates,
  authors and text.
- **Sections are the visible bar only:** the full menu behind the menu button (all sections with their subsections)
  is not extracted. To walk the site, start on the home page and feed `sections[].url` back into this extractor.
- **US view:** fetched through a US proxy, without JavaScript.

## Versions

- **1.1.0:** adds `sections` (navigation bar). No breaking changes.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the example page
