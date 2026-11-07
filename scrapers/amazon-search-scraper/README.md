# Amazon Search Scraper (search results)

Turn an Amazon.com search results page into JSON: for every product on the page its ASIN, title, link,
image, price, list price, rating, ratings count, "bought in past month", badge (Best Seller, Overall Pick,
deals) and delivery message, plus the result summary and the next page link. Good for keyword research,
price tracking across a category and finding ASINs for the
[Amazon Product Scraper](../amazon-product-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/amazon-search](https://extracthub.io/extractor/@extracthub1/amazon-search)
**Extractor id:** `@extracthub1/amazon-search@1` · **Price:** $0.0025 per page

## Input

An Amazon.com search page:

```
https://www.amazon.com/s?k=<keywords>
https://www.amazon.com/s?k=<keywords>&page=2
```

e.g. `https://www.amazon.com/s?k=wireless+earbuds`.

## Output

| Field | Type | Description |
|---|---|---|
| `resultsSummary` | string \| null | e.g. `1-16 of over 20,000 results for "wireless earbuds"` |
| `products[]` | array | the products on the page, in page order |
| `products[].position` | number | position on the page (1 = first) |
| `products[].asin` | string | Amazon product id |
| `products[].title` | string | product title |
| `products[].url` | string \| null | product page, without tracking parameters |
| `products[].image` | string \| null | thumbnail |
| `products[].price` | number \| null | current price (the lowest when the product has options) |
| `products[].listPrice` | number \| null | struck-through list / typical price |
| `products[].rating` | number \| null | average stars (1 to 5) |
| `products[].ratingsCount` | number \| null | number of ratings |
| `products[].boughtPastMonth` | string \| null | e.g. `10K+ bought in past month` |
| `products[].badge` | string \| null | e.g. `Best Seller`, `Overall Pick`, `Limited time deal` |
| `products[].delivery` | string \| null | delivery message, e.g. `FREE delivery Nov 12 - 16` |
| `nextPageUrl` | string \| null | link to the next page |

Full example: [sample-output.json](sample-output.json) ("wireless earbuds"; shortened to 3 products).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/amazon-search@1" \
  --data-urlencode "target_url=https://www.amazon.com/s?k=wireless+earbuds"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/amazon-search@1` on the first 3 pages of amazon.com/s?k=yoga+mat and list the 10 products
> with the most ratings, with price, rating and badge.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **16 to 48 products per page:** Amazon sends 16 products in the page HTML for some keywords and 48 for
  others; the rest of a 16-product page is loaded by the browser later and is not included. Follow
  `nextPageUrl` for more.
- **Sponsored products** are included where Amazon puts them in the result list; for some of them `url` is
  `null`. `asin` is always set, so `https://www.amazon.com/dp/<asin>` always works.
- **Prices:** `price` is the price shown on the card. Some cards show no price (only "See options"); then it
  is `null`.
- **No products = failed request:** a page without products (a bot check, a search with no results) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy; prices are in USD.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy; CSS fields)
- [`sample-output.json`](sample-output.json): output on a real search page
