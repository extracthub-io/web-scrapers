# Zillow Mortgage Rates Scraper (Zillow Home Loans)

Turn Zillow's mortgage rates page into JSON: today's rate, APR, points and fees, loan type and term of each
Zillow Home Loans product (30-year fixed, 30-year FHA and VA, 25- and 20-year FHA, 20-, 15- and 10-year fixed,
30-year jumbo), with the time the rates are valid. Good for daily rate tracking and rate comparison widgets.

**Catalog:** [extracthub.io/extractor/@extracthub1/zillow-mortgage-rates](https://extracthub.io/extractor/@extracthub1/zillow-mortgage-rates)
**Extractor id:** `@extracthub1/zillow-mortgage-rates@1` · **Price:** $0.0025 per page

## Input

The mortgage rates page: `https://www.zillow.com/mortgage-rates/` (`https://www.zillow.com/homeloans/mortgage-rates/`
is the same page).

## Output

| Field | Type | Description |
|---|---|---|
| `loans[]` | array | one entry per loan product |

Each `loans[]` entry:

| Field | Description |
|---|---|
| `name` | e.g. `30-Year Fixed Mortgage` |
| `rate` | interest rate in percent, e.g. `7.25` |
| `apr` | annual percentage rate in percent, e.g. `7.454` |
| `loanType` | e.g. `Conventional Fixed`, `FHA Fixed`, `VA Fixed`, `Jumbo Fixed` |
| `loanTerm` | ISO 8601 duration, e.g. `P30Y` = 30 years |
| `pointsAndFees` | e.g. `1.999 points; $5,497.25` |
| `validFrom` / `validThrough` | when the rates apply (Zillow's time zone offset included) |

Full example: [sample-output.json](sample-output.json).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/zillow-mortgage-rates@1" \
  --data-urlencode "target_url=https://www.zillow.com/mortgage-rates/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/zillow-mortgage-rates@1` and tell me today's 30-year and 15-year fixed rates and the APR
> difference between them.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Zillow Home Loans' own sample rates**, not a market average: Zillow states the loan assumptions (loan
  amount, credit score, down payment) in the "See sample loan terms" notes on the page.
- **Adjustable-rate (ARM) products** are only included when Zillow lists them with a rate.
- **Updated daily:** run it once a day for a rate history.
- **No rates = failed request:** a page without the rate list (a bot check) fails with HTTP 422
  `required_fields_missing` and is still charged. Batches retry it once.
- **US only:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; JSON-LD)
- [`sample-output.json`](sample-output.json): output on the real page
