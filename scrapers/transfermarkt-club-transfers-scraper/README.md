# Transfermarkt Club Transfers Scraper (arrivals and departures)

Turn a Transfermarkt club transfers page into JSON: every arrival and departure of the season with player
name, id, profile link, position, age, nationalities, the other club (name, id, league, country) and the fee
(as shown and in euros), plus the club, season, number of arrivals and departures, expenditure, income and the
overall balance. Good for transfer trackers, club spending dashboards and transfer window reports.

**Catalog:** [extracthub.io/extractor/@extracthub1/transfermarkt-club-transfers](https://extracthub.io/extractor/@extracthub1/transfermarkt-club-transfers)
**Extractor id:** `@extracthub1/transfermarkt-club-transfers@1` · **Price:** $0.0035 per page

## Input

A Transfermarkt club transfers URL:

```
https://www.transfermarkt.com/<club-name>/transfers/verein/<club-id>
```

e.g. `https://www.transfermarkt.com/manchester-city/transfers/verein/281`

## Output

| Field | Type | Description |
|---|---|---|
| `clubId` | string | Transfermarkt club id, e.g. `281` |
| `pageUrl` | string \| null | canonical URL of the page |
| `club` | string | e.g. `Manchester City` |
| `league` | string \| null | e.g. `Premier League` |
| `season` | string \| null | e.g. `26/27` |
| `arrivalsCount` | number \| null | arrivals in the transfer record box, e.g. `17` |
| `expenditure` | string \| null | e.g. `€526.20M` |
| `expenditureEur` | number \| null | e.g. `526200000` |
| `departuresCount` | number \| null | e.g. `19` |
| `income` | string \| null | e.g. `€337.02M` |
| `incomeEur` | number \| null | e.g. `337020000` |
| `balance` | string \| null | e.g. `-€189.18M` |
| `arrivals[]` | array | players who joined, in page order (highest fee first) |
| `arrivals[].name` | string | e.g. `Enzo Fernández` |
| `arrivals[].playerId` | string \| null | e.g. `648195` |
| `arrivals[].profileUrl` | string \| null | player profile URL |
| `arrivals[].position` | string \| null | e.g. `Central Midfield` |
| `arrivals[].age` | number \| null | e.g. `25` |
| `arrivals[].nationalities` | array | e.g. `["Argentina"]` |
| `arrivals[].fromClub` | string \| null | e.g. `Chelsea FC` |
| `arrivals[].fromClubId` | string \| null | e.g. `631` |
| `arrivals[].fromLeague` | string \| null | e.g. `Premier League` |
| `arrivals[].fromCountry` | string \| null | e.g. `England` |
| `arrivals[].fee` | string \| null | as shown, e.g. `€145.00M`, `free transfer`, `loan transfer`, `End of loan 30/06/2026` |
| `arrivals[].feeEur` | number \| null | in euros when the fee is an amount (also `Loan fee: €100.0K`), e.g. `145000000` |
| `arrivals[].transferUrl` | string \| null | the transfer's page on Transfermarkt |
| `departures[]` | array | players who left; same fields with `toClub`, `toClubId`, `toLeague`, `toCountry` |

Full example: [sample-output.json](sample-output.json) (the Manchester City page above; 3 of 19 arrivals and 3
of 19 departures shown).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/transfermarkt-club-transfers@1" \
  --data-urlencode "target_url=https://www.transfermarkt.com/manchester-city/transfers/verein/281"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/transfermarkt-club-transfers@1` on
> https://www.transfermarkt.com/manchester-city/transfers/verein/281
> and list the arrivals that cost more than €50M with the club they came from.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **JavaScript rendering** through a US proxy: plain fetches of transfermarkt.com are answered with HTTP 202
  (a bot check). A 202 fails the call (`target_error`, charged), so retry it; batches retry once on their own.
- **Lists vs counts:** the lists also hold returning loan players (`End of loan ...`), so `arrivals[]` can be
  longer than `arrivalsCount` from the transfer record box.
- **Fees:** `fee` is the text of the fee column; `feeEur` is only set for an amount. `-` means an unknown fee.
- **Players who retired or are without a club** have no `toLeague` / `toCountry`.
- **Past seasons:** add `/saison_id/<year>` to the URL; this was not tested. The compact view only.
- **Use the `.com` site.** Other Transfermarkt domains were not tested.
- **Tested clubs:** Manchester City, Real Madrid, FC Bayern Munich.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real club transfers page (shortened)
