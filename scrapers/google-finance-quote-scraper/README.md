# Google Finance Quote Scraper (stock price, key stats, analyst targets, news)

Turn a Google Finance quote page into JSON: company name, ticker, symbol, exchange, price, change and change %,
market status and time, currency, after-hours / pre-market price, the key stats grid (open, high, low, market cap,
average volume, volume, dividend yield, quarterly dividend, ex-dividend date, P/E ratio, 52-week high / low, EPS,
beta, shares outstanding, employees), company profile and About rows (CEO, founded, headquarters, sector,
industry), analyst ratings (buy / hold / sell counts) and 12-month price targets, the latest news stories and
related stocks. Good for stock dashboards, watchlists and market news monitoring.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-finance-quote](https://extracthub.io/extractor/@extracthub1/google-finance-quote)
**Extractor id:** `@extracthub1/google-finance-quote@1` · **Price:** $0.0025 per page

## Input

A Google Finance quote page, in English:

```
https://www.google.com/finance/quote/<SYMBOL>:<EXCHANGE>?hl=en
```

e.g. `https://www.google.com/finance/quote/AAPL:NASDAQ?hl=en` (Apple Inc.).

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | company name, e.g. `Apple Inc` |
| `ticker` | string \| null | e.g. `AAPL:NASDAQ` |
| `symbol` | string \| null | e.g. `AAPL` |
| `exchange` | string \| null | e.g. `NASDAQ`, `NYSE` |
| `price` | number | last regular-session price, e.g. `342.56` |
| `priceText` | string \| null | as shown, with the currency sign, e.g. `$342.56` |
| `change` | number \| null | e.g. `-6.65` |
| `changePercent` | number \| null | in percent, e.g. `-1.9` |
| `marketStatus` | string \| null | e.g. `Closed: Nov 20, 4:00:03 PM GMT-5` |
| `currency` | string \| null | e.g. `USD` |
| `extendedPrice` | number \| null | after-hours / pre-market price, e.g. `344.87` |
| `extendedChange` | number \| null | e.g. `2.31` |
| `extendedChangePercent` | number \| null | e.g. `0.67` |
| `extendedSession` | string \| null | e.g. `After hours · 8:01 PM` |
| `stats[]` | array | the key stats grid as label / value rows |
| `stats[].label` | string | e.g. `Mkt. cap`, `P/E ratio`, `Dividend`, `52-wk high`, `EPS`, `Beta` |
| `stats[].value` | string \| null | as shown, e.g. `4.98T`, `38.15`, `0.32%`, `$360.83` |
| `description` | string \| null | company profile text |
| `descriptionSource` | string \| null | e.g. `https://en.wikipedia.org/wiki/Apple_Inc.` |
| `about[]` | array | label / value rows: `CEO`, `Employees`, `Founded`, `Headquarters`, `Sector`, `Industry`, `Website` |
| `analystBuy` | number \| null | analysts rating Buy, e.g. `15` |
| `analystHold` | number \| null | e.g. `8` |
| `analystSell` | number \| null | e.g. `6` |
| `analystConsensus` | string \| null | e.g. `Buy`, `Strong buy` |
| `priceTargets[]` | array | 12-month targets: `label` (`Highest`, `Average`, `Lowest`), `price` (e.g. `425`), `changePercent` vs the current price (e.g. `24.07`) |
| `news[]` | array | latest news stories (up to 20) |
| `news[].position` | number | 1-based |
| `news[].title` | string | headline |
| `news[].url` | string \| null | article link |
| `news[].source` | string \| null | e.g. `Yahoo Finance`, `Benzinga` |
| `news[].published` | string \| null | relative, e.g. `1 hour ago` |
| `relatedStocks[]` | array | `symbol`, `name`, `price`, `changePercent`, e.g. `NVDA`, `NVIDIA Corp`, `125.53`, `-14.01` |
| `pageUrl` | string \| null | canonical URL, e.g. `https://www.google.com/finance/quote/AAPL:NASDAQ` |

Full example: [sample-output.json](sample-output.json) (the AAPL page above; news shortened to 5 of 20, description
to its first paragraph).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-finance-quote@1" \
  --data-urlencode "target_url=https://www.google.com/finance/quote/AAPL:NASDAQ?hl=en"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-finance-quote@1` on
> https://www.google.com/finance/quote/AAPL:NASDAQ?hl=en
> and give me the price, market cap, P/E ratio, analyst price targets and the latest 5 headlines.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything comes from the server-rendered HTML, fetched through a US proxy; no browser is needed.
- **Keep `?hl=en`:** labels (`stats[].label`, `about[].label`) and the market status are in the page language;
  the extractor was written and tested on the English page.
- **Key stats by label:** the grid is returned as label / value rows exactly as shown (`4.98T`, `0.32%`,
  `Nov 12, 2026`). Its rows differ per stock: a company without a dividend has no dividend rows (TSLA: 13 rows,
  AAPL and KO: 16). Read the rows by label.
- **After-hours price:** Google shows the after-hours or pre-market price next to the regular one. When there
  was no extended-hours trade, the `extended*` fields repeat the close with a change of `0` (KO in our tests); they
  are `null` when Google shows no second price.
- **News changes on every request:** the list and its relative times (`26 minutes ago`) are those of the moment of
  the fetch.
- **Generated class names:** Google Finance uses obfuscated CSS classes. The extractor anchors on Google's
  `jsname` attributes where they exist, but a Google redesign can still break it.
- **Tested** on AAPL and TSLA (NASDAQ) and KO (NYSE). Index, ETF, mutual fund, currency and crypto pages use other
  layouts and were not tested.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real quote page (shortened)
