# Kompas.com Section Scraper (section and channel pages)

Turn a Kompas.com section or channel page (www.kompas.com/tren, nasional.kompas.com, money.kompas.com,
tekno.kompas.com, ...) into JSON: the navigation bar and the stories on the page with headline, link, label, date
and image. Good for news monitoring and finding article links for the [Kompas.com Article Scraper](../kompas-article-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/kompas-section](https://extracthub.io/extractor/@extracthub1/kompas-section)
**Extractor id:** `@extracthub1/kompas-section@1` · **Price:** $0.0025 per page

## Input

```
https://www.kompas.com/tren          (example)
https://nasional.kompas.com/
https://money.kompas.com/
https://tekno.kompas.com/
https://www.kompas.com/sports
```

Tested on Tren, Nasional, Money, Tekno, Bola (`/sports`), Otomotif and Lifestyle. For the front page use the
[Kompas.com Home Scraper](../kompas-home-scraper/) (same output).

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string | the page `<title>` |
| `url` | string \| null | canonical link |
| `sections[]` | array | the navigation bar: `{ name, url }`: News, Kolom, Event, Jagat Literasi, Cahaya, Tekno, Otomotif, Bola, Lifestyle, Tren, Lestari, Money, Properti, Edukasi, Travel |
| `stories[]` | array | every story card, in page order (required) |
| `stories[].position` | number | 1-based position |
| `stories[].headline` | string | the headline |
| `stories[].url` | string | story link without `?source=...` (input for the [Kompas.com Article Scraper](../kompas-article-scraper/)) |
| `stories[].summary` | string \| null | lead text, on the cards that show one (Tekno, Bola, Otomotif) |
| `stories[].label` | string \| null | the label above the card, e.g. `Headline`, `Nasional`, `TREN`, `Gadget` |
| `stories[].dateLabel` | string \| null | date as shown, e.g. `26/11/2026, 21:00 WIB` or `26 November 2026` |
| `stories[].image` | string \| null | card image when it is in the HTML |
| `stories[].imageLazy` | string \| null | card image of lazy-loaded cards (`data-src`); use it when `image` is `null` |

Full example: [sample-output.json](sample-output.json) (shortened by the catalog to 5 sections and 5 stories).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/kompas-section@1" \
  --data-urlencode "target_url=https://www.kompas.com/tren"
```

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Three card layouts:** Kompas sections use different card styles: `articleItem` (home, Nasional, Money,
  Lifestyle), `trenLatest` (Tren) and `article__grid` (Tekno, Bola, Otomotif). The cards are read with one selector
  for all three, and each field uses a selector list with `combineStrategy: "first"` (`.articleTitle` →
  `.trenLatest__title` → `.article__title`, and the same for label and date).
- **Ads left out:** sponsored cards that link outside kompas.com are skipped.
- **20-55 stories** per section.
- **Indonesian view:** fetched through an Indonesian proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through an Indonesian proxy)
- [`sample-output.json`](sample-output.json): output on the example page
