# AliExpress Product Scraper (product page)

Turn an AliExpress product page into JSON: product id, title, brand, current price, original price, currency,
availability, star rating, reviews count, sold count, store name, store link and store feedback, shipping and
delivery lines, options (color, size, capacity, ...), images and the specifications table. Good for price
monitoring, dropshipping research and comparing stores.

**Catalog:** [extracthub.io/extractor/@extracthub1/aliexpress-product](https://extracthub.io/extractor/@extracthub1/aliexpress-product)
**Extractor id:** `@extracthub1/aliexpress-product@1` · **Price:** $0.0035 per page

## Input

An AliExpress product page:

```
https://www.aliexpress.com/item/<product-id>.html
```

e.g. `https://www.aliexpress.com/item/1005007621004768.html`.

## Output

| Field | Type | Description |
|---|---|---|
| `productId` | string \| null | product id of the link, e.g. `1005007621004768` |
| `title` | string | product title |
| `url` | string \| null | the product page AliExpress serves for the US (aliexpress.us, with its own id) |
| `brand` | string \| null | brand, when the seller set one, e.g. `Mikenoon` |
| `price` | number \| null | current price of the selected option, e.g. `1.09` |
| `listPrice` | number \| null | price in the page's product data (usually the same as `price`) |
| `originalPrice` | number \| null | struck-through price, e.g. `5.62` |
| `currency` | string \| null | e.g. `USD` |
| `availability` | string \| null | e.g. `InStock`, `OutOfStock` |
| `rating` | number \| null | average stars (1 to 5), e.g. `4.6` |
| `reviewsCount` | number \| null | number of reviews, e.g. `742` |
| `sold` | string \| null | sold count as shown, e.g. `5,000+ sold` |
| `store` | string \| null | store name, e.g. `Ormogo Store` |
| `storeUrl` | string \| null | store page, e.g. `https://www.aliexpress.com/store/1102800090` |
| `storeFeedback` | string \| null | e.g. `95.2% Positive Feedback \| 591 Followers` |
| `shipping[]` | string[] | shipping lines, e.g. `Free shipping`, `Delivery: Nov 15 - 20 (87.3% ≤ 13 days)` |
| `options[]` | array | product options: `{ name, selected, values[], imageValues[] }`, e.g. `{ "name": "Emitting Color", "selected": "1pc", "imageValues": ["1pc", "2pcs"] }` (`values` = text options, `imageValues` = options shown as pictures) |
| `images[]` | string[] | product images, full size |
| `specifications[]` | array | specifications table: `{ name, value }`, e.g. `{ "name": "Model Number", "value": "SD-1819" }` |

Full example: [sample-output.json](sample-output.json) (LED flashlight; images shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/aliexpress-product@1" \
  --data-urlencode "target_url=https://www.aliexpress.com/item/1005007621004768.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/aliexpress-product@1` on these 5 AliExpress product links and make a table with price,
> original price, rating, reviews, sold count and store feedback, sorted by price.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Browser rendering:** AliExpress sends an empty page shell and loads the product with JavaScript, so this
  extractor renders the page in a browser (JavaScript tier, $0.0035). Some calls end with a provider timeout
  (`upstream_timeout`); batches retry a failed URL once, and a later retry usually works.
- **US store:** fetched through a US proxy, so AliExpress shows the US site (aliexpress.us): prices in USD,
  US shipping and delivery dates. `url` is that US page; `productId` is the id of the link you passed.
- **Price of the selected option:** `price` and `originalPrice` are for the option AliExpress selects first;
  other options can cost more. Prices change often (coupons, "Dollar Express" deals for new users).
- **Title suffix:** AliExpress sometimes appends ` - AliExpress <number>` to the title.
- **Removed products:** AliExpress shows "Sorry, the page you requested can not be found" for removed items;
  such a page has no title and fails with HTTP 422 `required_fields_missing` (still charged).
- **Reviews:** only the rating and reviews count; the review texts are not included.

## Files

- [`extractor.json`](extractor.json): the extractor definition (browser rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real product page
