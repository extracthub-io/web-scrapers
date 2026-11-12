# Walmart Product Scraper (product page)

Turn a Walmart.com product page into JSON: item id, name, brand, model, UPC, current price, was price,
savings, star rating, review count, availability, seller, condition, badges, shipping and pickup messages,
return policy, description, category path, images, the specifications table and Walmart's AI review
summary. Good for price monitoring, catalog enrichment (UPC, model) and competitor research. Pair it with the
[Walmart Search Scraper](../walmart-search-scraper/) to get product links for a keyword.

**Catalog:** [extracthub.io/extractor/@extracthub1/walmart-product](https://extracthub.io/extractor/@extracthub1/walmart-product)
**Extractor id:** `@extracthub1/walmart-product@1` · **Price:** $0.0025 per page

## Input

A Walmart.com product page:

```
https://www.walmart.com/ip/<product-slug>/<item-id>
https://www.walmart.com/ip/<item-id>
```

e.g. `https://www.walmart.com/ip/Ninja-4-Qt-Air-Fryer-3-Functions-Air-Fry-Reheat-and-Dehydrate-Dishwasher-Safe-Non-Stick-AF100WM-Black/844320666`.

## Output

| Field | Type | Description |
|---|---|---|
| `itemId` | string | Walmart item id, e.g. `844320666` |
| `name` | string | product name |
| `brand` | string \| null | e.g. `Ninja` |
| `model` | string \| null | model number, e.g. `AF100WM` |
| `upc` | string \| null | UPC barcode, e.g. `622356580977` |
| `url` | string \| null | canonical product page |
| `price` | number \| null | current price, e.g. `59` |
| `currency` | string \| null | e.g. `USD` |
| `wasPrice` | number \| null | struck-through "was" price, when there is one, e.g. `89` |
| `savings` | number \| null | amount saved, e.g. `30` |
| `rating` | number \| null | average stars (1 to 5), e.g. `4.7` |
| `reviewsCount` | number \| null | number of reviews |
| `availability` | string \| null | e.g. `In stock`, `Out of stock` |
| `seller` | string \| null | seller of the main offer, e.g. `Walmart.com` |
| `condition` | string \| null | e.g. `New`, `Restored` |
| `badges[]` | string[] | e.g. `Rollback`, `Overall pick`, `100+ bought since yesterday` |
| `fulfillment[]` | string[] | shipping / pickup / delivery messages, e.g. `Free shipping, arrives by Sun, Nov 8 to Sacramento, 95829` |
| `returnPolicy` | string \| null | e.g. `Free 90-day returns` |
| `description` | string \| null | short description as the seller wrote it |
| `categories[]` | string[] | category path, e.g. `["Home", "Appliances", ..., "Air Fryers"]` |
| `images[]` | string[] | product images, full size |
| `specifications[]` | array | specifications table: `{ name, value }`, e.g. `{ "name": "Watts", "value": "1550 W" }` |
| `reviewSummary` | string \| null | Walmart's AI-generated summary of the reviews (not on every product) |
| `recommendedPercentage` | number \| null | share of reviewers who recommend the product, in % |

Full example: [sample-output.json](sample-output.json) (Ninja 4-Qt Air Fryer AF100WM; images and
specifications shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/walmart-product@1" \
  --data-urlencode "target_url=https://www.walmart.com/ip/Ninja-4-Qt-Air-Fryer-3-Functions-Air-Fry-Reheat-and-Dehydrate-Dishwasher-Safe-Non-Stick-AF100WM-Black/844320666"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/walmart-product@1` on these 5 Walmart product links and make a table with price, was
> price, rating, review count, seller and UPC, sorted by price.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Read from the page data:** all fields come from the JSON Walmart embeds in the page, so a plain fetch is
  enough (no browser needed).
- **Location-dependent fields:** `fulfillment`, `availability` and sometimes `price` depend on the store and
  ZIP code Walmart assigns to the request (a US proxy location, e.g. Sacramento, 95829). Treat them as
  "a typical US shopper", not as your local store.
- **Description may contain HTML:** some marketplace sellers write their description in HTML (`<p>`, `<br>`);
  `description` returns it as written.
- **Main offer only:** `price` and `seller` are the offer Walmart shows first. Other sellers' offers are not
  included.
- **No name = failed request:** a page without the product name (a bot check, a removed product) fails with
  HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy; prices are in USD.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy; page JSON)
- [`sample-output.json`](sample-output.json): output on a real product page
