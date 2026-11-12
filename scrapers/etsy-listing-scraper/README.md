# Etsy Listing Scraper (listing page)

Turn an Etsy listing page into JSON: listing id, title, price (and the price range for listings with options),
original price when the listing is on sale, currency, availability, shop name and shop link, star rating,
review count, category path, material, ships-from country, the full description, the images and the reviews
shown on the page. Good for price monitoring, product research on handmade and vintage goods, and shop
analysis. Pair it with the [Etsy Search Scraper](../etsy-search-scraper/) to get listing links for a keyword.

**Catalog:** [extracthub.io/extractor/@extracthub1/etsy-listing](https://extracthub.io/extractor/@extracthub1/etsy-listing)
**Extractor id:** `@extracthub1/etsy-listing@1` · **Price:** $0.0025 per page

## Input

An Etsy listing page:

```
https://www.etsy.com/listing/<listing-id>/<slug>
https://www.etsy.com/listing/<listing-id>
```

e.g. `https://www.etsy.com/listing/986959096/handmade-ceramic-coffee-mug`.

## Output

| Field | Type | Description |
|---|---|---|
| `listingId` | string | Etsy listing id, e.g. `986959096` |
| `title` | string | listing title |
| `url` | string \| null | canonical listing link |
| `price` | number \| null | price, e.g. `33.5`; for listings with options the lowest option price |
| `highPrice` | number \| null | highest option price, for listings with options (else `null`) |
| `originalPrice` | number \| null | struck-through price when the listing is on sale (else `null`) |
| `currency` | string \| null | e.g. `USD` |
| `availability` | string \| null | e.g. `InStock`, `OutOfStock` |
| `shopName` | string \| null | shop name, e.g. `StonehousePotteryOH` |
| `shopUrl` | string \| null | shop page |
| `rating` | number \| null | average stars (1 to 5) |
| `reviewsCount` | number \| null | number of reviews of the listing |
| `category` | string \| null | category path as one text, e.g. `Home & Living < Kitchen & Dining < ... < Mugs` |
| `categories[]` | string[] | the same path as a list |
| `material` | string \| null | e.g. `Ceramic` |
| `shipsFrom` | string \| null | country the item ships from, ISO code, e.g. `US` |
| `description` | string \| null | the full description |
| `images[]` | string[] | listing images, full size |
| `reviews[]` | array | the reviews Etsy shows on the page (up to 4): `{ rating, date, text }` |

Full example: [sample-output.json](sample-output.json) (Handmade Ceramic Coffee Mug; images shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/etsy-listing@1" \
  --data-urlencode "target_url=https://www.etsy.com/listing/986959096/handmade-ceramic-coffee-mug"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/etsy-listing@1` on these 5 Etsy listing links and make a table with price, original
> price, rating, review count, shop and ships-from country.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Prices with options:** a listing with options (sizes, colors, personalization) has a price range; `price`
  is the lowest and `highPrice` the highest option price. A sale shows `originalPrice` (the lowest option's
  price before the sale).
- **Reviews:** only the reviews Etsy puts in the page (up to 4, newest first, without reviewer names).
  Listings whose reviews Etsy shows only for the whole shop return `reviews: null`; `rating` and
  `reviewsCount` are still set.
- **No title = failed request:** a page without the listing (a bot check, a removed or sold-out listing that
  redirects) fails with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US prices:** fetched through a US proxy; prices are in USD.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy; JSON-LD + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real listing page
