# Google Finance Earnings Scraper (earnings calendar)

Turn the Google Finance earnings calendar into JSON: every company reporting yesterday, today, tomorrow, this
week and next week, with company name, ticker, symbol, exchange, weekday and day, report time, before-open /
after-close marker, fiscal period, EPS estimate, revenue estimate and the link to its earnings page. Good for
earnings calendars, trading watchlists and earnings-season alerts.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-finance-earnings](https://extracthub.io/extractor/@extracthub1/google-finance-earnings)
**Extractor id:** `@extracthub1/google-finance-earnings@1` · **Price:** $0.0025 per page

## Input

The Google Finance earnings calendar, in English:

```
https://www.google.com/finance/earnings?hl=en
```

## Output

| Field | Type | Description |
|---|---|---|
| `yesterday[]` | array | companies that reported yesterday |
| `today[]` | array | reporting today |
| `tomorrow[]` | array | reporting tomorrow |
| `thisWeek[]` | array | reporting during the rest of this week |
| `nextWeek[]` | array | reporting next week |
| `...[].company` | string | e.g. `Agilent Technologies Inc` |
| `...[].ticker` | string \| null | e.g. `A:NYSE` |
| `...[].symbol` | string \| null | e.g. `A` |
| `...[].exchange` | string \| null | e.g. `NYSE`, `NASDAQ` |
| `...[].weekday` | string \| null | e.g. `Mon` |
| `...[].day` | number \| null | day of the month, e.g. `23` |
| `...[].time` | string \| null | report time with time zone, e.g. `4:30 PM EST` |
| `...[].timing` | string \| null | Google's icon: `sunny` (before the market opens), `dark_mode` (after it closes), `null` (during the session) |
| `...[].epsEstimate` | string \| null | e.g. `$1.73`, `CN¥2.24` |
| `...[].revenueEstimate` | string \| null | e.g. `$1.99B` |
| `...[].period` | string \| null | e.g. `Fiscal Q4 2026` |
| `...[].url` | string \| null | the company's earnings tab on Google Finance |

Full example: [sample-output.json](sample-output.json) (the page above on a Sunday: no reports yesterday, today
or during the rest of the week; 3 of 5 tomorrow and 3 of 24 next week shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-finance-earnings@1" \
  --data-urlencode "target_url=https://www.google.com/finance/earnings?hl=en"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-finance-earnings@1` on https://www.google.com/finance/earnings?hl=en
> and list the companies reporting next week after the market closes, with their EPS estimate.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through a US proxy; all five tabs are in the server-rendered HTML.
- **The tabs overlap:** a company reporting tomorrow also appears in `thisWeek` or `nextWeek`. Dedupe by
  `ticker` + `day` when you merge them.
- **"Today" depends on the time zone Google picks for the request** (seen: `EST`, `CET`, `GMT+03:00`, also in
  `time`). Near midnight the same URL can return different tabs; keep `?hl=en` in the URL.
- **No month or year** in the item: `weekday` + `day` only, relative to the date of the fetch.
- **Empty calendar responses:** Google sometimes answers with "No earnings for this period" in every tab (all
  arrays empty). Retry the call when all five arrays are empty on a weekday.
- **Filter:** "All stocks" (the default). The "In your list" filter needs a Google sign-in.
- **Generated class names:** Google Finance uses obfuscated CSS classes; a Google redesign can break the extractor.
- **Tested** on 3 fetches of the calendar (with and without `?hl=en`, and with `&gl=US`).

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the real page (shortened)
