# Cricbuzz Live Scores Scraper (cricket matches, scores, status)

Turn the Cricbuzz live scores page into JSON: the match cards grouped by series (series name, id and link),
each with the match id, title, match description, venue, both teams (name, short name, score, flag) and the
status line, plus the header list of all current matches with their state. The same extractor reads the
**Recent** and **Upcoming** tabs. Good for cricket score tickers, results archives and match alerts.

**Catalog:** [extracthub.io/extractor/@extracthub1/cricbuzz-live-scores](https://extracthub.io/extractor/@extracthub1/cricbuzz-live-scores)
**Extractor id:** `@extracthub1/cricbuzz-live-scores@1` · **Price:** $0.0025 per page

## Input

A Cricbuzz live scores page, one of its three tabs:

```
https://www.cricbuzz.com/cricket-match/live-scores
https://www.cricbuzz.com/cricket-match/live-scores/recent-matches
https://www.cricbuzz.com/cricket-match/live-scores/upcoming-matches
```

e.g. `https://www.cricbuzz.com/cricket-match/live-scores` (the matches live right now).

## Output

| Field | Type | Description |
|---|---|---|
| `pageTitle` | string \| null | e.g. `Live Cricket Score \| Scorecard \| Live Commentary - IPL 2026 \| Cricbuzz.com` |
| `pageUrl` | string \| null | canonical URL, e.g. `https://www.cricbuzz.com/cricket-match/live-scores` |
| `tab` | string \| null | `Live`, `Recent` or `Upcoming` |
| `series[]` | array | the match cards of the tab, grouped by series in page order |
| `series[].seriesName` | string | e.g. `India tour of New Zealand 2026` |
| `series[].seriesId` | string \| null | Cricbuzz series id, e.g. `12543` |
| `series[].seriesUrl` | string \| null | e.g. `https://www.cricbuzz.com/cricket-series/12543/india-tour-of-new-zealand-2026/matches` |
| `series[].matches[]` | array | the series' matches on this tab |
| `series[].matches[].matchId` | string | Cricbuzz match id, e.g. `161285` |
| `series[].matches[].title` | string \| null | e.g. `New Zealand vs India, 1st Test` |
| `series[].matches[].matchDesc` | string \| null | e.g. `1st Test`, `9th Match`, `Elite Group D` |
| `series[].matches[].venue` | string \| null | city and ground, e.g. `Wellington, Basin Reserve` |
| `series[].matches[].teams[]` | array | the two teams in card order |
| `series[].matches[].teams[].name` | string | e.g. `New Zealand` |
| `series[].matches[].teams[].shortName` | string \| null | e.g. `NZ` |
| `series[].matches[].teams[].score` | string \| null | as shown, e.g. `368 & 21-1`, `720-9 d`, `209 (42.1)`; `null` before the team bats |
| `series[].matches[].teams[].flagUrl` | string \| null | team flag / logo image |
| `series[].matches[].status` | string \| null | e.g. `Day 4: 2nd Session - New Zealand trail by 331 runs`, `Central Districts won by 9 wkts`; `null` on upcoming matches |
| `series[].matches[].url` | string \| null | match page, e.g. `https://www.cricbuzz.com/live-cricket-stream/161285/nz-vs-ind-1st-test-india-tour-of-new-zealand-2026` |
| `allCurrentMatches[]` | array | the header "Matches" menu: every current match (live, today and just finished), the same on all three tabs |
| `allCurrentMatches[].matchId` | string | e.g. `161285` |
| `allCurrentMatches[].title` | string | e.g. `New Zealand vs India, 1st Test` |
| `allCurrentMatches[].state` | string | short state, e.g. `Live`, `Complete`, `Preview`, `Stumps`, `PAK Won` |
| `allCurrentMatches[].teams` | string | e.g. `New Zealand vs India` |
| `allCurrentMatches[].matchDesc` | string | e.g. `1st Test` |
| `allCurrentMatches[].url` | string | e.g. `https://www.cricbuzz.com/live-cricket-scores/161285/nz-vs-ind-1st-test-india-tour-of-new-zealand-2026` |

Full example: [sample-output.json](sample-output.json) (the live scores page above; `allCurrentMatches`
shortened to 5 of 54).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/cricbuzz-live-scores@1" \
  --data-urlencode "target_url=https://www.cricbuzz.com/cricket-match/live-scores"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/cricbuzz-live-scores@1` on
> https://www.cricbuzz.com/cricket-match/live-scores
> and list every live match with both scores and the status line.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the match cards are server-rendered HTML, fetched through the proxy; no browser is needed.
- **Live data:** scores and status lines are those of the moment of the fetch. The Live tab only holds the
  matches in play (including breaks such as `Stumps` or `Lunch`); finished ones move to **Recent**.
- **Upcoming tab:** the start time of upcoming matches is filled in by the browser, so the cards have no time and
  `status` is `null`. Use `allCurrentMatches[].state` (`Preview`, `Upcoming Match`) or open the match page.
- **Scores are text** as Cricbuzz shows them: `&` separates two innings, `d` marks a declaration and the overs
  of limited-overs innings come in brackets.
- **Live match links** point to `live-cricket-stream/...` when Cricbuzz has a live stream, else to
  `live-cricket-scores/...`. Both work with the match id.
- **Generated class names:** Cricbuzz uses utility CSS classes; a redesign can break the extractor. The richer
  match JSON in the page (timestamps, innings details) sits in an escaped Next.js payload the extractor cannot read.
- **Tested** on the Live (9 matches), Recent (135) and Upcoming (32) tabs.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through the proxy)
- [`sample-output.json`](sample-output.json): output on the real live scores page (shortened)
