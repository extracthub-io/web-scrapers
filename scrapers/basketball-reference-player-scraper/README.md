# Basketball-Reference Player Scraper (NBA player stats)

Turn a Basketball-Reference player page into JSON: name, player id, headshot, bio lines (full name, position,
shoots, height / weight, team, birth, college, draft, NBA debut, experience), birth date and place, height, weight,
honors (All-Star selections, MVPs, titles), every regular-season row of the per-game stats table (season, age,
team, position, games, minutes, field goals, 3-pointers, 2-pointers, free throws, rebounds, assists, steals,
blocks, turnovers, fouls, points, awards), career and per-team per-game averages, and career totals. Good for
player comparison tools, fantasy basketball research and sports data projects.

**Catalog:** [extracthub.io/extractor/@extracthub1/basketball-reference-player](https://extracthub.io/extractor/@extracthub1/basketball-reference-player)
**Extractor id:** `@extracthub1/basketball-reference-player@1` · **Price:** $0.0025 per page

## Input

A Basketball-Reference player page:

```
https://www.basketball-reference.com/players/<letter>/<player-id>.html
```

e.g. `https://www.basketball-reference.com/players/j/jamesle01.html` (LeBron James).

## Output

| Field | Type | Description |
|---|---|---|
| `name` | string | e.g. `LeBron James` |
| `playerId` | string \| null | Basketball-Reference id, e.g. `jamesle01` |
| `image` | string \| null | headshot URL |
| `bio[]` | array of strings | the bio lines as shown, e.g. `Position: Small Forward, Power Forward, ... ▪ Shoots: Right`, `6-9, 250lb (206cm, 113kg)`, `Team: Philadelphia 76ers`, `Draft: Cleveland Cavaliers, 1st round (1st pick, 1st overall), 2003 NBA Draft` |
| `birthDate` | string \| null | ISO date, e.g. `1984-12-30` |
| `birthPlace` | string \| null | e.g. `Akron, Ohio, United States` |
| `height` | string \| null | feet-inches, e.g. `6-9` |
| `weight` | string \| null | e.g. `250 lbs` |
| `honors[]` | array of strings | e.g. `22x All Star`, `4x MVP`, `4x NBA Champ` |
| `seasons[]` | array | one row per regular season (and per team in a traded season) |
| `seasons[].season` | string | e.g. `2003-04` |
| `seasons[].age` | number \| null | e.g. `19` |
| `seasons[].team` | string \| null | team code, e.g. `CLE`, `2TM` for a season with two teams (see Good to know) |
| `seasons[].teamUrl` | string \| null | e.g. `https://www.basketball-reference.com/teams/CLE/2004.html` |
| `seasons[].league` | string \| null | e.g. `NBA` |
| `seasons[].position` | string \| null | e.g. `SG` |
| `seasons[].games`, `gamesStarted` | number \| null | e.g. `79`, `79` |
| `seasons[].minutes` | number \| null | minutes per game, e.g. `39.5` |
| `seasons[].fg`, `fga`, `fgPct` | number \| null | field goals, attempts per game and percentage (0-1), e.g. `7.9`, `18.9`, `0.417` |
| `seasons[].fg3`, `fg3a`, `fg3Pct` | number \| null | 3-pointers, e.g. `0.8`, `2.7`, `0.29` |
| `seasons[].fg2`, `fg2a`, `fg2Pct` | number \| null | 2-pointers, e.g. `7.1`, `16.1`, `0.438` |
| `seasons[].efgPct` | number \| null | effective field goal %, e.g. `0.438` |
| `seasons[].ft`, `fta`, `ftPct` | number \| null | free throws, e.g. `4.4`, `5.8`, `0.754` |
| `seasons[].orb`, `drb`, `trb` | number \| null | offensive, defensive, total rebounds per game |
| `seasons[].ast`, `stl`, `blk`, `tov`, `pf` | number \| null | assists, steals, blocks, turnovers, fouls per game |
| `seasons[].pts` | number \| null | points per game, e.g. `20.9` |
| `seasons[].awards` | string \| null | award votes and teams, e.g. `MVP-9,ROY-1` |
| `careerPerGame[]` | array | career averages (`label` e.g. `24 Yrs`) and one row per team (e.g. `CLE (11 Yrs)`), same stat fields as `seasons[]` |
| `careerGames` | number \| null | e.g. `1634` |
| `careerMinutes` | number \| null | e.g. `61420` |
| `careerPoints` | number \| null | e.g. `43628` |
| `careerRebounds` | number \| null | e.g. `12177` |
| `careerAssists` | number \| null | e.g. `12098` |
| `careerSteals` | number \| null | e.g. `2430` |
| `careerBlocks` | number \| null | e.g. `1193` |
| `pageUrl` | string \| null | canonical URL, e.g. `https://www.basketball-reference.com/players/j/jamesle01.html` |

Full example: [sample-output.json](sample-output.json) (the LeBron James page above; `seasons[]` shortened to 3 of 24 rows).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/basketball-reference-player@1" \
  --data-urlencode "target_url=https://www.basketball-reference.com/players/j/jamesle01.html"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/basketball-reference-player@1` on
> https://www.basketball-reference.com/players/j/jamesle01.html
> and give me his points, rebounds and assists per game for every season, plus his career totals.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything comes from the server-rendered HTML, fetched through a US proxy; no browser is needed.
- **Traded seasons:** a season with several teams has a total row with team `2TM` / `3TM` (no `teamUrl`), followed
  by one row per team. Sum or filter on `team` accordingly.
- **Seasons without games** (retirement, injury) appear as rows whose `team` holds the note, e.g.
  `Did not play - retired`, with all stats `null`.
- **Percentages are fractions** (`0.417` = 41.7 %), as Basketball-Reference shows them (`.417`).
- **Bio lines are text:** Basketball-Reference has no labels in its markup, so position, shoots, team, college,
  draft and debut stay in `bio[]` as shown. The structured `birthDate`, `birthPlace`, `height` and `weight` come
  from the page's schema.org data.
- **Regular season per game only:** playoff, totals per season, per-36, per-100 possessions and advanced tables
  are not extracted; the career totals (`career*`) come from the totals table.
- **Tested** on LeBron James (active, 24 seasons), James Harden (several traded seasons) and Michael Jordan
  (retired, seasons without games). NBA player pages only; WNBA, G League and college pages were not tested.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real player page (shortened)
