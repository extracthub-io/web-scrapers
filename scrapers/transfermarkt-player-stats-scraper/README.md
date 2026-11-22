# Transfermarkt Player Stats Scraper (season stats and match log)

Turn a Transfermarkt player stats page into JSON: the season's totals per competition (appearances, goals,
assists, cards, minutes) and every match per competition with matchday, date, venue, opponent, result,
position, goals, assists, card minutes, minutes played and the absence note (not in squad, on the bench,
injury), plus the player's name, id, shirt number, club and the season. Good for scouting reports, fantasy
football data and player form tracking.

**Catalog:** [extracthub.io/extractor/@extracthub1/transfermarkt-player-stats](https://extracthub.io/extractor/@extracthub1/transfermarkt-player-stats)
**Extractor id:** `@extracthub1/transfermarkt-player-stats@1` · **Price:** $0.0035 per page

## Input

A Transfermarkt player stats URL (the "Stats" tab of a player, current season):

```
https://www.transfermarkt.com/<player-name>/leistungsdaten/spieler/<player-id>
```

e.g. `https://www.transfermarkt.com/erling-haaland/leistungsdaten/spieler/418560`

## Output

| Field | Type | Description |
|---|---|---|
| `playerId` | string | Transfermarkt player id, e.g. `418560` |
| `pageUrl` | string \| null | canonical URL of the page |
| `name` | string | e.g. `Erling Haaland` |
| `shirtNumber` | number \| null | e.g. `9` |
| `club` | string \| null | short club name, e.g. `Man City` |
| `clubUrl` | string \| null | club page on Transfermarkt |
| `season` | string \| null | e.g. `26/27` |
| `goalkeeper` | boolean | `true` when the page shows goalkeeper columns (see Good to know) |
| `statColumns` | array | the column names of the competitions table, e.g. `["Appearances", "Goals", "Assists", ...]` |
| `competitions[]` | array | season totals, one row per competition |
| `competitions[].competition` | string | e.g. `Premier League` |
| `competitions[].competitionId` | string \| null | e.g. `GB1` |
| `competitions[].appearances` | number \| null | e.g. `11` |
| `competitions[].goals` | number \| null | e.g. `9`; goals conceded for goalkeepers |
| `competitions[].assists` | number \| null | clean sheets for goalkeepers |
| `competitions[].yellowCards` | number \| null | |
| `competitions[].secondYellowCards` | number \| null | |
| `competitions[].redCards` | number \| null | |
| `competitions[].minutesPlayed` | number \| null | e.g. `980` |
| `matchesByCompetition[]` | array | the match log, one entry per competition |
| `matchesByCompetition[].competition` | string | e.g. `UEFA Champions League` |
| `matchesByCompetition[].competitionId` | string \| null | e.g. `CL` |
| `matchesByCompetition[].matches[]` | array | the matches in date order |
| `...matches[].matchday` | string \| null | matchday or round, e.g. `1`, `Group Stage` |
| `...matches[].date` | string | `DD/MM/YY`, e.g. `08/09/26` |
| `...matches[].venue` | string \| null | `H` (home) or `A` (away) |
| `...matches[].club` | string \| null | the player's team, e.g. `Manchester City` |
| `...matches[].opponent` | string \| null | e.g. `Porto` |
| `...matches[].opponentId` | string \| null | Transfermarkt club id, e.g. `720` |
| `...matches[].result` | string \| null | home:away, e.g. `0:2`, `6:5 on pens` |
| `...matches[].outcome` | string \| null | for the player's team: `win`, `draw` or `loss` |
| `...matches[].matchUrl` | string \| null | match report page |
| `...matches[].position` | string \| null | position played, e.g. `CF` |
| `...matches[].goals` | number \| null | e.g. `2` |
| `...matches[].assists` | number \| null | |
| `...matches[].yellowCard` | string \| null | minute of the card, e.g. `90 + 3'` |
| `...matches[].secondYellowCard` | string \| null | minute |
| `...matches[].redCard` | string \| null | minute |
| `...matches[].minutesPlayed` | number \| null | e.g. `90` |
| `...matches[].note` | string \| null | when the player did not play, e.g. `Not in squad`, `on the bench`, an injury |

Full example: [sample-output.json](sample-output.json) (the Erling Haaland page above; 2 matches per competition
shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/transfermarkt-player-stats@1" \
  --data-urlencode "target_url=https://www.transfermarkt.com/erling-haaland/leistungsdaten/spieler/418560"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/transfermarkt-player-stats@1` on
> https://www.transfermarkt.com/erling-haaland/leistungsdaten/spieler/418560
> and list his goals per match in the Premier League this season.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **JavaScript rendering** through a US proxy: plain fetches of transfermarkt.com are answered with HTTP 202
  (a bot check), and the stats tables are drawn by the page's scripts. A 202 fails the call (`target_error`,
  charged), so retry it; batches retry once on their own.
- **Goalkeepers:** Transfermarkt shows *goals conceded* and *clean sheets* in the 2nd and 3rd stat column of a
  goalkeeper's competitions table, where outfield players have goals and assists. The values come in `goals`
  and `assists`; check `goalkeeper` (or `statColumns`) before reading them. The match log has the same columns
  for every position.
- **`null` instead of 0:** Transfermarkt writes `-` for zero goals, cards or appearances; these come as `null`.
- **Compact view of the current season.** Other seasons (`/saison/<year>`) and the detailed view (`/plus/1`)
  were not tested.
- **Dates** are as Transfermarkt.com writes them (`DD/MM/YY`).
- **Use the `.com` site.** Other Transfermarkt domains were not tested.
- **Tested players:** Erling Haaland, Jude Bellingham, Thibaut Courtois (goalkeeper).

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real stats page (shortened)
