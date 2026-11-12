# Yelp Business Scraper (business page)

Turn a Yelp (yelp.com) business page into JSON: name, rating, exact reviews and photos counts, claimed flag,
categories, address, coordinates, opening hours (with special holiday hours), public business phone and website,
amenities and photos. Good for local business data, store locators and market research.

**Catalog:** [extracthub.io/extractor/@extracthub1/yelp-business](https://extracthub.io/extractor/@extracthub1/yelp-business)
**Extractor id:** `@extracthub1/yelp-business@1` · **Price:** $0.0025 per page

## Input

A Yelp business page:

```
https://www.yelp.com/biz/<business-slug>
```

e.g. `https://www.yelp.com/biz/lou-malnatis-pizzeria-chicago`.

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | business name, e.g. `Lou Malnati's Pizzeria` |
| `rating` | number \| null | average rating (1 to 5), e.g. `4` |
| `reviewCount` | number \| null | exact reviews count, e.g. `7985` |
| `photoCount` | number \| null | photos count, e.g. `6881` |
| `claimed` | boolean | whether the owner claimed the page |
| `categories[]` | string[] | e.g. `["Pizza", "Italian", "Sandwiches"]` |
| `address` | string | e.g. `439 N Wells St, Chicago, IL 60654` |
| `latitude` | number \| null | e.g. `41.890359` |
| `longitude` | number \| null | e.g. `-87.633708` |
| `hours[]` | array | opening hours as `{ day, hours[] }`, e.g. `Mon` = `11:00 AM - 11:00 PM`; special days follow, e.g. `Fri, Nov 27, 2026` = `Closed` |
| `phone` | string \| null | public business phone, e.g. `(312) 828-9800` |
| `website` | string \| null | the business's own website |
| `bizId` | string \| null | Yelp business id, taken from the website link (`null` without a website) |
| `amenities[]` | string[] | amenities shown without opening "Show more", e.g. `Offers delivery` |
| `photos[]` | string[] | photos in the page header |
| `url` | string | canonical Yelp link |

Full example: [sample-output.json](sample-output.json) (Lou Malnati's Pizzeria, Chicago; photos shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/yelp-business@1" \
  --data-urlencode "target_url=https://www.yelp.com/biz/lou-malnatis-pizzeria-chicago"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/yelp-business@1` on these Yelp links and make a table of name, rating, reviews count, address,
> phone and Monday opening hours.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the page HTML holds everything returned here, no browser needed.
- **Review summary only:** Yelp loads the review texts in the browser, so `rating` and `reviewCount` are returned,
  without review texts or reviewer names.
- **Business contact only:** `phone` and `website` are the ones the business publishes on its page.
- **Exact counts:** `reviewCount` and `photoCount` come from the page title, the header shows rounded numbers.
- **Removed businesses / bot checks:** a page without a name fails with HTTP 422 `required_fields_missing` and is
  still charged. Batches retry it once.
- **US site:** fetched through a US proxy from yelp.com. Yelp may refuse some requests; retry them.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real business page
