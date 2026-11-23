# CoinMarketCap Listing Scraper (top cryptocurrencies, prices, market cap)

Turn a CoinMarketCap listing page into JSON: the 100 cryptocurrencies of the page ranked by market cap, each with
rank, CoinMarketCap id, name, symbol, slug, USD price, 1h / 24h / 7d / 30d / 90d / 1y / year-to-date change, market
cap, fully diluted market cap, 24h and 7d volume, market dominance, circulating / total / max supply, 24h high and
low, all-time high and low, number of market pairs and listing date, plus the global market stats shown above the
table (total market cap, 24h volume, BTC and ETH dominance, number of coins, exchanges and market pairs). Good for
crypto price trackers, market dashboards and coin databases.

**Catalog:** [extracthub.io/extractor/@extracthub1/coinmarketcap-listing](https://extracthub.io/extractor/@extracthub1/coinmarketcap-listing)
**Extractor id:** `@extracthub1/coinmarketcap-listing@2` · **Price:** $0.0025 per page

## Input

The CoinMarketCap home page (coins 1-100) or a further page of the same ranking:

```
https://coinmarketcap.com/
https://coinmarketcap.com/?page=<N>
```

e.g. `https://coinmarketcap.com/` (the top 100 cryptocurrencies).

## Output

| Field | Type | Description |
|---|---|---|
| `page` | number | page of the ranking, e.g. `1` |
| `pageSize` | number | coins per page, `100` |
| `totalCoins` | number | coins in the ranking, e.g. `7921` |
| `globalMetrics` | object | market-wide stats |
| `globalMetrics.totalMarketCap` | number | in USD, e.g. `2076793816531.68` |
| `globalMetrics.totalMarketCapChange24h` | number | in percent, e.g. `0.95` |
| `globalMetrics.totalVolume24h` | number | in USD |
| `globalMetrics.totalVolumeChange24h` | number | in percent |
| `globalMetrics.btcDominance` / `ethDominance` | number | in percent, e.g. `58.88` |
| `globalMetrics.activeCryptocurrencies` / `activeExchanges` / `marketPairs` | number | counts, e.g. `40244`, `989`, `106261` |
| `globalMetrics.defiMarketCap` / `derivativesVolume24h` / `stablecoinVolume24h` | number | in USD |
| `coins[]` | array | the coins of the page in rank order (100) |
| `coins[].rank` | number | CoinMarketCap rank, e.g. `1` |
| `coins[].id` | number | CoinMarketCap id, e.g. `1` (Bitcoin) |
| `coins[].name` | string | e.g. `Bitcoin` |
| `coins[].symbol` | string | e.g. `BTC` |
| `coins[].slug` | string | e.g. `bitcoin`; the coin page is `https://coinmarketcap.com/currencies/<slug>/` |
| `coins[].quoteCurrency` | string | currency of the price fields, `USD` |
| `coins[].price` | number | e.g. `60793.31` |
| `coins[].percentChange1h` / `24h` / `7d` / `30d` / `90d` / `1y` / `Ytd` | number | price change in percent, e.g. `-0.33` |
| `coins[].marketCap` | number | in USD |
| `coins[].fullyDilutedMarketCap` | number | in USD |
| `coins[].volume24h` / `volume7d` | number | trading volume in USD |
| `coins[].dominance` | number | share of the total market cap in percent |
| `coins[].circulatingSupply` / `totalSupply` | number | in coins |
| `coins[].maxSupply` | number \| null | `null` when there is no cap (e.g. ETH) |
| `coins[].high24h` / `low24h` | number | in USD |
| `coins[].allTimeHigh` / `allTimeLow` | number | in USD |
| `coins[].marketPairCount` | number | e.g. `12787` |
| `coins[].dateAdded` | string | ISO date the coin was listed on CoinMarketCap |
| `coins[].lastUpdated` | string | ISO time of the quote |

Full example: [sample-output.json](sample-output.json) (the home page above; coins shortened to 5 of 100).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/coinmarketcap-listing@2" \
  --data-urlencode "target_url=https://coinmarketcap.com/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/coinmarketcap-listing@2` on
> https://coinmarketcap.com/
> and list the 10 biggest coins with their price, 24h change and market cap.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the full table data is embedded in the page (`__NEXT_DATA__`), fetched through a US proxy; no
  browser is needed. The visible HTML table only renders the first ~20 rows; this extractor reads all 100 from the
  embedded data, with unrounded numbers.
- **USD only:** prices and volumes are in US dollars. CoinMarketCap also embeds BTC and ETH quotes; they are not
  extracted.
- **Index row skipped:** the home page pins the "CoinMarketCap 20 Index DTF" above the ranking without a rank; it
  is dropped, so `coins` holds the 100 ranked coins.
- **Version 2:** 1.0.0 returned the same values, but its output schema declared the quote fields (`price`,
  `percentChange*`, `marketCap`, `volume*`, `dominance`, `quoteCurrency`) as arrays. Use `@2`.
- **Fragile spot:** the list is read from a fixed position of the embedded query cache and the USD quote from the
  third quote entry; a CoinMarketCap redesign of that data would need a new version.
- **Tested** on pages 1, 2 and 5 (coins 1-100, 101-200, 401-500): 100 coins each.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the home page (shortened)
