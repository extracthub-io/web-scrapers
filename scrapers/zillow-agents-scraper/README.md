# Zillow Agents Scraper (real estate agent directory)

Turn a Zillow agent directory page into JSON: the agents and teams Zillow lists for a city or ZIP code, with
profile link, photo, top agent and team tags, price range, sales in the last 12 months and in the area, rating
and review count, plus the number of agents found. Good for agent lead lists and market share snapshots; feed
`profileUrl` to the [Zillow Agent Profile Scraper](../zillow-agent-profile-scraper/) for the full profile.

**Catalog:** [extracthub.io/extractor/@extracthub1/zillow-agents](https://extracthub.io/extractor/@extracthub1/zillow-agents)
**Extractor id:** `@extracthub1/zillow-agents@1` · **Price:** $0.0025 per page

## Input

A Zillow agent directory page for a city or ZIP code, e.g.
`https://www.zillow.com/professionals/real-estate-agent-reviews/denver-co/`:

```
https://www.zillow.com/professionals/real-estate-agent-reviews/denver-co/?page=2   page 2
https://www.zillow.com/professionals/real-estate-agent-reviews/80203/              ZIP code
```

## Output

| Field | Type | Description |
|---|---|---|
| `location` | string \| null | e.g. `Denver CO` |
| `resultsFound` | number \| null | agents Zillow found for the place, e.g. `17643` |
| `currentPage` | number \| null | page number |
| `agents[]` | array | agents and teams on the page, in Zillow's order (15 per page) |

Each `agents[]` entry:

| Field | Description |
|---|---|
| `position` | rank on the page (1 = first) |
| `name` | agent or team name |
| `profileUrl` | Zillow profile (input for the Zillow Agent Profile Scraper) |
| `zuid` | Zillow user id |
| `photo` | profile photo |
| `isTopAgent` | Zillow "top agent" badge |
| `tags` | e.g. `["TEAM"]` |
| `priceRange` | price range of their sales, e.g. `$17K - $8.8M` |
| `salesLast12Months` | sales in the last 12 months (of the team for teams) |
| `salesInArea` | sales in the searched place |
| `rating` / `reviewCount` | average rating (1-5) and number of reviews |

Full example: [sample-output.json](sample-output.json) (Denver, CO; shortened to 5 agents).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/zillow-agents@1" \
  --data-urlencode "target_url=https://www.zillow.com/professionals/real-estate-agent-reviews/denver-co/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/zillow-agents@1` on the first 3 pages of Zillow's Denver agent directory and rank the
> agents by sales in the last 12 months.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Pages:** add `?page=2`, `?page=3`, ... for the next 15 agents; Zillow's own page loads them with
  "View more".
- **Zillow's order:** agents are sorted the way Zillow shows them (its own ranking, which includes paid
  placement), not by sales.
- **Contact details are not in the directory:** open the profile with the Zillow Agent Profile Scraper for the
  brokerage address and business phone.
- **No agents = failed request:** a page without the agent list (a bot check, an unknown place) fails with
  HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US only:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; embedded page JSON)
- [`sample-output.json`](sample-output.json): output on a real directory page
