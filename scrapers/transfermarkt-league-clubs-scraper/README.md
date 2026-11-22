# Transfermarkt League Clubs Scraper (clubs and market values of a league)

Turn a Transfermarkt league overview page into JSON: every club with club id, club and squad links, squad
size, average age, foreigners, average and total market value, plus the league's country, level, reigning
champion, number of teams and players, foreigners, average age, average market value, most valuable player and
total market value. Good for league comparisons, market value tables and as the list step before the
[Transfermarkt Squad Scraper](../transfermarkt-squad-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/transfermarkt-league-clubs](https://extracthub.io/extractor/@extracthub1/transfermarkt-league-clubs)
**Extractor id:** `@extracthub1/transfermarkt-league-clubs@1` · **Price:** $0.0035 per page

## Input

A Transfermarkt league overview URL:

```
https://www.transfermarkt.com/<league-name>/startseite/wettbewerb/<league-id>
```

e.g. `https://www.transfermarkt.com/premier-league/startseite/wettbewerb/GB1`

## Output

| Field | Type | Description |
|---|---|---|
| `leagueId` | string | Transfermarkt league id, e.g. `GB1` |
| `pageUrl` | string \| null | canonical URL of the page |
| `league` | string | e.g. `Premier League` |
| `season` | string \| null | e.g. `26/27` |
| `country` | string \| null | e.g. `England` |
| `leagueLevel` | string \| null | e.g. `First Tier` |
| `reigningChampion` | string \| null | e.g. `Arsenal FC` |
| `numberOfTeams` | number \| null | e.g. `20` |
| `players` | number \| null | players in the league, e.g. `548` |
| `foreigners` | number \| null | e.g. `394` |
| `foreignersShare` | string \| null | e.g. `71.9%` |
| `averageMarketValue` | string \| null | per player, e.g. `€25.74M` |
| `averageAge` | number \| null | e.g. `26.3` |
| `mostValuablePlayer` | string \| null | e.g. `Erling Haaland` |
| `mostValuablePlayerUrl` | string \| null | profile URL of that player |
| `totalMarketValue` | string \| null | as shown, e.g. `€14.11B` |
| `totalMarketValueEur` | number \| null | in euros, e.g. `14110000000` |
| `clubs[]` | array | the clubs in page order (by total market value) |
| `clubs[].position` | number | 1-based position in the list |
| `clubs[].club` | string | e.g. `Manchester City` |
| `clubs[].clubId` | string | Transfermarkt club id, e.g. `281` |
| `clubs[].clubUrl` | string \| null | club page of this season |
| `clubs[].squadUrl` | string \| null | squad page of this season (input of the Squad Scraper) |
| `clubs[].logo` | string \| null | club crest image URL |
| `clubs[].squadSize` | number \| null | e.g. `24` |
| `clubs[].averageAge` | number \| null | e.g. `25.6` |
| `clubs[].foreigners` | number \| null | e.g. `17` |
| `clubs[].averageMarketValue` | string \| null | as shown, e.g. `€62.43M` |
| `clubs[].averageMarketValueEur` | number \| null | in euros, e.g. `62430000` |
| `clubs[].totalMarketValue` | string \| null | as shown, e.g. `€1.50B` |
| `clubs[].totalMarketValueEur` | number \| null | in euros, e.g. `1500000000` |

Full example: [sample-output.json](sample-output.json) (the Premier League page above; 4 of 20 clubs shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/transfermarkt-league-clubs@1" \
  --data-urlencode "target_url=https://www.transfermarkt.com/premier-league/startseite/wettbewerb/GB1"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/transfermarkt-league-clubs@1` on
> https://www.transfermarkt.com/premier-league/startseite/wettbewerb/GB1
> and list the five clubs with the highest total market value and their average age.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **JavaScript rendering** through a US proxy: plain fetches of transfermarkt.com are answered with HTTP 202
  (a bot check). A 202 fails the call (`target_error`, charged), so retry it; batches retry once on their own.
- **Pipeline:** pass `clubs[].squadUrl` to the [Transfermarkt Squad Scraper](../transfermarkt-squad-scraper/)
  to get every player of the league.
- **Past seasons:** add `/saison_id/<year>` to the URL; this was not tested.
- **Only the clubs table** of the page is read; the table, top scorers and news boxes next to it are not (use
  the [Transfermarkt League Table Scraper](../transfermarkt-league-table-scraper/) for the standings).
- **Use the `.com` site.** Other Transfermarkt domains were not tested.
- **Tested leagues:** Premier League, Serie A, Ligue 1.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real league page (shortened)
