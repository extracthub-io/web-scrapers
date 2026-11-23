# CoinMarketCap Coin Scraper (price, market cap, supply, all-time high)

Turn a CoinMarketCap coin page into JSON: name, symbol, rank, USD price, 1h / 24h / 7d / 30d / 60d / 90d / 1y /
year-to-date change, market cap, fully diluted market cap, dominance, 24h / 7d / 30d volume with the CEX / DEX split,
circulating / total / max supply, the 24h, 7d, 30d, 90d and 52-week high and low, all-time high and low with dates,
yesterday's open and close, launch date, tags, contract addresses per chain, website, whitepaper, explorers, source
code and social links, holder counts and the CertiK rating. Good for coin research, portfolio trackers and crypto
databases.

**Catalog:** [extracthub.io/extractor/@extracthub1/coinmarketcap-coin](https://extracthub.io/extractor/@extracthub1/coinmarketcap-coin)
**Extractor id:** `@extracthub1/coinmarketcap-coin@1` · **Price:** $0.0025 per page

## Input

A CoinMarketCap coin page:

```
https://coinmarketcap.com/currencies/<slug>/
```

e.g. `https://coinmarketcap.com/currencies/bitcoin/` (Bitcoin).

## Output

Everything sits in one `coin` object.

| Field | Type | Description |
|---|---|---|
| `coin.id` | number | CoinMarketCap id, e.g. `1` |
| `coin.name` | string | e.g. `Bitcoin` |
| `coin.symbol` | string | e.g. `BTC` |
| `coin.slug` | string | e.g. `bitcoin` |
| `coin.category` | string | `coin` or `token` |
| `coin.status` | string | e.g. `active` |
| `coin.rank` | number | e.g. `1` |
| `coin.price` | number | in USD, e.g. `60673.50` |
| `coin.percentChange1h` / `24h` / `7d` / `30d` / `60d` / `90d` / `1y` / `Ytd` | number | price change in percent |
| `coin.marketCap` / `fullyDilutedMarketCap` | number | in USD |
| `coin.marketCapChange24h` | number | in percent |
| `coin.dominance` | number | share of the total crypto market cap in percent, e.g. `58.80` |
| `coin.volume24h` / `volume7d` / `volume30d` | number | trading volume in USD |
| `coin.volume24hReported` | number | volume as reported by exchanges, in USD |
| `coin.volumeChange24h` | number | in percent |
| `coin.volumeRank` | number | rank by 24h volume |
| `coin.cexVolume24h` / `dexVolume24h` | number | centralized / decentralized exchange volume in USD |
| `coin.turnover` | number | volume / market cap |
| `coin.circulatingSupply` / `totalSupply` | number | in coins |
| `coin.maxSupply` | number \| null | `null` when there is no cap |
| `coin.infiniteMaxSupply` | number | `1` when the supply is uncapped |
| `coin.low24h` / `high24h`, `low7d` / `high7d`, `low30d` / `high30d`, `low90d` / `high90d`, `low52w` / `high52w` | number | in USD |
| `coin.allTimeHigh` / `allTimeLow` | number | in USD |
| `coin.allTimeHighDate` / `allTimeLowDate` | string | ISO time |
| `coin.allTimeHighChangePercent` | number | distance from the all-time high in percent, e.g. `-51.94` |
| `coin.openYesterday` / `closeYesterday` | number | in USD |
| `coin.dateAdded` / `dateLaunched` | string \| null | ISO dates |
| `coin.lastUpdated` | string | ISO time of the quote |
| `coin.watchlistCount` | number | users watching the coin |
| `coin.tags` | string[] | e.g. `Mineable`, `PoW`, `Store Of Value` |
| `coin.platforms[]` | array | token contracts: `name` (chain, e.g. `Ethereum`), `contractAddress`; empty for native coins |
| `coin.website` / `whitepaper` / `explorers` / `sourceCode` / `reddit` / `twitter` / `chat` | string[] | links, may be empty |
| `coin.holderCount` / `dailyActiveAddresses` | number \| null | on-chain holder stats |
| `coin.topTenHolderRatio` / `topHundredHolderRatio` | number \| null | share held by the top 10 / 100 addresses in percent |
| `coin.ratings[]` | array | `provider` (e.g. `CertiK`), `score`, `rating`, `updatedAt` |
| `coin.similarCoins` | string[] | symbols CoinMarketCap shows as similar |

Full example: [sample-output.json](sample-output.json) (the Bitcoin page above).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/coinmarketcap-coin@1" \
  --data-urlencode "target_url=https://coinmarketcap.com/currencies/bitcoin/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/coinmarketcap-coin@1` on
> https://coinmarketcap.com/currencies/bitcoin/
> and tell me the price, market cap, circulating vs max supply and how far it is below its all-time high.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** all values come from the data embedded in the page (`__NEXT_DATA__`), fetched through a US
  proxy; numbers are unrounded. No browser is needed.
- **USD only:** prices, market caps and volumes are in US dollars.
- **Not included:** the price chart, the markets / exchanges table, news and the coin description (CoinMarketCap
  loads them in the browser; the embedded description is empty).
- **Tokens:** `platforms` lists the contract address on each chain (USDT: Ethereum, BNB Smart Chain, Solana, ...).
- **Tested** on Bitcoin, Tether USDt and Chainlink.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the Bitcoin page
