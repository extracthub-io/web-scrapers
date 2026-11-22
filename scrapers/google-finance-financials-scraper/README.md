# Google Finance Financials Scraper (income statement, earnings history, insider trades)

Turn a Google Finance quote page into the company's financial data as JSON: the quarterly income statement of
the last four quarters (revenue, cost of revenue, R&D, SG&A, operating income, income tax, net income, net
profit margin, EPS, EBITDA, ...), the previous earnings reports (fiscal period, report date, EPS and revenue
against the analyst estimate, surprise %, links to the earnings release and 10-Q / 10-K) and the insider
transactions (insider, position, buy / sell type, date, shares, amount). It complements the
[Google Finance Quote Scraper](../google-finance-quote-scraper/) (price, key stats, news) on the same URL. Good
for fundamental analysis, earnings-surprise tracking and insider-trading monitors.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-finance-financials](https://extracthub.io/extractor/@extracthub1/google-finance-financials)
**Extractor id:** `@extracthub1/google-finance-financials@1` · **Price:** $0.0035 per page

## Input

A Google Finance quote page of a stock, in English:

```
https://www.google.com/finance/quote/<SYMBOL>:<EXCHANGE>?hl=en
```

e.g. `https://www.google.com/finance/quote/AAPL:NASDAQ?hl=en` (Apple Inc).

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | company name, e.g. `Apple Inc` |
| `ticker` | string \| null | e.g. `AAPL:NASDAQ` |
| `currency` | string \| null | currency of the income statement, e.g. `USD` |
| `incomeStatementPeriods` | array | the quarter columns, oldest first, e.g. `["Dec 2025", "Mar 2026", "Jun 2026", "Sep 2026"]` |
| `incomeStatement[]` | array | 24 rows |
| `incomeStatement[].label` | string | e.g. `Revenue`, `Operating income`, `Net income`, `Net profit margin`, `Earnings per share`, `EBITDA` |
| `incomeStatement[].values` | array | as shown, one per period, e.g. `["143.76B", "111.18B", "109.42B", "114.48B"]`; `-` when not reported |
| `earningsReports[]` | array | the last 12 reports, newest first |
| `earningsReports[].period` | string | e.g. `Q4 2026` |
| `earningsReports[].reportDate` | string \| null | e.g. `Nov 2, 2026` |
| `earningsReports[].eps` | number \| null | normalized EPS, e.g. `2.1` |
| `earningsReports[].epsEstimate` | number \| null | e.g. `1.99` |
| `earningsReports[].epsSurprisePercent` | number \| null | e.g. `5.61` |
| `earningsReports[].revenue` | string \| null | e.g. `114.48B` |
| `earningsReports[].revenueEstimate` | string \| null | e.g. `113.35B` |
| `earningsReports[].revenueSurprisePercent` | number \| null | e.g. `0.99` |
| `earningsReports[].documentTitles` | array | e.g. `["Quarterly Report (10-Q)", "Earnings Release (8-K)"]` |
| `earningsReports[].documentUrls` | array | PDF links in the same order as `documentTitles` |
| `insiderTransactions[]` | array | recent insider trades (about 16) |
| `insiderTransactions[].insider` | string | e.g. `Jennifer Newstead` |
| `insiderTransactions[].position` | string \| null | e.g. `SVP, GC and Government Affairs`, `Director` |
| `insiderTransactions[].type` | string \| null | e.g. `Uninformative sell`, `Discretionary sell`, `Uninformative buy` |
| `insiderTransactions[].date` | string \| null | `MM/DD/YYYY`, e.g. `11/19/2026` |
| `insiderTransactions[].shares` | string \| null | e.g. `2.4K` |
| `insiderTransactions[].amount` | string \| null | e.g. `$845.94K` |
| `pageUrl` | string \| null | canonical URL, e.g. `https://www.google.com/finance/quote/AAPL:NASDAQ` |

Full example: [sample-output.json](sample-output.json) (the AAPL page above; 6 of 24 income statement rows, 3 of
12 reports and 3 of 16 insider trades shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-finance-financials@1" \
  --data-urlencode "target_url=https://www.google.com/finance/quote/AAPL:NASDAQ?hl=en"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-finance-financials@1` on
> https://www.google.com/finance/quote/AAPL:NASDAQ?hl=en
> and tell me how often Apple beat the EPS estimate in the last 12 quarters, and the latest insider sales.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **JavaScript rendering** through a US proxy: the earnings history and the insider table are loaded by the
  page's scripts (a plain fetch shows "Loading Previous Earnings..."). The extractor waits for the reports table.
- **Quarterly income statement only:** the balance sheet, the cash flow statement and the annual view load only
  after a click on their tab and are not included.
- **Values as shown:** income statement values and revenue keep Google's notation (`143.76B`, `29.28%`, `-`).
- **Documents:** `documentTitles` and `documentUrls` are two arrays in the same order; the PDFs are hosted by
  Google's provider (quartr.com).
- **Stocks only:** index, ETF, fund, currency and crypto pages have no financials.
- **Generated class names:** Google Finance uses obfuscated CSS classes; a Google redesign can break the extractor.
- **Tested** on AAPL and TSLA (NASDAQ) and KO (NYSE).

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real quote page (shortened)
