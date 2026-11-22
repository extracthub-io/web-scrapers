# Transfermarkt League Table Scraper (standings)

Turn a Transfermarkt league table into JSON: every club with position, previous position, club id, matches,
wins, draws, losses, goals for and against, goal difference and points, plus the league name, id and season.
Works for any league on Transfermarkt (Premier League, LaLiga, Bundesliga, Serie A, ...). Good for standings
widgets, league dashboards and tracking the table week by week.

**Catalog:** [extracthub.io/extractor/@extracthub1/transfermarkt-league-table](https://extracthub.io/extractor/@extracthub1/transfermarkt-league-table)
**Extractor id:** `@extracthub1/transfermarkt-league-table@1` · **Price:** $0.0035 per page

## Input

A Transfermarkt league table URL:

```
https://www.transfermarkt.com/<league-name>/tabelle/wettbewerb/<league-id>
```

e.g. `https://www.transfermarkt.com/premier-league/tabelle/wettbewerb/GB1`

## Output

| Field | Type | Description |
|---|---|---|
| `leagueId` | string | Transfermarkt league id, e.g. `GB1` |
| `pageUrl` | string \| null | URL of the page |
| `league` | string | e.g. `Premier League` |
| `season` | string \| null | e.g. `26/27` |
| `table[]` | array | the clubs in table order |
| `table[].position` | number | e.g. `1` |
| `table[].previousPosition` | number \| null | position after the previous matchday, e.g. `1` |
| `table[].club` | string | short name, e.g. `Arsenal` |
| `table[].clubFullName` | string \| null | e.g. `Arsenal FC` |
| `table[].clubId` | string \| null | Transfermarkt club id, e.g. `11` |
| `table[].fixturesUrl` | string \| null | the club's fixtures page of this season |
| `table[].logo` | string \| null | club crest image URL |
| `table[].matches` | number \| null | matches played, e.g. `11` |
| `table[].wins` | number \| null | e.g. `9` |
| `table[].draws` | number \| null | e.g. `1` |
| `table[].losses` | number \| null | e.g. `1` |
| `table[].goals` | string \| null | as shown, e.g. `17:7` |
| `table[].goalsFor` | number \| null | e.g. `17` |
| `table[].goalsAgainst` | number \| null | e.g. `7` |
| `table[].goalDifference` | number \| null | e.g. `10` |
| `table[].points` | number | e.g. `28` |

Full example: [sample-output.json](sample-output.json) (the Premier League page above; 4 of 20 clubs shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/transfermarkt-league-table@1" \
  --data-urlencode "target_url=https://www.transfermarkt.com/premier-league/tabelle/wettbewerb/GB1"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/transfermarkt-league-table@1` on
> https://www.transfermarkt.com/premier-league/tabelle/wettbewerb/GB1
> and show the top four with their points and goal difference.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **JavaScript rendering** through a US proxy: plain fetches of transfermarkt.com are answered with HTTP 202
  (a bot check). A 202 fails the call (`target_error`, charged), so retry it; batches retry once on their own.
- **Past seasons:** add `/saison_id/<year>` to the URL (e.g. `/saison_id/2025` for 25/26); this was not tested.
- **Club pages:** `table[].clubId` is the id used in every Transfermarkt club URL, e.g. the squad page
  `https://www.transfermarkt.com/-/kader/verein/<clubId>` for the
  [Transfermarkt Squad Scraper](../transfermarkt-squad-scraper/).
- **Leagues with play-offs or groups** (cups, MLS conferences) were not tested.
- **Use the `.com` site.** Other Transfermarkt domains were not tested.
- **Tested leagues:** Premier League, LaLiga, Bundesliga.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real league table (shortened)
