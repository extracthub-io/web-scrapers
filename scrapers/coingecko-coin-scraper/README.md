# CoinGecko Coin Scraper (price, market cap, supply, all-time high)

Turn a CoinGecko coin page into JSON: name, symbol, rank, USD and BTC price, the 24h range, 1h / 24h / 7d / 14d /
30d / 1y change, market cap, the whole statistics table (fully diluted valuation, 24h volume, open interest,
circulating / total / max supply, treasury holdings, TVL for DeFi tokens), all-time high and low with dates,
website, whitepaper, explorer, wallet, community and source code links, categories, the editorial description and
the community sentiment vote. Good for coin research, portfolio trackers and crypto databases.

**Catalog:** [extracthub.io/extractor/@extracthub1/coingecko-coin](https://extracthub.io/extractor/@extracthub1/coingecko-coin)
**Extractor id:** `@extracthub1/coingecko-coin@1` · **Price:** $0.0025 per page

## Input

A CoinGecko coin page:

```
https://www.coingecko.com/en/coins/<api-id>
```

e.g. `https://www.coingecko.com/en/coins/bitcoin` (Bitcoin).

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | e.g. `Bitcoin` (required) |
| `symbol` | string | e.g. `BTC` |
| `apiId` | string | CoinGecko API id, the last part of the URL, e.g. `bitcoin` |
| `coinId` | number | CoinGecko internal id, e.g. `1` |
| `rank` | number | market cap rank, e.g. `1` |
| `image` | string | logo URL |
| `priceUsd` | number | current price in USD, unrounded, e.g. `60906.77` (required) |
| `priceText` | string | price as shown, e.g. `$60,906.77` |
| `priceBtc` | number | price in BTC |
| `low24hUsd` / `high24hUsd` | number | 24h range in USD |
| `change1hPercent` / `change24hPercent` / `change7dPercent` / `change14dPercent` / `change30dPercent` / `change1yPercent` | number | price change in percent, signed, e.g. `-5.49` |
| `marketCapUsd` | number | market cap in USD |
| `statistics[]` | array | every row of the statistics table: `label` (e.g. `Fully Diluted Valuation`, `24 Hour Trading Vol`, `Circulating Supply`, `Max Supply`), `value` (as shown, e.g. `$1.225T`, `20.117M`, `∞`), `valueUsd` (exact USD amount for money rows), `valueExact` (exact count for supply rows, e.g. `20116503`) |
| `allTimeHighUsd` / `allTimeLowUsd` | number | in USD, e.g. `126080` |
| `allTimeHighDate` / `allTimeLowDate` | string | as shown, e.g. `Oct 06, 2025` |
| `allTimeHighChangePercent` / `allTimeLowChangePercent` | number | distance of the current price from it in percent, e.g. `-51.69` |
| `historicalPrice[]` | array | the "Historical Price" rows: `label` (`24h Range`, `7d Range`, `All-Time High`, `All-Time Low`), `value` (as shown), `dateText` |
| `websites` | string[] | website and whitepaper links |
| `explorers` / `wallets` / `community` / `sourceCode` | string[] | links, may be empty |
| `categories` | string[] | chains / ecosystems and categories, e.g. `Layer 1 (L1)`, `Proof of Work (PoW)` |
| `description` | string[] | paragraphs of the "About" text |
| `sentimentPositivePercent` / `sentimentNegativePercent` | number | community vote, e.g. `70` / `30` |

Full example: [sample-output.json](sample-output.json) (the Bitcoin page above; `description` and `explorers`
shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/coingecko-coin@1" \
  --data-urlencode "target_url=https://www.coingecko.com/en/coins/bitcoin"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/coingecko-coin@1` on
> https://www.coingecko.com/en/coins/bitcoin
> and tell me the price, 7-day change, circulating vs max supply and how far it is below its all-time high.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** CoinGecko renders the page on the server, fetched through a US proxy. Exact numbers come from
  the `data-price-usd` / `data-json` attributes next to the rounded display text. No browser is needed.
- **USD only:** prices, market caps and volumes are in US dollars.
- **Statistics as rows:** the table differs per coin (perps / open interest rows for big coins, TVL rows for DeFi
  tokens, treasury holdings), so it comes as `label` / `value` rows instead of fixed fields. Rows hidden behind
  an expand arrow in the browser (Market Cap / FDV, OI / Market Cap) are included.
- **All-time high / low** fields read the 3rd and 4th row of the Historical Price table; `historicalPrice[]` has
  the same rows with their labels.
- **Not included:** the price chart, the markets / exchanges table, news and the AI "Why is it moving" summary
  (loaded in the browser or not part of the coin data). Contract addresses of tokens appear only as explorer links.
- **Long lists:** big tokens list many explorers (59 for Chainlink) and categories (104 for Chainlink).
- **Tested** on Bitcoin, Ethereum and Chainlink.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on the Bitcoin page
