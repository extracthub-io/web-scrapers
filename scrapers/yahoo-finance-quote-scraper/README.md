# Yahoo Finance Quote Scraper (stock price and key statistics)

Turn a Yahoo Finance quote page into JSON: company name, symbol, exchange, currency, last price, change and change
%, after-hours / overnight price, previous close, open, day and 52-week range, volume, average volume, market cap,
P/E, the whole Summary statistics table (bid, ask, beta, EPS, earnings date, dividend and yield, 1y target), sector
and industry, company description, website, employees, performance against the S&P 500, financial highlights and
analyst price targets. Good for stock dashboards, watchlists and fundamentals screening.

**Catalog:** [extracthub.io/extractor/@extracthub1/yahoo-finance-quote](https://extracthub.io/extractor/@extracthub1/yahoo-finance-quote)
**Extractor id:** `@extracthub1/yahoo-finance-quote@1` · **Price:** $0.0025 per page

## Input

A Yahoo Finance quote page:

```
https://finance.yahoo.com/quote/<SYMBOL>/
```

e.g. `https://finance.yahoo.com/quote/AAPL/` (Apple Inc.).

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | company name, e.g. `Apple Inc.` |
| `symbol` | string | ticker, e.g. `AAPL` |
| `exchange` | string \| null | e.g. `NasdaqGS`, `NYSE` |
| `quoteSource` | string \| null | e.g. `NasdaqGS - BOATS Real Time Price` |
| `currency` | string \| null | e.g. `USD` |
| `price` | number | last regular-session price, e.g. `349.21` |
| `change` | number \| null | e.g. `-3.24` |
| `changePercent` | number \| null | in percent, e.g. `-0.92` |
| `marketTime` | string \| null | e.g. `At close: November 19 at 4:00:01 PM EST` |
| `extendedSession` | string \| null | session of the second price, e.g. `OVERNIGHT` (also pre-market / after-hours) |
| `extendedPrice` | number \| null | price in that session, e.g. `350.31` |
| `extendedChange` | number \| null | e.g. `1.1` |
| `extendedChangePercent` | number \| null | e.g. `0.31` |
| `extendedMarketTime` | string \| null | e.g. `Overnight: 10:26:02 PM EST` |
| `previousClose` | number \| null | e.g. `352.45` |
| `open` | number \| null | e.g. `352.91` |
| `dayRange` | string \| null | e.g. `346.47 - 355.28` (see Good to know) |
| `fiftyTwoWeekRange` | string \| null | e.g. `243.42 - 360.83` (see Good to know) |
| `volume` | number \| null | e.g. `40469518` |
| `avgVolume` | number \| null | e.g. `42445762` |
| `marketCap` | string \| null | as shown, e.g. `5.075T` |
| `peRatio` | number \| null | trailing P/E, e.g. `38.89` |
| `statistics[]` | array | every row of the Summary statistics table |
| `statistics[].label` | string | e.g. `EPS (TTM)`, `Forward Dividend & Yield`, `1y Target Est` |
| `statistics[].value` | string | as shown, e.g. `8.98`, `1.08 (0.31%)`, `345.63` |
| `industrySector` | string \| null | e.g. `Consumer Electronics / Technology` |
| `description` | string \| null | company profile text |
| `website` | string \| null | e.g. `https://www.apple.com` |
| `companyInfo[]` | array | label / value rows: `Full Time Employees`, `Fiscal Year Ends`, `Sector`, `Industry` |
| `performance[]` | array | trailing returns: `period` (e.g. `YTD Return`), `symbolReturn`, `benchmark`, `benchmarkReturn` |
| `financialHighlights[]` | array | label / value rows, e.g. `Profit Margin` / `27.60%`, `Revenue (ttm)` / `478.83B` |
| `analystTargetLow` | number \| null | e.g. `250` |
| `analystTargetAverage` | number \| null | e.g. `345.63` |
| `analystTargetHigh` | number \| null | e.g. `425` |
| `pageUrl` | string \| null | canonical URL, e.g. `https://finance.yahoo.com/quote/AAPL/` |

Full example: [sample-output.json](sample-output.json) (the AAPL page above; description shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/yahoo-finance-quote@1" \
  --data-urlencode "target_url=https://finance.yahoo.com/quote/AAPL/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/yahoo-finance-quote@1` on
> https://finance.yahoo.com/quote/AAPL/
> and give me the price, market cap, P/E ratio and the analyst price targets.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything comes from the server-rendered HTML, fetched through a US proxy; no browser is needed.
- **Two layouts of the statistics table:** most fetches show `Day's Range` and `52 Week Range` rows (plus `Bid`
  and `Ask`). Some fetches (1 of 6 in our tests) show `Day Low`, `Day High`, `52 Week Low` and `52 Week High`
  rows instead and no bid / ask; then `dayRange` and `fiftyTwoWeekRange` are `null` and the low / high values are
  in `statistics[]` under those labels. Read `statistics[]` by label if you need these values every time.
- **Prices are delayed or real time as Yahoo shows them;** `marketTime` says when. The second price is the
  overnight, pre-market or after-hours price (`extendedSession`), `null` when Yahoo shows none.
- **Numbers as shown:** `marketCap`, `statistics[].value`, `performance[]` and `financialHighlights[]` keep
  Yahoo's text (`5.075T`, `27.60%`, `--` when there is no value).
- **Valuation measures and news** load in the browser after the page; they are not in the fetched HTML and not
  extracted.
- **Tested** on AAPL, MSFT, TSLA and KO (NASDAQ and NYSE stocks). ETFs, indices, funds and crypto quote pages use
  other tables and were not tested.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real quote page (shortened)
