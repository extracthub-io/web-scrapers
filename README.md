# Web Scrapers: Google Search Scraper, Google Maps Scraper, Google Play Scraper, App Store Scraper, GitHub Scraper, Hacker News Scraper, Trustpilot Scraper, YouTube Scraper, YouTube Transcript Scraper & more (ready-to-use scraping API)

A growing collection of **ready-to-use web scrapers** that turn web pages into clean JSON. Every scraper here
is a published [ExtractHub](https://extracthub.io) extractor: send a URL, get structured data back. No
browser, no proxies to rotate, no HTML parsing code to maintain. Use them from any language through the REST
API, or let an **AI agent** (Claude, Cursor, any MCP client) call them for you.

## Scrapers

| Scraper | What it extracts | Catalog | Price / call |
|---|---|---|---|
| [Google Search Scraper (SERP)](scrapers/google-search-scraper/) | organic results incl. videos, People also ask, related searches, next page | [@extracthub1/google-serp](https://extracthub.io/extractor/@extracthub1/google-serp) | $0.0025 |
| [Google Maps Scraper (places search)](scrapers/google-maps-scraper/) | places from a Maps search: name, place link, place ID, coordinates, rating, reviews, category, address, open status, phone, website, hotel price | [@extracthub1/google-maps-search](https://extracthub.io/extractor/@extracthub1/google-maps-search) | $0.0035 |
| [Google Maps Place Scraper (place details)](scrapers/google-maps-place-scraper/) | one place: full address, phone, website, hours, Plus Code, place ID, coordinates, top reviews | [@extracthub1/google-maps-place](https://extracthub.io/extractor/@extracthub1/google-maps-place) | $0.0035 |
| [Google Local Results Scraper](scrapers/google-local-results-scraper/) | places from Google's local results, 20 per page with next page: name, rating, reviews, category, address, phone, years in business | [@extracthub1/google-local-results](https://extracthub.io/extractor/@extracthub1/google-local-results) | $0.0025 |
| [Google Play App Scraper](scrapers/google-play-app-scraper/) | app page: rating, rating count, downloads, developer, category, price, update date, description, screenshots | [@extracthub1/google-play-app](https://extracthub.io/extractor/@extracthub1/google-play-app) | $0.0025 |
| [Apple App Store Scraper](scrapers/apple-app-store-scraper/) | app page: rating, rating count, price, version, release notes, size, age rating, developer, description, screenshots | [@extracthub1/apple-app-store-app](https://extracthub.io/extractor/@extracthub1/apple-app-store-app) | $0.0025 |
| [YouTube Channel Videos Scraper](scrapers/youtube-channel-videos-scraper/) | channel info + about 120 latest videos: title, views, publish date, duration | [@extracthub1/youtube-channel-videos](https://extracthub.io/extractor/@extracthub1/youtube-channel-videos) | $0.0035 |
| [YouTube Video Scraper](scrapers/youtube-video-scraper/) | title, description, channel, subscribers, views, likes, duration, publish date, keywords | [@extracthub1/youtube-video](https://extracthub.io/extractor/@extracthub1/youtube-video) | $0.0025 |
| [YouTube Transcript Scraper](scrapers/youtube-transcript-scraper/) | full video transcript: timestamped caption segments (start, duration, text) | [@extracthub1/youtube-transcript](https://extracthub.io/extractor/@extracthub1/youtube-transcript) | $0.0035 |
| [GitHub Repository Scraper](scrapers/github-repo-scraper/) | repo page: stars, forks, watchers, topics, license, commits, releases, open issues and PRs, latest commit | [@extracthub1/github-repo](https://extracthub.io/extractor/@extracthub1/github-repo) | $0.0025 |
| [Hacker News Scraper](scrapers/hacker-news-scraper/) | stories from the front page, newest, ask, show: title, link, points, author, time, comments, next page | [@extracthub1/hacker-news-stories](https://extracthub.io/extractor/@extracthub1/hacker-news-stories) | $0.0025 |
| [Trustpilot Reviews Scraper](scrapers/trustpilot-reviews-scraper/) | company page: TrustScore, review counts, star distribution, 20 reviews per page with rating, text, dates, company reply, next page | [@extracthub1/trustpilot-reviews](https://extracthub.io/extractor/@extracthub1/trustpilot-reviews) | $0.0025 |
| [Quotes to Scrape Scraper](scrapers/quotes-to-scrape-scraper/) | quotes, authors, tags, pagination (practice site) | [@extracthub1/quotes-toscrape-list](https://extracthub.io/extractor/@extracthub1/quotes-toscrape-list) | $0.0005 |
| [Books to Scrape Scraper](scrapers/books-to-scrape-scraper/) | book titles, prices, links, images (practice site) | [@extracthub1/books-to-scrape](https://extracthub.io/extractor/@extracthub1/books-to-scrape) | $0.0005 |

Prices are per call and may change; the catalog page shows the current price. Browse all public scrapers at
[extracthub.io](https://extracthub.io).

## Quick start (REST API)

1. Create an API key at [extracthub.io](https://extracthub.io) (Dashboard → API keys).
2. Call a scraper with a pinned id (`@1` = latest 1.x, never breaking) and the page URL:

```bash
export EXTRACTHUB_API_KEY=exth_your_key

curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "X-API-Key: $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/youtube-video@1" \
  --data-urlencode "target_url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

```json
{
  "success": true,
  "result": {
    "extracted": {
      "videoId": "dQw4w9WgXcQ",
      "title": "Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)",
      "channelName": "Rick Astley",
      "viewCount": 1833848373,
      "likeCount": 19491778,
      "durationSeconds": 213,
      "publishDate": "2009-10-24T23:57:33-07:00"
    },
    "metadata": { "useProxy": true, "renderJs": false, "provider": "zyte" }
  }
}
```

(Output shortened. Each scraper folder has its full field list and a `sample-output.json`.)

→ **[REST API guide](docs/api.md)**: curl, JavaScript and Python examples, pagination, batches, errors.

## Use a scraper with an AI agent

Connect the ExtractHub MCP server and just ask:

```bash
claude mcp add --transport http extracthub https://api.extracthub.io/mcp \
  --header "Authorization: Bearer YOUR_EXTRACTHUB_API_KEY"
```

> *"Use `@extracthub1/google-serp@1` to get the top Google results for **best web scraper** and make a table
> of title, source and snippet."*

→ **[AI agent guide](docs/ai-agents.md)**: Claude Code, Claude Desktop, other MCP clients, example
prompts, and how to build **your own scraper** with the
[ExtractHub extractor builder skill](https://github.com/extracthub-io/extracthub-extractor-builder).

## Repository layout

```
scrapers/
  <name>-scraper/
    README.md            fields, input URL format, quick start, limitations
    extractor.json       the extractor definition (request options + field config)
    sample-output.json   real output of the released version
docs/
  api.md                 REST API guide
  ai-agents.md           MCP / AI agent guide
```

`extractor.json` is the full definition of the scraper (how the page is fetched and which selectors /
JSON paths produce each field). Read it to see how the scraper works, or use it as a starting point for
your own scraper in ExtractHub Studio or with the extractor builder skill.

## Why these scrapers

- **No infrastructure:** ExtractHub fetches the page (through a scraping proxy when the site needs one) and
  returns JSON.
- **Versioned:** pin `@1` and your integration never breaks on output changes; fixes arrive automatically.
- **Tested on real pages:** each scraper is validated on several live pages before release, and its
  README lists the known limits.
- **Agent-ready:** every scraper is callable as an MCP tool by AI agents.

## Contributing

Want a scraper for another site? Open an issue with the page URL and the fields you need, or build it
yourself with the [extractor builder skill](https://github.com/extracthub-io/extracthub-extractor-builder)
and send a pull request with a new `scrapers/<name>-scraper/` folder.

Use the scrapers responsibly: respect the target sites' terms of service and applicable laws, and don't
collect personal data you have no right to process.

## License

[MIT](LICENSE) for the definitions and docs in this repository. The scraped data belongs to its owners.
