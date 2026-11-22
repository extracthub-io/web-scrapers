# Google Finance Markets Scraper (market overview: indexes, sectors, movers, earnings, IPOs, news)

Turn the Google Finance home page into JSON: the market index strip (US, European, Asian and Latin American
indexes, currencies, crypto and futures with price, change and change %), the equity sectors table (price,
change, previous close, open, high, low), the most active stocks, daily gainers and daily losers, the upcoming
earnings of the week (company, ticker, day, time, fiscal period, EPS and revenue estimates), recent and upcoming
IPOs and notable filings, and the latest market news. Good for market dashboards, daily market briefs and
movers alerts.

**Catalog:** [extracthub.io/extractor/@extracthub1/google-finance-markets](https://extracthub.io/extractor/@extracthub1/google-finance-markets)
**Extractor id:** `@extracthub1/google-finance-markets@1` · **Price:** $0.0025 per page

## Input

The Google Finance home page, in English:

```
https://www.google.com/finance/?hl=en
```

## Output

| Field | Type | Description |
|---|---|---|
| `markets[]` | array | the index strip, 35 entries in page order (US, Europe, Asia, Latin America, currencies, crypto, futures) |
| `markets[].position` | number | 1-based |
| `markets[].name` | string | e.g. `Dow Jones`, `EUR / USD`, `Bitcoin`, `Gold` |
| `markets[].ticker` | string \| null | Google Finance ticker, e.g. `.DJI:INDEXDJX`, `EUR-USD`, `BTC-USD` |
| `markets[].price` | number \| null | e.g. `48147.33` |
| `markets[].change` | number \| null | e.g. `-949.73` |
| `markets[].changePercent` | number \| null | in percent, e.g. `-1.93` |
| `sectors[]` | array | equity sectors table (see Good to know) |
| `sectors[].symbol` | string | e.g. `SIXT`, `SX8P` |
| `sectors[].name` | string \| null | e.g. `Technology` |
| `sectors[].ticker` | string \| null | e.g. `SIXT:INDEXCBOE` |
| `sectors[].price`, `change`, `changePercent` | number \| null | e.g. `902.77`, `-51.46`, `-5.39` |
| `sectors[].previousClose`, `open`, `high`, `low` | number \| null | |
| `movers[]` | array | three lists: `Most active`, `Daily gainers`, `Daily losers` |
| `movers[].list` | string | the list name |
| `movers[].stocks[]` | array | `position`, `symbol` (e.g. `NVDA`), `name`, `price` (e.g. `125.53`), `changePercent` (e.g. `-14.01`) |
| `earnings[]` | array | upcoming earnings shown on the home page (4-5) |
| `earnings[].company` | string | e.g. `Agilent Technologies Inc` |
| `earnings[].ticker` | string \| null | e.g. `A:NYSE` |
| `earnings[].weekday` | string \| null | e.g. `Mon` |
| `earnings[].day` | number \| null | day of the month, e.g. `23` |
| `earnings[].time` | string \| null | report time with time zone, e.g. `10:30 PM CET` |
| `earnings[].timing` | string \| null | Google's icon: `sunny` (before the market opens), `dark_mode` (after it closes), `null` (during the session) |
| `earnings[].period` | string \| null | e.g. `Fiscal Q4 2026` |
| `earnings[].epsEstimate` | string \| null | e.g. `$1.73` |
| `earnings[].revenueEstimate` | string \| null | e.g. `2.0B` |
| `moreEarningsUrl` | string \| null | the full earnings calendar (input of the [Google Finance Earnings Scraper](../google-finance-earnings-scraper/)) |
| `ipos[]` | array | recent listings, upcoming IPOs and notable filings |
| `ipos[].name` | string | e.g. `Anthropic` |
| `ipos[].symbol` | string \| null | e.g. `ANT` |
| `ipos[].status` | string \| null | `Listed` for IPOs that already trade |
| `ipos[].filingType` | string \| null | for notable filings, e.g. `S-1/A` |
| `ipos[].month`, `ipos[].day` | string, number \| null | listing or filing date, e.g. `Nov`, `19` (no date on notable filings) |
| `ipos[].changePercent` | number \| null | current price vs the offer price, e.g. `7.12` |
| `ipos[].details[]` | array | `label` / `value` rows, e.g. `Offer price` `$83.00`, `Current price` `$88.91`, `Filing range` `$40.00–$44.00`, `Est. deal size`, `Est. market cap` |
| `ipos[].url` | string \| null | quote page of a listed IPO, or the SEC filing of a notable filing |
| `news[]` | array | latest market news (about 20-27) |
| `news[].position` | number | 1-based |
| `news[].title` | string | headline |
| `news[].url` | string \| null | article link |
| `news[].source` | string \| null | e.g. `News Corp`, `Benzinga` |
| `news[].published` | string \| null | relative, e.g. `1 hour ago` |

Full example: [sample-output.json](sample-output.json) (the page above; every list shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-finance-markets@1" \
  --data-urlencode "target_url=https://www.google.com/finance/?hl=en"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/google-finance-markets@1` on https://www.google.com/finance/?hl=en
> and write a short market brief: the major indexes, the top gainers and losers, and three headlines.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch** through a US proxy; everything is in the server-rendered HTML.
- **No separate market list pages:** in the 2026 layout `/finance/markets/most-active`, `/gainers`, `/losers`,
  `/indexes`, `/cryptocurrencies` and `/currencies` all redirect to this home page, so this extractor covers them.
  Use the home URL above (links like `moreEarningsUrl` resolve against the URL you pass).
- **Google picks a region per request.** The sectors table was the US one (11 Cboe sectors, `SIX*`) in most
  fetches and the European one (10 STOXX sectors, `SX*P`) in others, as in the sample. Earnings times use the time
  zone Google chose for the request (seen: `GMT-05:00`, `EST`, `CET`, `GMT+03:00`).
- **Movers lists hold 4 stocks each**, the earnings box 4-5 companies; use the
  [Google Finance Earnings Scraper](../google-finance-earnings-scraper/) for the full calendar.
- **Not included:** the AI-written market summary and the economic events tab (shown only in some responses).
- **Values change on every request** (prices, news, relative times).
- **Generated class names:** Google Finance uses obfuscated CSS classes; a Google redesign can break the extractor.
- **Tested** on 3 fetches of the home page (and `/finance/markets/most-active`, which redirects here).

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the real page (shortened)
