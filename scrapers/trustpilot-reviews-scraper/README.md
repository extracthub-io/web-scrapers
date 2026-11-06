# Trustpilot Reviews Scraper (company reviews)

Turn a Trustpilot company page into JSON: company name, TrustScore, review counts, the 1-5 star distribution,
categories, and the 20 reviews on the page with rating, title, text, dates, reviewer country and the company's
reply, plus the next page link. Good for reputation monitoring, competitor benchmarking and review analysis.

**Catalog:** [extracthub.io/extractor/@extracthub1/trustpilot-reviews](https://extracthub.io/extractor/@extracthub1/trustpilot-reviews)
**Extractor id:** `@extracthub1/trustpilot-reviews@1` · **Price:** $0.0025 per page

## Input

A Trustpilot company review page:

```
https://www.trustpilot.com/review/<company domain>
https://www.trustpilot.com/review/<company domain>?page=2
```

e.g. `https://www.trustpilot.com/review/wise.com`.

## Output

| Field | Type | Description |
|---|---|---|
| `companyName` | string | company name |
| `domain` | string \| null | the domain Trustpilot lists it under, e.g. `wise.com` |
| `businessId` | string \| null | Trustpilot business unit id |
| `website` | string \| null | the company's website |
| `trustScore` | number \| null | TrustScore (1 to 5), e.g. `4.3` |
| `stars` | number \| null | stars shown (rounded to half stars), e.g. `4.5` |
| `reviewCount` | number \| null | total number of reviews |
| `reviewCountLast12Months` | number \| null | reviews in the last 12 months |
| `ratingDistribution` | object | number of reviews per star: `{ five, four, three, two, one }` |
| `categories` | string[] | Trustpilot categories, e.g. `Money Transfer Service` |
| `isClaimed` | boolean \| null | the company has claimed its profile |
| `country` | string \| null | the company's country code, e.g. `GB` |
| `profileImage` | string \| null | the company's logo or screenshot |
| `currentPage` | number \| null | page number |
| `totalPages` | number \| null | number of pages with the current filters |
| `reviews[]` | array | the reviews on the page (20), in page order |
| `reviews[].position` | number | position on the page (1 = first) |
| `reviews[].reviewId` | string | Trustpilot review id |
| `reviews[].reviewUrl` | string \| null | link to the review |
| `reviews[].rating` | number \| null | stars given (1 to 5) |
| `reviews[].title` | string \| null | review title |
| `reviews[].text` | string \| null | review text (`null` when the review has only a title) |
| `reviews[].author` | string \| null | reviewer display name |
| `reviews[].authorCountry` | string \| null | reviewer country code, e.g. `US` |
| `reviews[].authorReviewCount` | number \| null | number of reviews the reviewer has written |
| `reviews[].publishedAt` | string \| null | publish time (ISO 8601) |
| `reviews[].experienceDate` | string \| null | date of the experience as shown, e.g. `November 5, 2026` |
| `reviews[].labels` | string[] | badges shown on the review, e.g. `Unprompted review`; empty when none |
| `reviews[].replyText` | string \| null | the company's reply |
| `reviews[].replyDate` | string \| null | reply time (ISO 8601) |
| `nextPageUrl` | string \| null | link to the next page |

Full example: [sample-output.json](sample-output.json) (Wise; shortened to 3 reviews, reviewer names
replaced by initials).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/trustpilot-reviews@1" \
  --data-urlencode "target_url=https://www.trustpilot.com/review/wise.com"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/trustpilot-reviews@1` on the Trustpilot pages of wise.com and revolut.com and compare their
> TrustScore, star distribution and the main complaints in the latest 1-star reviews.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **20 reviews per page:** follow `nextPageUrl` (or set `?page=N`) for more.
- **Language:** by default Trustpilot lists only reviews in the page language (English on trustpilot.com).
  `reviewCount` counts all languages, so it is higher than `totalPages` × 20.
- **No company data = failed request:** a page without company data (a bot check, an unknown domain) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **Personal data:** reviewer names are personal data. Only collect and store them when you have a lawful
  reason to, and respect Trustpilot's terms of use.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; embedded page JSON + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real page (names shortened)
