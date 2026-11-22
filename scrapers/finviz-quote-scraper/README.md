# Finviz Quote Scraper (stock fundamentals, snapshot table, news)

Turn a Finviz stock quote page into JSON: ticker, company name, website, sector, industry, country, market cap
group and exchange, the last close price with change and change %, the after-hours price, the whole snapshot
table (84 fundamentals such as Market Cap, P/E, Forward P/E, EPS, ROE, Short Float, Beta, analyst Recom and Target
Price) as label / value rows, the latest news headlines with time, link and source, and the company description.
Good for stock screeners, fundamentals databases and news monitoring.

**Catalog:** [extracthub.io/extractor/@extracthub1/finviz-quote](https://extracthub.io/extractor/@extracthub1/finviz-quote)
**Extractor id:** `@extracthub1/finviz-quote@1` · **Price:** $0.0025 per page

## Input

A Finviz quote page:

```
https://finviz.com/quote.ashx?t=<TICKER>
```

e.g. `https://finviz.com/quote.ashx?t=AAPL` (Apple Inc).

## Output

| Field | Type | Description |
|---|---|---|
| `ticker` | string | e.g. `AAPL` |
| `companyName` | string | e.g. `Apple Inc` |
| `website` | string \| null | company website, e.g. `http://www.apple.com` |
| `sector` | string \| null | e.g. `Technology` |
| `industry` | string \| null | e.g. `Consumer Electronics` |
| `country` | string \| null | e.g. `USA` |
| `marketCapGroup` | string \| null | Finviz size group, e.g. `Mega` |
| `exchange` | string \| null | e.g. `NASD`, `NYSE` |
| `price` | number | e.g. `342.56` |
| `priceLabel` | string \| null | which price it is, e.g. `Last Close` |
| `priceTime` | string \| null | e.g. `Nov 20 • 3:59 PM ET` |
| `change` | number \| null | e.g. `-6.65` |
| `changePercent` | number \| null | in percent, e.g. `-1.9` |
| `extendedPrice` | number \| null | after-hours / pre-market price, e.g. `344.87` |
| `extendedPriceLabel` | string \| null | e.g. `Aftermarket Close` |
| `extendedPriceTime` | string \| null | e.g. `Aftermarket • 7:59 PM ET` |
| `extendedChange` | number \| null | e.g. `2.31` |
| `extendedChangePercent` | number \| null | e.g. `0.67` |
| `snapshot[]` | array | the snapshot table as rows, in Finviz column order |
| `snapshot[].label` | string | e.g. `Market Cap`, `P/E`, `EPS (ttm)`, `Short Float`, `Recom`, `Target Price` |
| `snapshot[].value` | string \| null | as shown, e.g. `4978.14B`, `38.17`, `1.00%`, `360.83 -5.06%` (52W High) |
| `snapshot[].description` | string \| null | Finviz tooltip of the label, e.g. `Market capitalization` |
| `news[]` | array | latest headlines, newest first (about 100) |
| `news[].time` | string \| null | as shown: `Nov-20-26 11:00PM` on the first item of a day, then only `07:46PM`; `Today 05:50PM` for today |
| `news[].title` | string | headline |
| `news[].url` | string \| null | article link (Yahoo Finance, WSJ, Barron's, ...) |
| `news[].source` | string \| null | e.g. `TechCrunch`, `AFP` |
| `description` | string \| null | company profile text |

Full example: [sample-output.json](sample-output.json) (the AAPL page above; news shortened to 5 of 100).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/finviz-quote@1" \
  --data-urlencode "target_url=https://finviz.com/quote.ashx?t=AAPL"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/finviz-quote@1` on
> https://finviz.com/quote.ashx?t=AAPL
> and give me the P/E, Forward P/E, Short Float and analyst target price.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything is in the server-rendered HTML, fetched through a US proxy; no browser is needed.
- **Snapshot by label:** values are text as shown (`4978.14B`, `1.07 (0.31%)`, `13.54% 9.85%` for two periods).
  Read the rows by label. Two rows are both called `EPS next Y` (the EPS estimate and its growth %); the
  `description` tells them apart. `Trades` has no value (it is a link on Finviz).
- **Prices:** tested out of market hours, where Finviz shows the last close plus the after-hours price;
  `priceLabel` / `extendedPriceLabel` say which price is which. The `extended*` fields are `null` when Finviz shows
  no second price.
- **News times** are US Eastern and only the first headline of each day carries the date: carry it down to the
  following rows yourself.
- **Not included:** the price chart, the analyst ratings history, insider trading and institutional ownership
  tables (drawn by scripts in the browser).
- **Tested** on AAPL and NVDA (NASDAQ) and JPM (NYSE). ETF pages use the same layout with other snapshot rows and
  were not tested.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real quote page (shortened)
