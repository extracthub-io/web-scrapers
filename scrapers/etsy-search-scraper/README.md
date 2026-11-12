# Etsy Search Scraper (search results)

Turn an Etsy search results page into JSON: for every listing on the page (about 60 to 64) its listing id,
title, link, image, price, original price and discount when on sale, shop name, Star Seller flag, rating,
reviews count, badge (Bestseller, Etsy's Pick, Popular now), free shipping and whether it is an ad, plus the
next page link. Good for product and keyword research on handmade and vintage goods, price comparisons and
finding listing links for the [Etsy Listing Scraper](../etsy-listing-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/etsy-search](https://extracthub.io/extractor/@extracthub1/etsy-search)
**Extractor id:** `@extracthub1/etsy-search@1` · **Price:** $0.0035 per page

## Input

An Etsy search page:

```
https://www.etsy.com/search?q=<keywords>
https://www.etsy.com/search?q=<keywords>&page=2
```

e.g. `https://www.etsy.com/search?q=handmade+mug`.

## Output

| Field | Type | Description |
|---|---|---|
| `listings[]` | array | the listings on the page, in page order |
| `listings[].position` | number | position on the page (1 = first) |
| `listings[].listingId` | string | Etsy listing id |
| `listings[].title` | string | listing title |
| `listings[].url` | string \| null | listing page, without tracking parameters |
| `listings[].image` | string \| null | thumbnail |
| `listings[].price` | number \| null | current price (the sale price when on sale), e.g. `33.5` |
| `listings[].currencySymbol` | string \| null | e.g. `$` |
| `listings[].originalPrice` | number \| null | price before the sale, when on sale |
| `listings[].discount` | string \| null | e.g. `(25% off)` |
| `listings[].shopName` | string \| null | shop name |
| `listings[].starSeller` | boolean | `true` for Star Sellers |
| `listings[].rating` | number \| null | average stars of the shop (1 to 5) |
| `listings[].reviewsCount` | number \| null | number of shop reviews, rounded as Etsy shows it (`3.5k` → `3500`) |
| `listings[].badge` | string \| null | e.g. `Bestseller`, `Etsy’s Pick`, `Popular now` |
| `listings[].freeShipping` | boolean | `true` when the card shows "Free shipping" |
| `listings[].ad` | boolean | `true` for ads (sponsored listings) |
| `nextPageUrl` | string \| null | link to the next page (`null` on the last page) |

Full example: [sample-output.json](sample-output.json) ("handmade mug"; shortened to 3 listings).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/etsy-search@1" \
  --data-urlencode "target_url=https://www.etsy.com/search?q=handmade+mug"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/etsy-search@1` on the first 2 pages of etsy.com/search?q=silver+ring and list the 10
> Bestseller listings that are not ads, with price, shop and rating.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Rendered in a browser:** Etsy sends only the first 12 listings in the page HTML and loads the rest with
  JavaScript, so this extractor renders the page (JavaScript tier, $0.0035) to return the full page of about
  60 to 64 listings.
- **Rating and reviews are the shop's:** search cards show the shop's rating and review count, not the
  listing's. Use the [Etsy Listing Scraper](../etsy-listing-scraper/) for the listing's own reviews.
- **Ads are included** where Etsy puts them in the grid (`ad: true`); filter on `ad` if you only want organic
  results. Results and ads change between requests, like in a browser.
- **No listings = failed request:** a page without listings (a bot check, a search with no results) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy; prices are in USD.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy; CSS fields)
- [`sample-output.json`](sample-output.json): output on a real search page
