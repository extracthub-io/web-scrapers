# Web Scrapers: Amazon Scraper, eBay Scraper, Walmart Scraper, Etsy Scraper, AliExpress Scraper, Indeed Scraper, LinkedIn Jobs Scraper, Yelp Scraper, TripAdvisor Scraper, Best Buy Scraper, Target Scraper, Tokopedia Scraper, Booking.com Scraper, Airbnb Scraper, Realtor.com Scraper, Redfin Scraper, Yellow Pages Scraper, Craigslist Scraper, Google Search Scraper, Google News Scraper, Google Shopping Scraper, Bing Scraper, Google Maps Scraper, Google Play Scraper, App Store Scraper, GitHub Scraper, Hacker News Scraper, Reddit Scraper, Product Hunt Scraper, Stack Overflow Scraper, Rotten Tomatoes Scraper, Goodreads Scraper, Steam Scraper, Wikipedia Scraper, ESPN Scraper, Transfermarkt Scraper, Trustpilot Scraper, Zillow Scraper, YouTube Scraper, YouTube Transcript Scraper & more (ready-to-use scraping API)

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
| [Google News Scraper](scrapers/google-news-scraper/) | articles of a Google News topic page (~200): title, article id, article link, source, source site, publish time, author, image | [@extracthub1/google-news](https://extracthub.io/extractor/@extracthub1/google-news) | $0.0025 |
| [Google Shopping Scraper](scrapers/google-shopping-scraper/) | products of a Google Shopping search, about 40 per page: title, price, original and typical price, discount, store, rating, review count, delivery, Google product ids, themed product groups, next page | [@extracthub1/google-shopping](https://extracthub.io/extractor/@extracthub1/google-shopping) | $0.0025 |
| [Bing Search Scraper (SERP)](scrapers/bing-search-scraper/) | organic results of a Bing search: position, title, link, displayed URL, site name, snippet, date, plus result count, related searches, next page | [@extracthub1/bing-serp](https://extracthub.io/extractor/@extracthub1/bing-serp) | $0.0025 |
| [Hacker News Scraper](scrapers/hacker-news-scraper/) | stories from the front page, newest, ask, show: title, link, points, author, time, comments, next page | [@extracthub1/hacker-news-stories](https://extracthub.io/extractor/@extracthub1/hacker-news-stories) | $0.0025 |
| [Reddit Post Scraper](scrapers/reddit-post-scraper/) | post page: id, title, subreddit, author, score, upvote ratio, comments count, post type, link, date, text, plus the loaded comments with author, score, reply depth, date, text, link | [@extracthub1/reddit-post](https://extracthub.io/extractor/@extracthub1/reddit-post) | $0.0035 |
| [Product Hunt Leaderboard Scraper](scrapers/producthunt-leaderboard-scraper/) | ranked launches of a Product Hunt day: rank, name, tagline, link, topics, votes, comments, thumbnail, previous / next day | [@extracthub1/producthunt-leaderboard](https://extracthub.io/extractor/@extracthub1/producthunt-leaderboard) | $0.0025 |
| [Stack Overflow Questions Scraper (by tag)](scrapers/stackoverflow-questions-scraper/) | questions of a tag page, 15 per page, any sort tab: id, title, link, score, answers, accepted, views, comments, asked date, excerpt, tags, user, total questions, next page | [@extracthub1/stackoverflow-questions](https://extracthub.io/extractor/@extracthub1/stackoverflow-questions) | $0.0025 |
| [Stack Overflow Question Scraper](scrapers/stackoverflow-question-scraper/) | question page: score, views, dates, tags, body (text and HTML), author, comments and answers counts, up to 30 answers with score, accepted flag, date, body and author, next answers page | [@extracthub1/stackoverflow-question](https://extracthub.io/extractor/@extracthub1/stackoverflow-question) | $0.0025 |
| [Zillow Search Scraper](scrapers/zillow-search-scraper/) | homes for sale from a Zillow search, 41 per page: address, price, bedrooms, floor size, coordinates, photo, link, total results, next page | [@extracthub1/zillow-search](https://extracthub.io/extractor/@extracthub1/zillow-search) | $0.0025 |
| [Zillow Property Scraper](scrapers/zillow-property-scraper/) | one home: price, Zestimate, beds, baths, area, description, days on Zillow, MLS #, facts & features, price and tax history | [@extracthub1/zillow-property](https://extracthub.io/extractor/@extracthub1/zillow-property) | $0.0035 |
| [Realtor.com Search Scraper](scrapers/realtor-search-scraper/) | homes for sale from a Realtor.com search, about 42 per page: address, link, price, home type, bedrooms, floor size, ZIP, coordinates, photo, total results, next page | [@extracthub1/realtor-search](https://extracthub.io/extractor/@extracthub1/realtor-search) | $0.0025 |
| [Realtor.com Property Scraper](scrapers/realtor-property-scraper/) | one home: price, price per sq ft, value estimates, beds, baths, sq ft, lot, year built, HOA, taxes, days on MLS, last sale, status flags, detail sections, schools, agent and brokerage, photos | [@extracthub1/realtor-property](https://extracthub.io/extractor/@extracthub1/realtor-property) | $0.0025 |
| [Redfin Search Scraper](scrapers/redfin-search-scraper/) | homes for sale from a Redfin search, about 40 per page: address, link, property id, price, beds, baths, sq ft, ZIP, coordinates, photo, brokerage, total homes, current page and total pages | [@extracthub1/redfin-search](https://extracthub.io/extractor/@extracthub1/redfin-search) | $0.0025 |
| [Amazon Product Scraper](scrapers/amazon-product-scraper/) | product page: ASIN, title, brand, buy-box price, list price, rating, reviews count, availability, seller, bullets, images, attributes | [@extracthub1/amazon-product](https://extracthub.io/extractor/@extracthub1/amazon-product) | $0.0025 |
| [Amazon Search Scraper](scrapers/amazon-search-scraper/) | products from an Amazon search: ASIN, title, link, price, list price, rating, ratings count, bought in past month, badge, next page | [@extracthub1/amazon-search](https://extracthub.io/extractor/@extracthub1/amazon-search) | $0.0025 |
| [eBay Search Scraper](scrapers/ebay-search-scraper/) | listings from an eBay search, about 60 per page: item id, title, price, original price, condition, shipping, sold, seller feedback, next page | [@extracthub1/ebay-search](https://extracthub.io/extractor/@extracthub1/ebay-search) | $0.0025 |
| [eBay Item Scraper](scrapers/ebay-item-scraper/) | item page: price, condition, quantity sold, shipping, returns, seller feedback, item specifics, photos, categories | [@extracthub1/ebay-item](https://extracthub.io/extractor/@extracthub1/ebay-item) | $0.0025 |
| [Walmart Search Scraper](scrapers/walmart-search-scraper/) | products from a Walmart search, about 40 to 60 per page: item id, name, link, price, rating, reviews count, seller, availability, badge, sponsored, total results, page count | [@extracthub1/walmart-search](https://extracthub.io/extractor/@extracthub1/walmart-search) | $0.0025 |
| [Walmart Product Scraper](scrapers/walmart-product-scraper/) | product page: item id, brand, model, UPC, price, was price, rating, reviews count, availability, seller, shipping, return policy, specifications, images, review summary | [@extracthub1/walmart-product](https://extracthub.io/extractor/@extracthub1/walmart-product) | $0.0025 |
| [Etsy Search Scraper](scrapers/etsy-search-scraper/) | listings from an Etsy search, 12 per page: listing id, title, link, price, original price, discount, shop, Star Seller, rating, reviews, badge, free shipping, ad, next page | [@extracthub1/etsy-search](https://extracthub.io/extractor/@extracthub1/etsy-search) | $0.0025 |
| [Etsy Listing Scraper](scrapers/etsy-listing-scraper/) | listing page: price and price range, original price, availability, shop, rating, reviews count, category, material, ships from, description, images, reviews | [@extracthub1/etsy-listing](https://extracthub.io/extractor/@extracthub1/etsy-listing) | $0.0025 |
| [AliExpress Product Scraper](scrapers/aliexpress-product-scraper/) | product page: price, original price, rating, reviews count, sold count, store and store feedback, shipping, options, images, specifications | [@extracthub1/aliexpress-product](https://extracthub.io/extractor/@extracthub1/aliexpress-product) | $0.0035 |
| [Best Buy Product Scraper](scrapers/bestbuy-product-scraper/) | product page: SKU, brand, model, price, comp. value, savings, availability, new and open-box offers, rating, reviews count, specifications, categories | [@extracthub1/bestbuy-product](https://extracthub.io/extractor/@extracthub1/bestbuy-product) | $0.0025 |
| [Target Product Scraper](scrapers/target-product-scraper/) | product page: TCIN, DPCI, UPC, brand, price, regular price, rating, reviews and questions counts, highlights, specifications, description, images, categories, variations | [@extracthub1/target-product](https://extracthub.io/extractor/@extracthub1/target-product) | $0.0035 |
| [Tokopedia Search Scraper](scrapers/tokopedia-search-scraper/) | products from a Tokopedia search (Indonesia), 60 per page: product id, name, link, price in IDR, original price, rating, sold / promo labels, shop, shop city, category, total results | [@extracthub1/tokopedia-search](https://extracthub.io/extractor/@extracthub1/tokopedia-search) | $0.0035 |
| [Tokopedia Product Scraper](scrapers/tokopedia-product-scraper/) | product page: product id, price in IDR, original price, rating, reviews and sold counts, stock, condition, weight, shop, official store, categories, variants, description, images | [@extracthub1/tokopedia-product](https://extracthub.io/extractor/@extracthub1/tokopedia-product) | $0.0025 |
| [Indeed Jobs Scraper](scrapers/indeed-jobs-scraper/) | jobs from an Indeed search, about 40 to 50 per page: job key, title, link, company, location, salary, tags, snippet, sponsored, total jobs, next page | [@extracthub1/indeed-jobs](https://extracthub.io/extractor/@extracthub1/indeed-jobs) | $0.0025 |
| [Indeed Job Scraper](scrapers/indeed-job-scraper/) | job page: company, company rating, location, job type, salary range and period, posted, full description (text and Markdown) | [@extracthub1/indeed-job](https://extracthub.io/extractor/@extracthub1/indeed-job) | $0.0035 |
| [LinkedIn Jobs Scraper](scrapers/linkedin-jobs-scraper/) | jobs from a public LinkedIn job search (no login), up to 60 per page: job id, title, link, company, company page, location, posted date, benefit badge, result count | [@extracthub1/linkedin-jobs](https://extracthub.io/extractor/@extracthub1/linkedin-jobs) | $0.0025 |
| [LinkedIn Job Scraper](scrapers/linkedin-job-scraper/) | public job page (no login): company, location, posted and expiry date, applicants, salary, employment type, seniority, industry, experience, education, full description | [@extracthub1/linkedin-job](https://extracthub.io/extractor/@extracthub1/linkedin-job) | $0.0025 |
| [Yelp Search Scraper](scrapers/yelp-search-scraper/) | organic results of a Yelp search, about 10 per page: name, link, rating, reviews count, neighborhood, price range, open status, categories, review snippet, photo, next page | [@extracthub1/yelp-search](https://extracthub.io/extractor/@extracthub1/yelp-search) | $0.0025 |
| [Yelp Business Scraper](scrapers/yelp-business-scraper/) | business page: rating, exact reviews and photos counts, claimed, categories, address, coordinates, opening hours, public phone, website, amenities, photos | [@extracthub1/yelp-business](https://extracthub.io/extractor/@extracthub1/yelp-business) | $0.0025 |
| [Yellow Pages Search Scraper](scrapers/yellowpages-search-scraper/) | businesses of a Yellow Pages search, 30 per page (ads skipped): name, link, categories, phone, address, city / state / ZIP, website, rating, reviews count, years in business, opening hours, total results, next page | [@extracthub1/yellowpages-search](https://extracthub.io/extractor/@extracthub1/yellowpages-search) | $0.0025 |
| [Craigslist Search Scraper](scrapers/craigslist-search-scraper/) | listings of a Craigslist search or category page (300+): title, price, location, link, plus home type, bedrooms, bathrooms, coordinates and city for housing | [@extracthub1/craigslist-search](https://extracthub.io/extractor/@extracthub1/craigslist-search) | $0.0025 |
| [TripAdvisor Hotel Scraper](scrapers/tripadvisor-hotel-scraper/) | hotel page: rating, reviews count, ranking, hotel class, price range, featured offer, address, coordinates, phone, website, amenities, description, latest reviews (no reviewer names) | [@extracthub1/tripadvisor-hotel](https://extracthub.io/extractor/@extracthub1/tripadvisor-hotel) | $0.0025 |
| [Booking.com Search Scraper](scrapers/booking-search-scraper/) | properties from a Booking.com search with dates, 15 to 20 per page: name, link, area, review score and count, room, price per night, total price, original price, deal, free cancellation, total found | [@extracthub1/booking-search](https://extracthub.io/extractor/@extracthub1/booking-search) | $0.0025 |
| [Booking.com Hotel Scraper](scrapers/booking-hotel-scraper/) | property page: hotel id, stars, review score and count, subscores, location score, address, coordinates, description, popular facilities, check-in / check-out, house rules | [@extracthub1/booking-hotel](https://extracthub.io/extractor/@extracthub1/booking-hotel) | $0.0025 |
| [Airbnb Listing Scraper](scrapers/airbnb-listing-scraper/) | listing page: property and room type, guests / bedrooms / beds / baths, location, coordinates, rating, reviews count, Guest favorite, category ratings, host (Superhost, rating, response), amenities, house rules, photos | [@extracthub1/airbnb-listing](https://extracthub.io/extractor/@extracthub1/airbnb-listing) | $0.0025 |
| [Trustpilot Reviews Scraper](scrapers/trustpilot-reviews-scraper/) | company page: TrustScore, review counts, star distribution, 20 reviews per page with rating, text, dates, company reply, next page | [@extracthub1/trustpilot-reviews](https://extracthub.io/extractor/@extracthub1/trustpilot-reviews) | $0.0025 |
| [Rotten Tomatoes Movie Scraper](scrapers/rottentomatoes-movie-scraper/) | movie page: Tomatometer, audience score, review counts, critics consensus, synopsis, rating, genres, directors, cast, Movie Info (box office, runtime, release dates, ...) | [@extracthub1/rottentomatoes-movie](https://extracthub.io/extractor/@extracthub1/rottentomatoes-movie) | $0.0025 |
| [Goodreads Book Scraper](scrapers/goodreads-book-scraper/) | book page: rating, ratings and reviews counts, star distribution, authors, series, description, genres, pages, format, publication info, publisher, language, ISBN / ISBN-13 / ASIN, awards, cover | [@extracthub1/goodreads-book](https://extracthub.io/extractor/@extracthub1/goodreads-book) | $0.0025 |
| [Steam Game Scraper](scrapers/steam-game-scraper/) | game page: app id, price, original price, discount, all and recent review summaries (label, count, % positive), release date, developers, publishers, genres, user tags, features, languages, platforms, Metacritic score, description | [@extracthub1/steam-game](https://extracthub.io/extractor/@extracthub1/steam-game) | $0.0025 |
| [Steam Search Scraper](scrapers/steam-search-scraper/) | games from a Steam store search, 50 per page: app id, name, image, platforms, release date, review summary, count and % positive, price, original price, discount, free flag, total results | [@extracthub1/steam-search](https://extracthub.io/extractor/@extracthub1/steam-search) | $0.0025 |
| [Wikipedia Article Scraper](scrapers/wikipedia-article-scraper/) | article page: title, short description, Wikidata id, lead summary, infobox label / value rows, infobox image, section headings, categories, references and languages counts, created and modified dates | [@extracthub1/wikipedia-article](https://extracthub.io/extractor/@extracthub1/wikipedia-article) | $0.0025 |
| [ESPN Scoreboard Scraper](scrapers/espn-scoreboard-scraper/) | games of a day from an ESPN scoreboard (NBA, NFL): game id, start time, status, teams with score, record, home / away and winner, period scores, venue, broadcasts, betting line, game link | [@extracthub1/espn-scoreboard](https://extracthub.io/extractor/@extracthub1/espn-scoreboard) | $0.0025 |
| [Transfermarkt Player Scraper](scrapers/transfermarkt-player-scraper/) | player profile: name, date of birth, age, citizenship, height, position, foot, agent, club, league, contract end, caps and goals, market value, titles, facts table | [@extracthub1/transfermarkt-player](https://extracthub.io/extractor/@extracthub1/transfermarkt-player) | $0.0035 |
| [Transfermarkt Squad Scraper](scrapers/transfermarkt-squad-scraper/) | club squad: players with shirt number, position, age, nationalities, contract end, market value, injury, captain, plus squad size, average age, stadium, total market value | [@extracthub1/transfermarkt-squad](https://extracthub.io/extractor/@extracthub1/transfermarkt-squad) | $0.0035 |
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
  --data-urlencode "extractor_id=@extracthub1/youtube-video@2" \
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

> *"Use `@extracthub1/google-serp@2` to get the top Google results for **best web scraper** and make a table
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
scripts/
  check-samples.mjs      checks that each scraper's example URL, README and sample output show the same page
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
