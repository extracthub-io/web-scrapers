# Google Shopping Scraper (search results)

Turn a Google Shopping search into JSON: the products of the results grid (about 40 per page) with title,
price, original and typical price, discount, store, rating, review count, delivery note and Google's product
ids, plus the themed product groups Google shows above the grid ("Trail Running Shoes", "Deals on ...") and
the link to the next results. Good for price monitoring, assortment research and comparing stores.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-shopping](https://extracthub.io/extractor/@extracthub1/google-shopping)
**Extractor id:** `@extracthub1/google-shopping@1` · **Price:** $0.0025 per page

## Input

A Google Shopping search URL:

```
https://www.google.com/search?q=<search words>&tbm=shop&hl=en&gl=us
```

e.g. `https://www.google.com/search?q=running+shoes&tbm=shop&hl=en&gl=us`. The newer form `&udm=28` (instead of
`&tbm=shop`) works too. `hl` and `gl` pick the language and country.

## Output

| Field | Type | Description |
|---|---|---|
| `query` | string \| null | the search words, e.g. `running shoes` |
| `pageTitle` | string \| null | e.g. `running shoes - Google Shopping` |
| `products[]` | array | products of the results grid, in page order |
| `products[].position` | number | 1-based position in the grid |
| `products[].title` | string | e.g. `Nike Men's Revolution 8 Running Shoes` |
| `products[].price` | number | current price, e.g. `47.98` |
| `products[].priceText` | string \| null | as shown, e.g. `$47.98` |
| `products[].originalPrice` | number \| null | struck-through "was" price, e.g. `75`; `null` without a sale |
| `products[].typicalPrice` | number \| null | Google's "Usually $130" price, e.g. `130`; `null` when not shown |
| `products[].discount` | string \| null | badge, e.g. `36% OFF` |
| `products[].store` | string \| null | store of the shown offer, e.g. `Nike` |
| `products[].moreStores` | boolean | `true` when the card says "& more" (other stores sell it too) |
| `products[].rating` | number \| null | e.g. `4.5` |
| `products[].reviewCount` | number \| null | rounded as shown, e.g. `6600` for "6.6K" |
| `products[].delivery` | string \| null | e.g. `Free delivery on $75+` |
| `products[].catalogId` | string \| null | Google's catalog id of the product, e.g. `17322313108339414691` |
| `products[].productId` | string \| null | Google's product id, e.g. `15098876075884184890` |
| `products[].offerId` | string \| null | id of the shown offer |
| `products[].groupId` | string \| null | id shared by the variants of one product |
| `productGroups[]` | array | themed carousels above the grid |
| `productGroups[].title` | string | e.g. `Neutral Cushioned Running Shoes` |
| `productGroups[].products[]` | array | the products of the group, same fields as `products[]` |
| `nextPageUrl` | string \| null | link to more results, e.g. `https://www.google.com/search?q=running+shoes&hl=en&gl=us&udm=28&start=10` |

Full example: [sample-output.json](sample-output.json) (the `running shoes` search above; 5 of 40 products and
2 products per group shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-shopping@1" \
  --data-urlencode "target_url=https://www.google.com/search?q=running+shoes&tbm=shop&hl=en&gl=us"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-shopping@1` on
> https://www.google.com/search?q=running+shoes&tbm=shop&hl=en&gl=us
> and list the 10 cheapest products with their store and rating.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the products are in the page HTML; no browser is needed, fetched through a US proxy.
- **No product or store links:** Google opens products in an overlay, so the HTML has no link to the product
  or the store. Use the ids (`catalogId`, `productId`, `offerId`) to match products between runs.
- **No images:** Google fills the thumbnails in with a script after the page loads.
- **Results change per request:** order, prices and the product groups differ between calls, as in a browser.
- **Product groups:** Google only ships the first groups filled in; groups it loads later are left out. A
  product can be in a group and in the grid.
- **More results:** `nextPageUrl` is on the first page; the page behind it returned 40 further products in our
  test, without a link of its own. Raise `start` yourself (10, 20, ...) for more.
- **Review counts** are rounded by Google (`1K`, `6.6K`), so `reviewCount` is approximate above 999.
- **Selectors:** Google's class names are generated and change from time to time; if a field comes back empty,
  check the catalog page for a newer version.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page (shortened)
