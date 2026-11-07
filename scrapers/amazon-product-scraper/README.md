# Amazon Product Scraper (product page)

Turn an Amazon.com product page into JSON: ASIN, title, brand, buy-box price, list price, star rating, review
count, availability, seller, the "About this item" bullets, the product images and the product overview
attributes. Good for price monitoring, catalog enrichment and competitor research. Pair it with the
[Amazon Search Scraper](../amazon-search-scraper/) to get ASINs for a keyword.

**Catalog:** [extracthub.io/extractor/@extracthub1/amazon-product](https://extracthub.io/extractor/@extracthub1/amazon-product)
**Extractor id:** `@extracthub1/amazon-product@1` · **Price:** $0.0025 per page

## Input

An Amazon.com product page:

```
https://www.amazon.com/dp/<ASIN>
https://www.amazon.com/<product-slug>/dp/<ASIN>
```

e.g. `https://www.amazon.com/dp/B0D1XD1ZV3`.

## Output

| Field | Type | Description |
|---|---|---|
| `asin` | string \| null | Amazon product id, e.g. `B0D1XD1ZV3` |
| `title` | string | product title |
| `brand` | string \| null | brand from the product overview table (missing on some pages, see `byline`) |
| `byline` | string \| null | the brand link under the title, e.g. `Visit the Apple Store` or `Brand: Amazon` |
| `price` | number \| null | buy-box price, e.g. `200.22` (`null` when no offer is shown) |
| `priceText` | string \| null | the price as shown, with currency symbol, e.g. `$200.22` |
| `listPrice` | number \| null | list / typical price shown next to the price, when there is one |
| `rating` | number \| null | average stars (1 to 5), e.g. `4.4` |
| `reviewsCount` | number \| null | number of ratings |
| `availability` | string \| null | e.g. `In Stock`, `Only 3 left in stock`, `Currently unavailable.` |
| `seller` | string \| null | seller of the buy-box offer, e.g. `Amazon.com` |
| `features[]` | string[] | the "About this item" bullets |
| `mainImage` | string \| null | main image, large size |
| `images[]` | string[] | product images, large size |
| `attributes[]` | array | product overview table: `{ name, value }`, e.g. `{ "name": "Capacity", "value": "12 cups" }` |

Full example: [sample-output.json](sample-output.json) (Apple AirPods Pro 2).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/amazon-product@1" \
  --data-urlencode "target_url=https://www.amazon.com/dp/B0D1XD1ZV3"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/amazon-product@1` on these 5 Amazon ASINs and make a table with price, list price,
> rating, review count and seller, sorted by price.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Buy-box price only:** `price` is the offer Amazon shows in the buy box for a US delivery address. It can
  be a used or third-party offer (the AirPods page showed a used offer when new stock was out). Other
  sellers' offers are not included.
- **No offer = `price: null`:** products without a buy box (e.g. `Currently unavailable.`) still return title,
  rating, features and images.
- **Pages differ by category:** books, media and fashion use other layouts; `attributes` and `brand` can be
  empty there. Core fields (title, rating, images) are on all product pages.
- **No title = failed request:** a page without the product title (a bot check, a removed product) fails with
  HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy; prices are in USD.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy; CSS fields)
- [`sample-output.json`](sample-output.json): output on a real product page
