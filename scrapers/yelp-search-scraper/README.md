# Yelp Search Scraper (search results)

Turn a Yelp (yelp.com) search into JSON: position, business name, link, rating, approximate reviews count,
neighborhood, price range, open status, categories, a review snippet and a photo for each result, without the
sponsored results, plus the link to the next page. Good for local market research and lead lists of businesses.

**Catalog:** [extracthub.io/extractor/@extracthub1/yelp-search](https://extracthub.io/extractor/@extracthub1/yelp-search)
**Extractor id:** `@extracthub1/yelp-search@1` · **Price:** $0.0025 per page

## Input

A Yelp search page:

```
https://www.yelp.com/search?find_desc=<what>&find_loc=<where>
```

e.g. `https://www.yelp.com/search?find_desc=pizza&find_loc=Chicago%2C+IL`. Next pages add `&start=10`, `&start=20`, ...

## Output

| Field | Type | Description |
|---|---|---|
| `results[]` | array | organic results of the page, usually 10 |
| `results[].position` | number | 1-based position on the page, after the sponsored results are dropped |
| `results[].name` | string | business name, e.g. `Lou Malnati's Pizzeria` |
| `results[].url` | string | Yelp business page, e.g. `https://www.yelp.com/biz/lou-malnatis-pizzeria-chicago` |
| `results[].rating` | number \| null | average rating (1 to 5), e.g. `4` |
| `results[].reviewCount` | number \| null | reviews count as shown, rounded by Yelp above 1,000, e.g. `8000` for `8k` |
| `results[].neighborhood` | string \| null | e.g. `River North`; `null` on service businesses |
| `results[].priceRange` | string \| null | e.g. `$$` |
| `results[].openStatus` | string \| null | e.g. `Open until 11:00 PM`; `null` on service businesses |
| `results[].categories[]` | string[] | e.g. `["Pizza", "Italian", "Sandwiches"]` |
| `results[].snippet` | string \| null | short review quote shown on the card |
| `results[].image` | string \| null | photo of the business |
| `nextPageUrl` | string \| null | link to the next results page |

Full example: [sample-output.json](sample-output.json) (pizza in Chicago, IL; list shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/yelp-search@1" \
  --data-urlencode "target_url=https://www.yelp.com/search?find_desc=pizza&find_loc=Chicago%2C+IL"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/yelp-search@1` on this Yelp search and list the businesses rated 4.5 or more with their
> reviews count and neighborhood.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Yelp sometimes refuses a request:** in our tests the search page often answered HTTP 403 through the proxy
  (more than half the attempts on some rounds, none on others). Retry later, and expect a share of
  failed URLs in a batch of many pages. The extractor has JS escalation enabled for these refusals, charged at the
  JavaScript price when used.
- **Two page layouts:** restaurants and other places show neighborhood, price range and open status; service
  businesses (plumbers, ...) use another card where those fields are `null`.
- **Sponsored results are removed:** Yelp marks them with a redirect link, so the positions count organic results.
- **Results change:** Yelp re-ranks the results from one request to the next.
- **Rounded counts:** `reviewCount` comes from the card (`8k`, `1.3k`); use the Yelp Business Scraper for the
  exact count.
- **Reviews:** only the short snippet on the card is returned, without reviewer names.
- **Blocked or empty pages:** a page without any result fails with HTTP 422 `required_fields_missing` and is still
  charged.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page
