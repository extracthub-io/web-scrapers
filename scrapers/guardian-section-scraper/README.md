# The Guardian Section Scraper (headlines of a Guardian section front)

Turn a Guardian section or topic front into JSON: the page's containers in page order ("Technology", "AI",
"Features", "Opinion & analysis", "Reviews", ...) with their name, id and link, and per story the position,
headline, kicker, link, trail text, published time, card type (news, feature, analysis, comment, review, media,
live), Video / Audio label and duration, image and the sub-links under lead stories. Good for news monitoring,
headline feeds and media research.

**Catalog:** [extracthub.io/extractor/@extracthub1/guardian-section](https://extracthub.io/extractor/@extracthub1/guardian-section)
**Extractor id:** `@extracthub1/guardian-section@1` · **Price:** $0.0025 per page

## Input

A Guardian section or topic front on theguardian.com:

```
https://www.theguardian.com/<section>
```

e.g. `https://www.theguardian.com/technology` (Technology). Also tested on `/world` and `/business`.

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | e.g. `Technology news, features and analysis from Guardian US \| The Guardian` |
| `description` | string | the front's meta description |
| `canonicalUrl` | string | canonical URL of the edition served, e.g. `https://www.theguardian.com/us/technology` |
| `edition` | string \| null | edition the page was rendered for, e.g. `US` (`UK`, `AU`, `EUR`, `INT`) |
| `sections[]` | array | main navigation: `{ name, url }`: News, Opinion, Sport, Culture, Lifestyle |
| `subsections[]` | array | the subsections bar under it: `{ name, url }`, e.g. UK, US politics, World, Climate crisis, Tech ... (differs per edition and page) |
| `containers[]` | array | the story containers of the page, in page order (required) |
| `containers[].name` | string | container title, e.g. `Technology`, `AI`, `Opinion & analysis` |
| `containers[].id` | string \| null | container id, e.g. `ai`; `null` for the first container |
| `containers[].link` | string \| null | the container's "more" link when the title is a link, e.g. `https://www.theguardian.com/technology/artificialintelligenceai` |
| `containers[].stories[]` | array | the stories of the container |
| `stories[].position` | number | 1-based position in the container |
| `stories[].headline` | string | e.g. `Chinese media hail Huang’s Nvidia return with warning over ‘witch-hunts’` |
| `stories[].kicker` | string \| null | the small label before the headline, e.g. `Nvidia`, `Live` |
| `stories[].url` | string | e.g. `https://www.theguardian.com/technology/2026/nov/24/china-media-jensen-huang-nvidia-ceo` |
| `stories[].trailText` | string \| null | standfirst shown under lead headlines only |
| `stories[].publishedAt` | string \| null | ISO time, e.g. `2026-11-24T14:45:03.000Z`; only on cards that show a time |
| `stories[].timeLabel` | string \| null | relative time as rendered for the fetch, e.g. `11h ago` |
| `stories[].cardType` | string \| null | Guardian card type: `news`, `feature`, `analysis`, `comment`, `review`, `media`, `live`, `dead` (a finished live blog) |
| `stories[].footerLabel` | string \| null | card footer label, e.g. `Video`, `Audio`, `Newsletter` |
| `stories[].duration` | string \| null | media length, e.g. `1:19` |
| `stories[].image` / `imageAlt` | string \| null | card image URL (as sized for the card) and its alt text |
| `stories[].sublinks[]` | array | related links under a lead story: `headline`, `kicker`, `url` |

Full example: [sample-output.json](sample-output.json) (the Technology front above; shortened to 3 containers with
2 stories each; the page had 8 containers and 36 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/guardian-section@1" \
  --data-urlencode "target_url=https://www.theguardian.com/technology"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/guardian-section@1` on
> https://www.theguardian.com/technology
> and list the top stories of every container with their links.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through the proxy: Guardian fronts are server-rendered, no browser is needed.
- **Edition:** the Guardian picks the edition (US, UK, Australia, Europe, International) from the visitor's
  location, so containers and their order follow the edition the proxy got (`edition`, `canonicalUrl`). All test
  fetches were served the US edition.
- **Containers differ per section:** Technology had 8 containers (36 stories), World 9, Business 4. The same story
  can appear in two containers. The "Most viewed" list is not included (it is loaded in the browser).
- **Times only on some cards:** only cards that display a time have `publishedAt`; use the
  [Guardian Article Scraper](../guardian-article-scraper/) on a story for its exact publish and update time.
- **Trail text** is shown only on lead cards, so most stories have `trailText: null`.
- **Markup:** cards are read by stable hooks (`section[data-container-level]`, `h3.card-headline`, `data-link-name`);
  the sub-link list is scoped by an inline style attribute and is the most fragile part.
- **Content changes all the time:** the front is updated many times a day, so two calls rarely match.

## Versions

- **1.1.0:** adds `sections` and `subsections` (navigation). No breaking changes.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through the proxy)
- [`sample-output.json`](sample-output.json): output on the Technology front (shortened)
