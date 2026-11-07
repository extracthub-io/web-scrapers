# eBay Item Scraper (listing page)

Turn an eBay.com item page into JSON: title, price, currency, list price, condition, availability, quantity
available and sold, shipping cost, return window, brand, model, seller with feedback score, all item
specifics, the photos and the category breadcrumb. Good for price checks, resale research and enriching
results of the [eBay Search Scraper](../ebay-search-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/ebay-item](https://extracthub.io/extractor/@extracthub1/ebay-item)
**Extractor id:** `@extracthub1/ebay-item@1` · **Price:** $0.0025 per page

## Input

An eBay.com item page:

```
https://www.ebay.com/itm/<item number>
```

e.g. `https://www.ebay.com/itm/127943697081`.

## Output

| Field | Type | Description |
|---|---|---|
| `title` | string | listing title |
| `url` | string \| null | canonical item link |
| `price` | number \| null | price, e.g. `391.33` |
| `currency` | string \| null | e.g. `USD` |
| `priceText` | string \| null | the price as shown, e.g. `US $499.99 or Best Offer` |
| `listPrice` | number \| null | list price shown as struck-through, when there is one |
| `condition` | string \| null | schema.org condition: `NewCondition`, `UsedCondition`, `RefurbishedCondition`, ... |
| `availability` | string \| null | schema.org availability, e.g. `InStock` |
| `quantityAvailable` | number \| null | items left, when the seller shows it |
| `soldCount` | number \| null | items sold, when shown |
| `shippingCost` | number \| null | shipping cost to the US (`0` = free) |
| `returnDays` | number \| null | return window in days, `null` when returns are not accepted or not stated |
| `brand` | string \| null | brand |
| `model` | string \| null | model |
| `mainImage` | string \| null | main photo |
| `images[]` | string[] | all photos of the listing, large size |
| `sellerName` | string \| null | seller (store name or user name) |
| `sellerFeedbackCount` | number \| null | seller feedback score |
| `sellerPositivePercent` | number \| null | positive feedback, e.g. `99.7` |
| `itemSpecifics[]` | array | the "Item specifics" table: `{ name, value }` (long values are cut by eBay with `...`) |
| `categories[]` | array \| null | breadcrumb as schema.org `ListItem`s: `position`, `name`, `item` (link) |

Full example: [sample-output.json](sample-output.json) (a refurbished iPhone 15; item specifics and
images shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/ebay-item@1" \
  --data-urlencode "target_url=https://www.ebay.com/itm/127943697081"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/ebay-item@1` on these eBay listings and compare price + shipping, condition, return
> window and seller feedback in one table.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Tested on fixed-price listings** (Buy It Now, with and without Best Offer). Auctions were not part of the
  tests; check `priceText` there.
- **Breadcrumb missing on some pages:** eBay leaves it out of the page data for some listings; then
  `categories` is `null`.
- **Seller names:** for private sellers the user name is personal data: only store it when you have a
  reason to.
- **No title = failed request:** a page without the listing title (a bot check, an ended and removed item)
  fails with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy; prices and shipping are for the US.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy; JSON-LD + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real item page (lists shortened)
