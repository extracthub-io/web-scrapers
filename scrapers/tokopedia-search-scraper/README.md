# Tokopedia Search Scraper (search results)

Turn a Tokopedia (tokopedia.com, Indonesia) search page into JSON: the 60 products of the page with product id,
name, link, image, price in rupiah, original price, rating, labels (sold count, promo and discount badges, COD),
shop name, shop link and city, and category, plus the total number of results. Good for Indonesian price and
keyword research, marketplace monitoring and finding product links for the
[Tokopedia Product Scraper](../tokopedia-product-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/tokopedia-search](https://extracthub.io/extractor/@extracthub1/tokopedia-search)
**Extractor id:** `@extracthub1/tokopedia-search@1` · **Price:** $0.0035 per page

## Input

A Tokopedia search page:

```
https://www.tokopedia.com/search?q=<keywords>
```

e.g. `https://www.tokopedia.com/search?q=sepatu+lari`.

## Output

| Field | Type | Description |
|---|---|---|
| `search.totalResults` | number \| null | number of matching products, e.g. `104034` |
| `search.products[]` | array | the 60 products of the page, in page order |
| `search.products[].position` | number | position on the page (1 = first) |
| `search.products[].productId` | string | Tokopedia product id, e.g. `103239570052` |
| `search.products[].name` | string | product name |
| `search.products[].url` | string \| null | product link, without tracking parameters |
| `search.products[].image` | string \| null | thumbnail (300 px) |
| `search.products[].price` | number \| null | current price in IDR, e.g. `3369000` |
| `search.products[].priceText` | string \| null | price as shown, e.g. `Rp3.369.000` |
| `search.products[].originalPrice` | number \| null | price before the discount, when on sale, e.g. `3399000` |
| `search.products[].discountPercent` | number \| null | Tokopedia's own discount field (usually `0`; compare `price` with `originalPrice`, or read the `%` label) |
| `search.products[].rating` | number \| null | average rating (1 to 5) |
| `search.products[].labels[]` | string[] | card labels, e.g. `["10 terjual", "Harga Diskon", "37%", "Bisa COD"]` (`terjual` = sold) |
| `search.products[].shopName` | string \| null | e.g. `SALOMON Indonesia` |
| `search.products[].shopUrl` | string \| null | shop page, e.g. `https://www.tokopedia.com/salomon-indonesia` |
| `search.products[].shopCity` | string \| null | shop location, e.g. `Jakarta Utara` |
| `search.products[].category` | string \| null | category path, e.g. `olahraga/perlengkapan-lari/sepatu-lari-wanita` |
| `search.products[].adId` | string \| null | ad id for promoted products, `""` for organic ones |

Full example: [sample-output.json](sample-output.json) ("sepatu lari"; shortened to 3 products).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tokopedia-search@1" \
  --data-urlencode "target_url=https://www.tokopedia.com/search?q=sepatu+lari"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tokopedia-search@1` on tokopedia.com/search?q=sepatu+lari and list the 10 cheapest products
> from Official Store shops with their price, sold label and shop city.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Rendered in a browser:** Tokopedia's search HTML holds no products; the page loads them from its own search
  API. This extractor renders the page (JavaScript tier, $0.0035) and reads that API response, so it returns
  all 60 products of the page as clean data, not only the 15 drawn on screen at first.
- **Nested output:** the data sits under `search` (`search.totalResults`, `search.products`).
- **Sold count is a label:** Tokopedia sends sold counts as text labels (`60+ terjual`), so they are in
  `labels`, not in a number field. The [Tokopedia Product Scraper](../tokopedia-product-scraper/) gives the
  exact `soldCount`.
- **Prices in rupiah:** fetched through an Indonesian proxy; prices are plain numbers in IDR.
- **Results change:** order and promoted products differ between requests, like in a browser.
- **Image links expire:** Tokopedia signs image URLs with an expiry time (`x-expires`).
- **No products = failed request:** a response without products (a bot check, a search with no results) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering and capture of the page's
  search API response, through an Indonesian proxy)
- [`sample-output.json`](sample-output.json): output on a real search page
