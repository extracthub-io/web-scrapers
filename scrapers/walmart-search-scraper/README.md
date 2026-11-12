# Walmart Search Scraper (search results)

Turn a Walmart.com search results page into JSON: for every product on the page its item id, name, link,
image, price, rating, reviews count, seller, availability, badge (Rollback, Best seller, "100+ bought since
yesterday") and whether it is sponsored, plus the result title, the total number of results and the number of
pages. Good for keyword research, price tracking across a category and finding item ids for the
[Walmart Product Scraper](../walmart-product-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/walmart-search](https://extracthub.io/extractor/@extracthub1/walmart-search)
**Extractor id:** `@extracthub1/walmart-search@1` · **Price:** $0.0025 per page

## Input

A Walmart.com search page:

```
https://www.walmart.com/search?q=<keywords>
https://www.walmart.com/search?q=<keywords>&page=2
```

e.g. `https://www.walmart.com/search?q=air+fryer`.

## Output

| Field | Type | Description |
|---|---|---|
| `resultsTitle` | string \| null | e.g. `Results for "air fryer"` |
| `totalResults` | number \| null | number of results Walmart reports, e.g. `2349` |
| `maxPage` | number \| null | number of result pages you can open (`&page=1` to `&page=<maxPage>`) |
| `products[]` | array | the products on the page, in page order (about 40 to 60) |
| `products[].position` | number | position on the page (1 = first) |
| `products[].itemId` | string | Walmart item id (the number at the end of the product link) |
| `products[].name` | string | product name |
| `products[].url` | string \| null | product page, without tracking parameters |
| `products[].image` | string \| null | product image |
| `products[].price` | number \| null | current price, e.g. `64.97` |
| `products[].currency` | string \| null | e.g. `USD` |
| `products[].rating` | number \| null | average stars (1 to 5) |
| `products[].reviewsCount` | number \| null | number of reviews |
| `products[].seller` | string \| null | e.g. `Walmart.com` or a marketplace seller |
| `products[].availability` | string \| null | e.g. `In stock`, `Out of stock` |
| `products[].badge` | string \| null | e.g. `Rollback`, `Best seller`, `Overall pick`, `In 500+ people's carts` |
| `products[].sponsored` | boolean \| null | `true` for sponsored placements |
| `products[].productType` | string \| null | Walmart's product type, e.g. `Air Fryers` |

Full example: [sample-output.json](sample-output.json) ("air fryer"; shortened to 3 products).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/walmart-search@1" \
  --data-urlencode "target_url=https://www.walmart.com/search?q=air+fryer"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/walmart-search@1` on the first 3 pages of walmart.com/search?q=coffee+maker and list the
> 10 products with the most reviews, with price, rating and seller.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Read from the page data:** the products come from the JSON Walmart embeds in the page, not from the
  visible cards, so all products of the page are returned with a plain fetch (no browser needed).
- **Sponsored items can repeat:** Walmart sometimes shows the same product as a sponsored placement and as
  an organic result on one page; both are returned (with different `position` and `sponsored`). Deduplicate
  on `itemId` if you need unique products.
- **Results vary per request:** sponsored placements and the order of results change between requests, like
  in a browser.
- **No was-price here:** search cards only carry the current price. Use the
  [Walmart Product Scraper](../walmart-product-scraper/) for `wasPrice` and savings.
- **No products = failed request:** a page without products (a bot check, a search with no results) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy; prices are in USD and availability is for a US store location.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy; page JSON)
- [`sample-output.json`](sample-output.json): output on a real search page
