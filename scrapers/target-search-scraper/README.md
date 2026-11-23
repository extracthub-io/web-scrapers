# Target Search Scraper (search results and category pages)

Turn a Target (target.com) search results page or category page into JSON. You get the page title, results count,
page count and page links, plus the breadcrumbs and sibling categories on a category page and the related searches
on a search page. Each product on the page comes with TCIN, name, brand, category, image, price, struck-through
regular price, sale type, rating, rating count and product link. Good for price monitoring, assortment research
and building product lists for the [Target Product Scraper](../target-product-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/target-search](https://extracthub.io/extractor/@extracthub1/target-search)
**Extractor id:** `@extracthub1/target-search@1` · **Price:** $0.0035 per page

## Input

A Target search results page or category (product listing) page:

```
https://www.target.com/s?searchTerm=<query>
https://www.target.com/c/<category-slug>/-/N-<id>
```

e.g. `https://www.target.com/s?searchTerm=coffee+maker` or
`https://www.target.com/c/drip-coffee-makers-espresso-kitchen-appliances-dining/-/N-658ml`. Further pages add
`&Nao=24`, `&Nao=48`, ... (see `pageUrls`).

## Output

| Field | Type | Description |
|---|---|---|
| `title` | string \| null | the search query or the category name, e.g. `coffee maker`, `Drip Coffee Makers` |
| `resultsCount` | number \| null | e.g. `289` |
| `totalPages` | number \| null | e.g. `13` |
| `pageUrls` | string[] | links to the result pages, page 1 first |
| `breadcrumbs[]` | array | category pages only: `name`, `url` (`null` for the current category) |
| `categories[]` | array | category pages only: sibling categories, `name`, `url` (`null` for the current one) |
| `relatedSearches` | string[] | search pages only (not on every query), e.g. `best coffee maker` |
| `products[]` | array | the products on the page (24 per page) |
| `products[].position` | number | 1-based |
| `products[].tcin` | string | Target item id, e.g. `91863920` |
| `products[].name` | string \| null | e.g. `Mr. Coffee 12-Cup Programmable Coffee Maker Black` |
| `products[].brand` | string \| null | e.g. `Mr. Coffee` |
| `products[].brandUrl` | string \| null | the brand page on Target |
| `products[].category` | string \| null | e.g. `Coffee Makers` |
| `products[].image` | string \| null | product image |
| `products[].price` | number \| null | current price, e.g. `19.99`; `null` when Target hides it (`See price in cart`) |
| `products[].priceText` | string \| null | the price as given, e.g. `19.99` or `See price in cart` |
| `products[].regularPrice` | number \| null | struck-through regular price, e.g. `34.99` |
| `products[].currency` | string \| null | `USD` |
| `products[].priceType` | string \| null | `sale`, `reg`, `mixed_sale` (some variations on sale) or `null` |
| `products[].rating` | number \| null | average rating (1 to 5), e.g. `4.3` |
| `products[].ratingCount` | number \| null | e.g. `1060` |
| `products[].url` | string \| null | product link (input of the [Target Product Scraper](../target-product-scraper/)) |

Full example: [sample-output.json](sample-output.json) (the search page above; 3 of 24 products, 3 of 13 page
links and 5 of 20 related searches shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/target-search@1" \
  --data-urlencode "target_url=https://www.target.com/s?searchTerm=coffee+maker"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/target-search@1` on https://www.target.com/s?searchTerm=coffee+maker
> and list the products on sale with their discount in percent, biggest first.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Browser needed:** Target loads the product list in the browser, so this extractor uses JavaScript rendering
  through a US proxy. The products come from the page's schema.org `ItemList` data, the rest from the page.
- **One extractor, two page types:** search and category pages share the product grid. `breadcrumbs` and
  `categories` are empty on search pages; `relatedSearches` is empty on category pages and on some queries.
- **Price ranges:** for items with variations at different prices (`priceType` `mixed_sale`, shown as
  `$23.99 - $39.99`), `price` is the lowest price and `regularPrice` is often `null`.
- **Hidden prices:** some items show "See price in cart". Then `price` is `null` and `priceText` holds that text.
- **Variations:** `tcin` can be the id of one variation while `url` links to the parent product page.
- **No stock or delivery data:** availability depends on the shopper's store and ZIP code and is not returned.
- **Sponsored products** and the "Recommended for you" carousel are not included.
- **Tested** on 2 search pages (coffee maker, air fryer) and 2 category pages (Drip Coffee Makers, Espresso Machines).

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page (shortened)
