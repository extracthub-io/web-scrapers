# eBay Search Scraper (search results)

Turn an eBay.com search results page into JSON: the total result count, the next page link, and every listing
on the page (about 60) with item id, title, link, image, price, original price, condition, subtitle, the
detail lines (buying format, shipping, location, sold / watchers) and the seller's feedback line. Good for
price research, resale market snapshots and feeding the [eBay Item Scraper](../ebay-item-scraper/) with
listing URLs.

**Catalog:** [extracthub.io/extractor/@extracthub1/ebay-search](https://extracthub.io/extractor/@extracthub1/ebay-search)
**Extractor id:** `@extracthub1/ebay-search@1` · **Price:** $0.0025 per page

## Input

An eBay.com search page, with any filters or sort you set on eBay:

```
https://www.ebay.com/sch/i.html?_nkw=<keywords>
https://www.ebay.com/sch/i.html?_nkw=<keywords>&_pgn=2
https://www.ebay.com/sch/i.html?_nkw=<keywords>&LH_Sold=1&LH_Complete=1   sold listings
```

e.g. `https://www.ebay.com/sch/i.html?_nkw=iphone+15`.

## Output

| Field | Type | Description |
|---|---|---|
| `resultsSummary` | string \| null | e.g. `41,000 + results for iphone 15` |
| `totalResults` | number \| null | result count eBay shows (rounded by eBay) |
| `listings[]` | array | the listings on the page, in page order |
| `listings[].position` | number | position on the page (1 = first) |
| `listings[].itemId` | string | eBay item number |
| `listings[].title` | string | listing title |
| `listings[].url` | string \| null | item page, without tracking parameters |
| `listings[].image` | string \| null | thumbnail |
| `listings[].price` | number \| null | price (the lowest when a range like `$1.99 to $49.99` is shown) |
| `listings[].priceText` | string \| null | the price as shown, e.g. `$60.00` |
| `listings[].originalPrice` | number \| null | struck-through original price |
| `listings[].subtitle` | string \| null | first line under the title (specs like `Apple iPhone 15 · 128 GB · Unlocked`, a seller tagline, or the condition) |
| `listings[].condition` | string \| null | e.g. `Brand New`, `Pre-Owned`, `Very Good - Refurbished` |
| `listings[].details[]` | string[] | the card's detail lines in order: price, `Buy It Now` / `or Best Offer` / bids, shipping, location, returns, sold / watchers, coupons |
| `listings[].sellerInfo` | string \| null | seller line, e.g. `sarahcell 98.5% positive (7.7K)` (not shown in every layout) |
| `nextPageUrl` | string \| null | link to the next page |

Full example: [sample-output.json](sample-output.json) ("iphone 15"; shortened to 3 listings).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/ebay-search@1" \
  --data-urlencode "target_url=https://www.ebay.com/sch/i.html?_nkw=iphone+15"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/ebay-search@1` on the eBay search for "iphone 15 128gb" and give me the median price of
> Pre-Owned and Refurbished listings separately.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **About 60 listings per page:** eBay's placeholder cards ("Shop on eBay") are left out. Follow
  `nextPageUrl` (or `&_pgn=N`) for more.
- **`details` is a list, not separate fields:** eBay shows different lines per listing (shipping, location,
  sold count, watchers, coupons), in no fixed order, so they are returned as shown.
- **Seller line:** eBay shows it for some searches and layouts only; then `sellerInfo` is `null`.
  Seller user names are personal data for private sellers: only store them when you have a reason to.
- **No listings = failed request:** a page without listings (a bot check, a search with no results) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy; prices are in USD.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy; CSS fields)
- [`sample-output.json`](sample-output.json): output on a real search page
