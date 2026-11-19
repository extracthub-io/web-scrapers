# Transfermarkt Player Scraper (profile and market value)

Turn a Transfermarkt player profile into JSON: name, shirt number, date of birth, age, citizenship, height,
position, foot, agent, club and league, joined and contract end dates, national team caps and goals, the
current market value with its last update, titles and the full "Facts and data" table. Good for scouting
sheets, squad databases and market value tracking.

**Catalog:** [extracthub.io/extractor/@extracthub1/transfermarkt-player](https://extracthub.io/extractor/@extracthub1/transfermarkt-player)
**Extractor id:** `@extracthub1/transfermarkt-player@1` · **Price:** $0.0035 per page

## Input

A Transfermarkt player profile URL:

```
https://www.transfermarkt.com/<player-name>/profil/spieler/<player-id>
```

e.g. `https://www.transfermarkt.com/erling-haaland/profil/spieler/418560`

## Output

| Field | Type | Description |
|---|---|---|
| `playerId` | string | Transfermarkt player id, e.g. `418560` |
| `pageUrl` | string \| null | canonical URL of the profile |
| `name` | string | e.g. `Erling Haaland` |
| `shirtNumber` | number \| null | e.g. `9` |
| `nameInHomeCountry` | string \| null | e.g. `Erling Braut Håland` |
| `fullName` | string \| null | full name when the page has a "Full name" row instead |
| `dateOfBirth` | string \| null | ISO date, e.g. `2000-07-21` |
| `age` | number \| null | e.g. `26` |
| `placeOfBirth` | string \| null | e.g. `Leeds` |
| `citizenship` | array | e.g. `["Norway"]` |
| `height` | string \| null | as shown, e.g. `1,95 m` |
| `position` | string \| null | e.g. `Attack - Centre-Forward` |
| `mainPosition` | string \| null | e.g. `Centre-Forward` |
| `foot` | string \| null | `left`, `right` or `both` |
| `agent` | string \| null | e.g. `Rafaela Pimenta` |
| `club` | string \| null | e.g. `Manchester City` |
| `clubUrl` | string \| null | club page on Transfermarkt |
| `league` | string \| null | e.g. `Premier League` |
| `leagueUrl` | string \| null | league page on Transfermarkt |
| `joined` | string \| null | `DD/MM/YYYY`, e.g. `01/07/2022` |
| `contractExpires` | string \| null | `DD/MM/YYYY`, e.g. `30/06/2034` |
| `lastContractExtension` | string \| null | `DD/MM/YYYY`, e.g. `17/01/2025` |
| `outfitter` | string \| null | e.g. `Nike` |
| `nationalTeam` | string \| null | e.g. `Norway` |
| `caps` | number \| null | international matches, e.g. `61` |
| `internationalGoals` | number \| null | e.g. `68` |
| `marketValue` | string \| null | as shown, e.g. `€220.00M` |
| `marketValueEur` | number \| null | in euros, e.g. `220000000` |
| `marketValueUpdated` | string \| null | `DD/MM/YYYY`, e.g. `22/07/2026` |
| `image` | string \| null | portrait image URL |
| `titles[]` | array | titles and awards shown in the header |
| `titles[].title` | string | e.g. `English Champion` |
| `titles[].count` | number \| null | e.g. `2` |
| `facts[]` | array | every row of the "Facts and data" table, in page order |
| `facts[].label` | string | e.g. `Foot:` |
| `facts[].value` | string \| null | e.g. `left` |
| `socialLinks` | array | the player's official social media links listed on the page |

Full example: [sample-output.json](sample-output.json) (the Erling Haaland page above).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/transfermarkt-player@1" \
  --data-urlencode "target_url=https://www.transfermarkt.com/erling-haaland/profil/spieler/418560"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/transfermarkt-player@1` on
> https://www.transfermarkt.com/erling-haaland/profil/spieler/418560
> and tell me the player's club, contract end and market value.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **JavaScript rendering** through a US proxy: plain fetches of transfermarkt.com were answered with HTTP 202
  (a bot check) on 4 of 4 tries, rendered fetches came through on 6 of 6 player pages.
- **No value history and no transfer history.** Transfermarkt draws the market value chart and the transfer
  table in page widgets whose content is not in the rendered HTML. The output has the current market value
  and the date of its last update.
- **Dates** are as Transfermarkt.com writes them (`DD/MM/YYYY`); only `dateOfBirth` is an ISO date.
- **Names:** a profile has either a "Name in home country" or a "Full name" row; the other field is `null`.
- **`facts`** holds every row of the table, so rows without their own field (second club, on loan from, ...)
  are still in the output. The `Social-Media:` row has no text; its links are in `socialLinks`.
- **Retired players and players without a club** have no market value or contract fields: those are `null`.
  This was not part of the test (3 active players: Haaland, Bellingham, Lamine Yamal).
- **Use the `.com` site.** Other Transfermarkt domains use other labels and were not tested.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real player profile
