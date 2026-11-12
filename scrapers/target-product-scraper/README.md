# Target Product Scraper (product page)

Turn a Target (target.com) product page into JSON: TCIN, DPCI, UPC, name, brand, current and regular price, price
text, rating, ratings / reviews / questions counts, highlights, specifications, description, images, category
breadcrumbs and variations. Good for price tracking, retail catalogs and competitor research.

**Catalog:** [extracthub.io/extractor/@extracthub1/target-product](https://extracthub.io/extractor/@extracthub1/target-product)
**Extractor id:** `@extracthub1/target-product@1` · **Price:** $0.0035 per page

## Input

A Target product page:

```
https://www.target.com/p/<name-slug>/-/A-<tcin>
```

e.g. `https://www.target.com/p/bella-12-cup-programmable-coffee-maker/-/A-94482826`.

## Output

| Field | Type | Description |
|---|---|---|
| `tcin` | string | Target item id, e.g. `94482826` |
| `dpci` | string \| null | Target department-class-item number; `null` on a product with variations |
| `upc` | string \| null | barcode; `null` on a product with variations |
| `name` | string | product name, e.g. `bella 12 Cup Programmable Coffee Maker Blossom` |
| `brand` | string \| null | e.g. `bella Housewares` |
| `price` | number \| null | current price, e.g. `29.99`; `null` when Target hides it (`See price in cart`) |
| `priceText` | string \| null | the price as shown, e.g. `$29.99` or `See price in cart` |
| `regularPrice` | number \| null | regular price shown next to a sale price, e.g. `39.99` |
| `rating` | number \| null | average rating (1 to 5), e.g. `4.37` |
| `ratingCount` | number \| null | number of ratings, e.g. `626` |
| `reviewCount` | number \| null | number of written reviews, e.g. `394` |
| `questionCount` | number \| null | number of questions, e.g. `37` |
| `category` | string \| null | e.g. `Drip Coffee Makers` |
| `breadcrumbs[]` | string[] | category path, e.g. `["Target", "Kitchen & Dining", "Kitchen Appliances", "Coffee & Espresso Makers", "Drip Coffee Makers"]` |
| `highlights[]` | string[] \| null | feature bullets |
| `specifications[]` | string[] | specifications as text, e.g. `Weight: 2.68 Pounds` |
| `description` | string \| null | product description |
| `primaryImage` | string \| null | main product image |
| `images[]` | string[] | other product images |
| `variations[]` | array \| null | sibling variations as `{ name, value, tcin }`, e.g. `Color` = `Blossom` |
| `url` | string \| null | canonical product link |

Full example: [sample-output.json](sample-output.json) (bella 12 Cup Programmable Coffee Maker, TCIN 94482826;
highlights, specifications and images shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/target-product@1" \
  --data-urlencode "target_url=https://www.target.com/p/bella-12-cup-programmable-coffee-maker/-/A-94482826"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/target-product@1` on these Target product links and make a table of name, brand, price,
> regular price and rating, sorted by discount.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Browser needed:** Target sends the price only after the page runs in a browser, so this extractor uses
  JavaScript rendering. Everything except the price block comes from the page's embedded data.
- **Hidden prices:** some items show "See price in cart". Then `price` is `null` and `priceText` holds that text.
- **Products with variations:** a page with colors or sizes is a parent item. `dpci` and `upc` are then `null`,
  and `variations` lists the children; pass a child's TCIN to get its own data.
- **No stock field:** availability on Target depends on the shopper's store and ZIP code, so it is not returned.
- **Removed products / bot checks:** a page without TCIN or name fails with HTTP 422 `required_fields_missing` and
  is still charged. Batches retry it once.
- **Reviews:** only the rating and the counts are returned, no review texts or reviewer names.
- **US store:** fetched through a US proxy from target.com.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real product page
