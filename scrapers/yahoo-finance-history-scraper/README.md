# Yahoo Finance Historical Prices Scraper (daily OHLC and volume)

Turn a Yahoo Finance historical data page into JSON: the price rows of the period shown (date, open, high, low,
close, adjusted close, volume; one year of daily rows by default), the dividends and stock splits of that period,
plus the company name, symbol, exchange, currency, date range and interval. Good for backtests, charts and price
archives.

**Catalog:** [extracthub.io/extractor/@extracthub1/yahoo-finance-history](https://extracthub.io/extractor/@extracthub1/yahoo-finance-history)
**Extractor id:** `@extracthub1/yahoo-finance-history@1` · **Price:** $0.0025 per page

## Input

A Yahoo Finance historical data page, optionally with Yahoo's own `frequency` parameter (`1d`, `1wk`, `1mo`):

```
https://finance.yahoo.com/quote/<SYMBOL>/history/
https://finance.yahoo.com/quote/<SYMBOL>/history/?frequency=1mo
```

e.g. `https://finance.yahoo.com/quote/AAPL/history/` (Apple Inc., daily prices of the last year).

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | company name, e.g. `Apple Inc.` |
| `symbol` | string | ticker, e.g. `AAPL` |
| `exchange` | string \| null | e.g. `NasdaqGS` |
| `currency` | string \| null | e.g. `USD` |
| `dateRange` | string \| null | period shown, e.g. `Nov 20, 2025 - Nov 20, 2026` |
| `interval` | string \| null | `Daily`, `Weekly` or `Monthly` |
| `prices[]` | array | price rows, newest first (dividend and split rows are left out) |
| `prices[].position` | number | 1-based row number |
| `prices[].date` | string | as shown, e.g. `Nov 19, 2026` |
| `prices[].open` | number \| null | e.g. `352.91` |
| `prices[].high` | number \| null | e.g. `355.28` |
| `prices[].low` | number \| null | e.g. `346.47` |
| `prices[].close` | number | close adjusted for splits, e.g. `349.21` |
| `prices[].adjClose` | number \| null | close adjusted for splits and dividends, e.g. `349.21` |
| `prices[].volume` | number \| null | e.g. `40795500` |
| `events[]` | array | dividend and stock split rows of the period, newest first |
| `events[].date` | string | e.g. `Nov 12, 2026` |
| `events[].event` | string | `Dividend` or `Stock Splits` |
| `events[].value` | string \| null | dividend per share, e.g. `0.27`, or the split ratio |
| `pageUrl` | string \| null | canonical URL, e.g. `https://finance.yahoo.com/quote/AAPL/history/` (without parameters) |

Full example: [sample-output.json](sample-output.json) (the AAPL page above; 5 of 251 price rows shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/yahoo-finance-history@1" \
  --data-urlencode "target_url=https://finance.yahoo.com/quote/AAPL/history/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/yahoo-finance-history@1` on
> https://finance.yahoo.com/quote/AAPL/history/
> and give me the highest and lowest close of the last 30 trading days.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the table is in the server-rendered HTML, fetched through a US proxy; no browser is needed.
- **One year by default:** the plain page holds about 251 daily rows. `?frequency=1wk` and `?frequency=1mo` give
  weekly and monthly rows (KO monthly: 13 rows). Other date ranges (`period1` / `period2`) were not tested.
- **Today's row** can be a partial day while the market is open.
- **Dates are text as Yahoo shows them** (`Nov 19, 2026`), US Eastern trading days.
- **Dividends and splits** are separate rows in Yahoo's table; they go to `events[]`, never into `prices[]`.
  A period without any gives an empty `events[]`.
- **Tested** on AAPL, MSFT, NVDA and KO (monthly). Indices, ETFs and crypto history pages use the same table but
  were not tested.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real history page (shortened)
