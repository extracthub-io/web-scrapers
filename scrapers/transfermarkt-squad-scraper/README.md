# Transfermarkt Squad Scraper (club players and market values)

Turn a Transfermarkt club squad page into JSON: every player with shirt number, name, player id, profile
link, position, age, nationalities, contract end and market value, plus the club's league, season, squad
size, average age, stadium and total market value. Good for squad databases, market value tables and as the
list step before the [Transfermarkt Player Scraper](../transfermarkt-player-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/transfermarkt-squad](https://extracthub.io/extractor/@extracthub1/transfermarkt-squad)
**Extractor id:** `@extracthub1/transfermarkt-squad@1` · **Price:** $0.0035 per page

## Input

A Transfermarkt squad page of a club (compact view):

```
https://www.transfermarkt.com/<club-name>/kader/verein/<club-id>
```

e.g. `https://www.transfermarkt.com/manchester-city/kader/verein/281`

## Output

| Field | Type | Description |
|---|---|---|
| `clubId` | string | Transfermarkt club id, e.g. `281` |
| `pageUrl` | string \| null | canonical URL of the page |
| `club` | string | e.g. `Manchester City` |
| `league` | string \| null | e.g. `Premier League` |
| `leagueUrl` | string \| null | league page on Transfermarkt |
| `season` | string \| null | e.g. `26/27` |
| `squadSize` | number \| null | e.g. `24` |
| `averageAge` | number \| null | e.g. `25.6` |
| `foreigners` | number \| null | e.g. `17` |
| `nationalTeamPlayers` | number \| null | e.g. `22` |
| `stadium` | string \| null | e.g. `Etihad Stadium` |
| `transferRecord` | string \| null | transfer balance of the season, e.g. `-€189.18M` |
| `tablePosition` | number \| null | current league position, e.g. `3` |
| `totalMarketValue` | string \| null | as shown, e.g. `€1.50B` |
| `totalMarketValueEur` | number \| null | in euros, e.g. `1500000000` |
| `players[]` | array | the squad in page order (goalkeepers, defenders, midfielders, forwards) |
| `players[].shirtNumber` | number \| null | e.g. `1` |
| `players[].name` | string | e.g. `Gianluigi Donnarumma` |
| `players[].playerId` | string | e.g. `315858` |
| `players[].profileUrl` | string | e.g. `https://www.transfermarkt.com/gianluigi-donnarumma/profil/spieler/315858` |
| `players[].position` | string | e.g. `Goalkeeper`, `Centre-Back` |
| `players[].positionGroup` | string | `Goalkeeper`, `Defender`, `Midfield` or `Attack` |
| `players[].age` | number | e.g. `27` |
| `players[].nationalities` | array | e.g. `["Argentina", "Italy"]` |
| `players[].contractExpires` | string | `DD/MM/YYYY`, e.g. `30/06/2030` |
| `players[].marketValue` | string | as shown, e.g. `€45.00M` |
| `players[].marketValueEur` | number | in euros, e.g. `45000000` |
| `players[].injury` | string \| null | e.g. `Hip injury - Return unknown` |
| `players[].captain` | boolean | `true` for the team captain |
| `players[].signedFrom` | string \| null | for this season's signings, e.g. `Joined from Olympique Marseille; date: 12/08/2026; fee: €3.50M` |
| `players[].image` | string | portrait image URL |

Full example: [sample-output.json](sample-output.json) (the Manchester City page above; 4 of 24 players shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/transfermarkt-squad@1" \
  --data-urlencode "target_url=https://www.transfermarkt.com/manchester-city/kader/verein/281"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/transfermarkt-squad@1` on
> https://www.transfermarkt.com/manchester-city/kader/verein/281
> and list the five most valuable players with their contract end.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **JavaScript rendering** through a US proxy: plain fetches of transfermarkt.com were answered with HTTP 202
  (a bot check) on 4 of 4 tries. Rendered fetches came through on 8 of 9 squad pages; a 202 fails the call
  (`target_error`, charged), so retry it. Batches retry once on their own.
- **Compact view only.** The fields follow the columns of the default squad table (#, player, age, nat.,
  contract, market value). The detailed view (`/plus/1` in the URL) has other columns and is not supported.
- **Past seasons:** `/saison_id/<year>` at the end of the URL shows another season; this was not tested.
- **Dates** are as Transfermarkt.com writes them (`DD/MM/YYYY`).
- **Player details** (date of birth, height, foot, agent, joined date) are on the player profile: pass
  `players[].profileUrl` to the [Transfermarkt Player Scraper](../transfermarkt-player-scraper/).
- **Use the `.com` site.** Other Transfermarkt domains were not tested.
- **Tested clubs:** Manchester City, Real Madrid, FC Bayern Munich.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real squad page (shortened)
