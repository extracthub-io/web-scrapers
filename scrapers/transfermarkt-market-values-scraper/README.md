# Transfermarkt Market Values Scraper (most valuable players)

Turn the Transfermarkt most valuable players ranking into JSON: every player on the page with rank, name, player
id, profile link, position, image, age, nationalities, club (name and id), market value (as shown and in euros)
and the market value history link, plus the page number, last page and next page URL. Good for market value
rankings, scouting lists and tracking value changes over time.

**Catalog:** [extracthub.io/extractor/@extracthub1/transfermarkt-market-values](https://extracthub.io/extractor/@extracthub1/transfermarkt-market-values)
**Extractor id:** `@extracthub1/transfermarkt-market-values@1` · **Price:** $0.0035 per page

## Input

The Transfermarkt most valuable players page, 25 players per page:

```
https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop?page=<n>
```

e.g. `https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop` (page 1)

## Output

| Field | Type | Description |
|---|---|---|
| `pageUrl` | string \| null | URL of the page |
| `page` | number \| null | current page, e.g. `1` |
| `lastPage` | number \| null | e.g. `20` |
| `nextPageUrl` | string \| null | next page; `null` on the last page |
| `players[]` | array | the players in ranking order |
| `players[].rank` | number | e.g. `1` (players with the same value share a rank) |
| `players[].name` | string | e.g. `Lamine Yamal` |
| `players[].playerId` | string \| null | e.g. `937958` |
| `players[].profileUrl` | string \| null | player profile URL |
| `players[].position` | string \| null | e.g. `Right Winger` |
| `players[].image` | string \| null | portrait image URL |
| `players[].age` | number \| null | e.g. `19` |
| `players[].nationalities` | array | e.g. `["Spain"]` |
| `players[].club` | string \| null | e.g. `FC Barcelona` |
| `players[].clubId` | string \| null | e.g. `131` |
| `players[].marketValue` | string | as shown, e.g. `€220.00M` |
| `players[].marketValueEur` | number \| null | in euros, e.g. `220000000` |
| `players[].marketValueHistoryUrl` | string \| null | the player's market value history page |

Full example: [sample-output.json](sample-output.json) (page 1 above; 4 of 25 players shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/transfermarkt-market-values@1" \
  --data-urlencode "target_url=https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/transfermarkt-market-values@1` on
> https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop
> and group the 25 most valuable players by club.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **JavaScript rendering** through a US proxy: plain fetches of transfermarkt.com are answered with HTTP 202
  (a bot check). A 202 fails the call (`target_error`, charged), so retry it; batches retry once on their own.
- **Pages:** 20 pages of 25 players (the top 500). Follow `nextPageUrl`, or add `?page=<n>` to the URL.
- **Filters:** the page's own filters (position, age group, country, ...) end up in the URL query and work as
  input, but only the default ranking was tested.
- **Player details** are on the profile: pass `players[].profileUrl` to the
  [Transfermarkt Player Scraper](../transfermarkt-player-scraper/).
- **Use the `.com` site.** Other Transfermarkt domains were not tested.
- **Tested pages:** 1, 2 and 20 (the last page, without `nextPageUrl`).

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real ranking page (shortened)
