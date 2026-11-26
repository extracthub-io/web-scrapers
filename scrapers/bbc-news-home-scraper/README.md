# BBC News Home Scraper (bbc.com home page and BBC News index)

Turn the BBC home page or the BBC News index into JSON: the navigation bar (main sections with the current one
marked, and the subsections of the second bar), then the page's story blocks in page order (top stories, "More to
explore", "Most read", "Only from the BBC", per-topic grids such as "US & Canada News", "Sport", "Arts" ...) with
their name and link, and per story the headline, link, summary, time label, topic tag and image. Good for front
page monitoring, headline feeds and finding article links for the
[BBC News Article Scraper](../bbc-news-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/bbc-news-home](https://extracthub.io/extractor/@extracthub1/bbc-news-home)
**Extractor id:** `@extracthub1/bbc-news-home@1` · **Price:** $0.0025 per page

## Input

```
https://www.bbc.com/news      BBC News index (example)
https://www.bbc.com/          BBC home page
```

Section pages (`/business`, `/culture`, `/travel`, `/innovation`, `/future-planet`, `/news/world`,
`/news/us-canada`, `/news/technology`) work too: tested, same layout.

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | e.g. `BBC News - Breaking news, video and the latest top stories ...` |
| `pageUrl` | string \| null | canonical URL |
| `sections[]` | array | main navigation bar: `{ name, url, active }`: Home, News, Sport, Business, Technology, Health, Culture, Arts, Travel, Earth, Audio, Video, Live, Documentaries. `active` is `true` for the current one |
| `subsections[]` | array | second navigation bar, when the page has one: `{ name, url }`, e.g. on News: US & Canada, UK, Africa, Asia, Australia, Europe, Latin America, Middle East, In Pictures, BBC InDepth, BBC Verify; empty on the home page |
| `blocks[]` | array | story blocks in page order (required) |
| `blocks[].name` | string \| null | block title, e.g. `More to explore`, `Most read`, `US & Canada News`; `null` for the untitled top blocks |
| `blocks[].link` | string \| null | the block's "see more" link when its title is a link |
| `blocks[].stories[]` | array | `{ position, headline, url, summary, timeLabel, topic, image, imageAlt }` |

Story fields: `timeLabel` as shown (`2 hrs ago`), `topic` the tag under the card (`US & Canada`), `image` the card
image (`null` on text-only cards such as "Most read"), `url` `null` on video carousel cards that play in place.

Full example: [sample-output.json](sample-output.json) (`/news`; shortened to 3 of 7 blocks and 2 stories each).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/bbc-news-home@1" \
  --data-urlencode "target_url=https://www.bbc.com/news"
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Card variants:** BBC cards come in many layouts (lead story, grids, text-only lists, audio episodes, video
  carousels, "live" cards). The headline is read from the card headline, or from the episode title (`h3`) / the
  heading of audio cards, through a selector list with `combineStrategy: "first"`, so audio episodes keep their
  episode title rather than the show name.
- **Same story in several blocks:** the News index shows some stories more than once (49 cards, 37 different links);
  each occurrence is kept in its block.
- **Size:** about 50 stories on `/news`, 110+ on the home page (25 blocks including the per-topic grids).
- **Navigation:** `sections` is the main bar only; the full menu behind the menu button is not extracted. To walk
  the site, feed `sections[].url` / `subsections[].url` back into this extractor.
- **Promos left out:** custom promo cards (BBC podcasts, newsletters) without the story card marker are skipped.
- **US view:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the example page
