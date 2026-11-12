# Best Buy Product Scraper (product page)

Turn a Best Buy (bestbuy.com) product page into JSON: SKU, product id, name, brand, model, color, price,
comparable value and savings, availability, every offer (new and the open-box conditions with their prices),
rating, reviews count, images, description, the full specifications list and the category breadcrumbs. Good
for price tracking, open-box deal alerts, product catalogs and competitor research.

**Catalog:** [extracthub.io/extractor/@extracthub1/bestbuy-product](https://extracthub.io/extractor/@extracthub1/bestbuy-product)
**Extractor id:** `@extracthub1/bestbuy-product@1` · **Price:** $0.0025 per page

## Input

A Best Buy product page:

```
https://www.bestbuy.com/product/<name-slug>/<productId>/sku/<sku>
```

e.g. `https://www.bestbuy.com/product/lenovo-ideapad-slim-3-15-6-full-hd-laptop-amd-ryzen-5-40-2025-8gb-memory-256gb-storage-abyss-blue/JJGH3Q8P2K/sku/6668500`.

## Output

| Field | Type | Description |
|---|---|---|
| `sku` | string | Best Buy SKU, e.g. `6668500` |
| `productId` | string \| null | Best Buy product id, e.g. `JJGH3Q8P2K` |
| `name` | string | product name, e.g. `Lenovo - IdeaPad Slim 3 15.6" Full HD Laptop - ...` |
| `brand` | string \| null | e.g. `Lenovo` |
| `model` | string \| null | manufacturer model number, e.g. `82XQ012GUS` |
| `color` | string \| null | e.g. `Abyss Blue` |
| `price` | number \| null | current price of the new product, e.g. `349.99` |
| `currency` | string \| null | `USD` |
| `compValue` | number \| null | "Comp. Value" (comparable value) shown next to a discounted price, e.g. `629.99` |
| `savings` | number \| null | savings shown ("Save $280"), e.g. `280` |
| `availability` | string \| null | schema.org availability of the new product, e.g. `InStock`, `OutOfStock` |
| `offers[]` | array | every offer: `{ condition, price, availability }`, e.g. `New`, `Open-Box Excellent`, `Open-Box Good`, `Open-Box Fair` |
| `rating` | number \| null | average rating (1 to 5), e.g. `4.7` |
| `reviewCount` | number \| null | number of reviews, e.g. `337` |
| `images[]` | string[] | product images |
| `description` | string \| null | short product description |
| `specifications[]` | array | specifications as `{ name, value }`, e.g. `Screen Size` = `15.6 inches`, `UPC` = `199273537594` |
| `breadcrumbs[]` | string[] | category path, e.g. `["Best Buy", "Computers & Tablets", "Laptops", "All Laptops", "Windows Laptops"]` |
| `url` | string \| null | canonical product link (without the `/sku/...` part) |

Full example: [sample-output.json](sample-output.json) (Lenovo IdeaPad Slim 3, SKU 6668500; specifications
shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/bestbuy-product@1" \
  --data-urlencode "target_url=https://www.bestbuy.com/product/lenovo-ideapad-slim-3-15-6-full-hd-laptop-amd-ryzen-5-40-2025-8gb-memory-256gb-storage-abyss-blue/JJGH3Q8P2K/sku/6668500"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/bestbuy-product@1` on these Best Buy product links and make a table of name, price,
> Comp. Value, savings and the cheapest open-box offer, sorted by savings.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** almost every field comes from the schema.org `Product` data in the HTML Best Buy sends;
  `compValue` and `savings` come from the price block. No browser is needed.
- **Slow pages:** Best Buy product pages took about two minutes each to fetch through the proxy in our tests,
  longer than some HTTP / MCP clients wait. Give realtime calls a long timeout, or use a batch (the better fit
  for many products anyway).
- **Open-box prices:** `price` is the new product's price; `offers` also lists the open-box conditions Best Buy
  sells, each with its own price.
- **No sale = no comp. value:** `compValue` and `savings` are `null` when the product is not discounted.
- **Specifications repeat a few keys:** Best Buy lists a short "key specs" block before the full list, so names
  such as `Screen Size` can appear twice with the same value.
- **Removed products / bot checks:** a page without SKU or name fails with HTTP 422 `required_fields_missing` and
  is still charged. Batches retry it once.
- **Reviews:** only the rating and reviews count are returned, no review texts or reviewer names.
- **US store:** fetched through a US proxy from bestbuy.com. Search pages from outside the US can show a country
  picker instead; product pages loaded fine in the tests.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real product page
