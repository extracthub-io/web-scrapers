# Zillow Agent Profile Scraper (real estate agent or team)

Turn a Zillow agent or team profile into JSON: name, brokerage, business address and brokerage / business
phone, rating and review count, title, description, years in the industry, specialties, licenses, service
areas, total and recent sales, current for-sale and for-rent listings, team members and the latest reviews.
Good for agent research, recruiting and lead enrichment.

**Catalog:** [extracthub.io/extractor/@extracthub1/zillow-agent-profile](https://extracthub.io/extractor/@extracthub1/zillow-agent-profile)
**Extractor id:** `@extracthub1/zillow-agent-profile@1` · **Price:** $0.0025 per page

## Input

A Zillow profile page (`/profile/<screen name>`), e.g. `https://www.zillow.com/profile/navrealestate`.
The [Zillow Agents Scraper](../zillow-agents-scraper/) lists them in `agents[].profileUrl`.

## Output

| Field | Type | Description |
|---|---|---|
| `zuid` | string | Zillow user id |
| `screenName` | string \| null | e.g. `navrealestate` |
| `name` | string | agent or team name |
| `profileUrl` | string \| null | the profile page |
| `businessName` | string \| null | brokerage |
| `isTopAgent` | boolean \| null | Zillow "top agent" badge |
| `photo` | string \| null | profile photo |
| `rating` / `reviewCount` | number \| null | average rating (1-5) and number of reviews |
| `businessAddress` | object \| null | `address1`, `address2`, `city`, `state`, `postalCode` |
| `brokeragePhone` / `businessPhone` | string \| null | office phones as listed |
| `title` | string \| null | e.g. `Managing Director` |
| `description` | string \| null | "Get to know me" text, without HTML |
| `yearsInIndustry` | number \| null | years of experience |
| `specialties` / `languages` | string[] \| null | e.g. `Buyer's Agent`, `Listing Agent` |
| `websiteUrl` | string \| null | agent or brokerage website |
| `licenses[]` | array \| null | `number`, `state`, `status`, `type`, `expiration` |
| `serviceAreas[]` | array \| null | `name`, `regionId`, `url` |
| `totalSales` | number \| null | sales on Zillow (of the team for teams) |
| `recentSales[]` | array \| null | latest 5: `zpid`, `soldDate`, `price`, `represented` (Buyer / Seller), `streetAddress`, `cityStateZip`, `bedrooms`, `bathrooms`, `livingArea`, `url` |
| `forSaleCount` / `forSaleListings[]` | number / array \| null | active listings (first 5): `zpid`, `streetAddress`, `city`, `state`, `zipcode`, `price`, `bedrooms`, `bathrooms`, `homeType`, `photo`, `url` |
| `forRentCount` / `forRentListings[]` | number / array \| null | same for rentals |
| `teamName` | string \| null | team profiles only |
| `teamMembers[]` | array \| null | `name`, `screenName`, `rating`, `reviewCount`, `isTopAgent`, `photo` |
| `reviews[]` | array \| null | latest 5: `reviewId`, `rating`, `date`, `comment`, `workDescription`, `agentScreenName` (the team member reviewed), `subRatings` |

Full example: [sample-output.json](sample-output.json) (NAV Real Estate, Denver; lists shortened to 3).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/zillow-agent-profile@1" \
  --data-urlencode "target_url=https://www.zillow.com/profile/navrealestate"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/zillow-agent-profile@1` on the NAV Real Estate Zillow profile and summarize its sales,
> active listings, licenses and the team members with the most reviews.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **No personal contact details:** the agent's cell phone and email on the profile are left out; only the
  brokerage and business phones and the business address are returned. Reviewer names are left out too.
- **First items only:** Zillow puts the latest 5 sales, 5 listings and 5 reviews in the page; the totals are in
  `totalSales`, `forSaleCount`, `forRentCount` and `reviewCount`.
- **Individual agents** have no `teamName` / `teamMembers` (`null`).
- **`recentSales[].soldDate`** is written as Zillow shows it (`MM/DD/YYYY`).
- **No name = failed request:** a page without the profile data (a bot check, a removed profile) fails with
  HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US only:** fetched through a US proxy, without JavaScript.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; embedded page JSON)
- [`sample-output.json`](sample-output.json): output on a real profile page
