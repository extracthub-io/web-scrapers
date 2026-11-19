# ESPN Scoreboard Scraper (games of a day)

Turn an ESPN scoreboard page into JSON: every game of the day with its id, start time, status, both teams
(name, abbreviation, score, record, home / away, winner), scores per period, venue, TV broadcasts, betting
line and the game link. Built on the NBA scoreboard; the NFL scoreboard was tested too. Good for score
tickers, schedules and results archives.

**Catalog:** [extracthub.io/extractor/@extracthub1/espn-scoreboard](https://extracthub.io/extractor/@extracthub1/espn-scoreboard)
**Extractor id:** `@extracthub1/espn-scoreboard@1` · **Price:** $0.0025 per page

## Input

An ESPN scoreboard page, for today or for one date (`YYYYMMDD`):

```
https://www.espn.com/nba/scoreboard
https://www.espn.com/nba/scoreboard/_/date/<YYYYMMDD>
```

e.g. `https://www.espn.com/nba/scoreboard/_/date/20261114` (the NBA games of November 14, 2026).

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string \| null | e.g. `NBA Scores - November 14, 2026 - ESPN` |
| `pageUrl` | string \| null | canonical URL, e.g. `https://www.espn.com/nba/scoreboard/_/date/20261114` |
| `league` | string | e.g. `NBA` |
| `leagueName` | string \| null | e.g. `National Basketball Association` |
| `seasonType` | string \| null | e.g. `Regular Season` |
| `games[]` | array | games in page order; empty on a day without games |
| `games[].position` | number | 1-based position on the page |
| `games[].gameId` | string | ESPN game id, e.g. `401909980` |
| `games[].name` | string | e.g. `DEN @ NO` (away @ home) |
| `games[].startTime` | string | ISO time (UTC), e.g. `2026-11-15T00:00Z` |
| `games[].status` | string | `Scheduled`, `In Progress`, `Final`, ... |
| `games[].statusDetail` | string | as shown, e.g. `Final`, `3:56 - 3rd`, `11/17 - 11:00 PM EST` |
| `games[].state` | string | `pre`, `in` or `post` |
| `games[].completed` | boolean | `true` once the game is over |
| `games[].teams[]` | array | the two teams, home team first |
| `games[].teams[].teamId` | string | ESPN team id, e.g. `7` |
| `games[].teams[].name` | string | e.g. `Denver Nuggets` |
| `games[].teams[].abbreviation` | string | e.g. `DEN` |
| `games[].teams[].isHome` | boolean | `true` for the home team |
| `games[].teams[].score` | number | e.g. `116`; missing before the game starts |
| `games[].teams[].winner` | boolean | `true` on the winning team; missing otherwise |
| `games[].teams[].record` | string | overall record, e.g. `7-4` |
| `games[].teams[].logo` | string | logo image URL |
| `games[].teams[].url` | string | team page, e.g. `https://www.espn.com/nba/team/_/name/den/denver-nuggets` |
| `games[].periodLabels` | array | e.g. `[1, 2, 3, 4]`; missing before the game starts |
| `games[].homePeriodScores` | array | home points per period, e.g. `[23, 28, 31, 26]` |
| `games[].awayPeriodScores` | array | away points per period, e.g. `[29, 27, 30, 30]` |
| `games[].venue` | string | e.g. `Smoothie King Center` |
| `games[].city` | string | e.g. `New Orleans` |
| `games[].region` | string | state or province, e.g. `LA` |
| `games[].broadcasts` | array | TV / streaming names, e.g. `["NBA TV"]`; often empty |
| `games[].oddsLine` | string \| null | spread before the game, e.g. `LAL -6.5`; `null` after it |
| `games[].overUnder` | string \| null | e.g. `O/U: 223.5`; `null` after the game |
| `games[].url` | string | game page, e.g. `https://www.espn.com/nba/game/_/gameId/401909980/nuggets-pelicans` |

Full example: [sample-output.json](sample-output.json) (the November 14, 2026 page above; 3 of 5 games shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/espn-scoreboard@1" \
  --data-urlencode "target_url=https://www.espn.com/nba/scoreboard/_/date/20261114"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/espn-scoreboard@1` on
> https://www.espn.com/nba/scoreboard/_/date/20261114
> and list each game with the final score and the winner.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the games come from the JSON ESPN embeds in the page; no browser is needed, fetched through
  a US proxy.
- **ESPN sometimes answers HTTP 202 instead of the page** (a bot check). In our tests 2 of 4 single calls and
  4 of 4 batch URLs got the page. A 202 fails the call (`target_error`, charged); retry it. Batches retry once
  on their own.
- **Missing keys:** values ESPN does not send are left out of the item instead of being `null`: `score` and
  the period scores before tip-off, `winner` on the losing team.
- **Live games:** scores and `statusDetail` are those of the moment the page was fetched.
- **Dates** in the URL are US Eastern days; `startTime` is UTC, so a late game starts on the next UTC day.
- **Records** are the teams' records when the page is fetched, also on pages of past days.
- **Other leagues:** `https://www.espn.com/nfl/scoreboard` returned its 14 games with the same fields. Other
  ESPN scoreboards (MLB, NHL, WNBA, college) use the same page type but were not tested.
- **A day without games** returns no games; it is not an error.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real scoreboard page (shortened)
