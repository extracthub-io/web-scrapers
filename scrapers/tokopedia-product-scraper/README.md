# Tokopedia Product Scraper (product page)

Turn a Tokopedia (tokopedia.com, Indonesia) product page into JSON: product id, name, price in rupiah, original
price and discount when on sale, rating, reviews count, sold count, stock, condition, weight, minimum order, shop
name, id and domain, official store flag, category breadcrumbs, variant options (and which are sold out),
description and images. Good for Indonesian price monitoring, marketplace and competitor research, and catalog
enrichment. Product links come from the [Tokopedia Search Scraper](../tokopedia-search-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/tokopedia-product](https://extracthub.io/extractor/@extracthub1/tokopedia-product)
**Extractor id:** `@extracthub1/tokopedia-product@1` · **Price:** $0.0025 per page

## Input

A Tokopedia product page:

```
https://www.tokopedia.com/<shop-domain>/<product-slug>
```

e.g. `https://www.tokopedia.com/puma-official/puma-sepatu-lari-maxstride-lite-unisex-puma-black-cool-dark-gray-1737624245960803641-1737624235586651449`.

## Output

| Field | Type | Description |
|---|---|---|
| `productId` | string | Tokopedia product id, e.g. `104276587934` |
| `name` | string | product name with the selected variant, e.g. `Puma Sepatu Lari MaxStride Lite Unisex PUMA Black-Cool Dark Gray - 42` |
| `price` | number | current price in IDR, e.g. `899000` |
| `priceText` | string \| null | price as shown, e.g. `Rp899.000` |
| `originalPrice` | number \| null | price before the discount, when on sale |
| `discountPercent` | number \| null | discount in percent, when Tokopedia shows one |
| `rating` | number \| null | average rating (1 to 5), e.g. `5` |
| `reviewCount` | number \| null | number of reviews, e.g. `5` |
| `soldCount` | number \| null | number sold, e.g. `26` |
| `stockText` | string \| null | stock as shown, e.g. `Stok : Sisa 10` (`Stok : Habis` = sold out) |
| `condition` | string \| null | `NEW` or `USED` |
| `weight` | number \| null | shipping weight, e.g. `0.5` |
| `weightUnit` | string \| null | e.g. `KILOGRAM` |
| `minOrder` | number \| null | minimum order quantity, e.g. `1` |
| `shopName` | string \| null | e.g. `PUMA Indonesia` |
| `shopId` | string \| null | Tokopedia shop id, e.g. `9110660` |
| `shopDomain` | string \| null | shop part of the link, e.g. `puma-official` (shop page: `https://www.tokopedia.com/<shopDomain>`) |
| `officialStore` | boolean \| null | `true` for Official Store (Mall) shops |
| `breadcrumbs[]` | string[] | category path, e.g. `["Home", "Olahraga", "Perlengkapan Lari", "Sepatu Lari Pria", "..."]` |
| `variantTitle` | string \| null | first variant group and the selected option, e.g. `Pilih puma black : 42` |
| `variantOptions[]` | string[] | all variant options on the page (sizes, colors), e.g. `["42", "38", "41"]` |
| `soldOutOptions[]` | string[] | the options that are out of stock |
| `description` | string \| null | product description, line breaks kept |
| `image` | string \| null | main image (700 px) |
| `images[]` | string[] | gallery thumbnails |
| `url` | string | product link |

Full example: [sample-output.json](sample-output.json) (Puma MaxStride Lite running shoes; variant options and
images shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/tokopedia-product@1" \
  --data-urlencode "target_url=https://www.tokopedia.com/puma-official/puma-sepatu-lari-maxstride-lite-unisex-puma-black-cool-dark-gray-1737624245960803641-1737624235586651449"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/tokopedia-product@1` on these Tokopedia links and make a table of name, price, original
> price, sold count, rating and shop, sorted by price.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything comes from the HTML Tokopedia sends (meta tags, the page itself and the data
  embedded in its scripts). No browser is needed.
- **Prices in rupiah:** fetched through an Indonesian proxy; `price` is a plain number in IDR (`899000` =
  Rp899.000).
- **Variants:** the link opens one variant (its name ends with the variant, e.g. `- 42`); price and stock are
  that variant's. `variantOptions` lists every option of all variant groups in page order (colors first, then
  sizes on products with two groups).
- **Sold count and stock:** `soldCount` is Tokopedia's own count for the product; `stockText` is as written on
  the page (`Sisa 10` = 10 left, `Habis` = sold out).
- **Image links expire:** Tokopedia signs image URLs with an expiry time (`x-expires`); download the images
  soon after the call if you need them.
- **Removed products / bot checks:** a page without product id, name or price fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through an Indonesian proxy)
- [`sample-output.json`](sample-output.json): output on a real product page
