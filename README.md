# Web Scrapers (ready-to-use scraping API)

A growing collection of **ready-to-use web scrapers** that turn web pages into clean JSON. Every scraper here
is a published [ExtractHub](https://extracthub.io) extractor: send a URL, get structured data back. No
browser, no proxies to rotate, no HTML parsing code to maintain. Use them from any language through the REST
API, or let an **AI agent** (Claude, Cursor, any MCP client) call them for you.

**Sites covered:** e-commerce (Amazon, eBay, Walmart, Etsy, AliExpress, Best Buy, Target, Tokopedia, Google
Shopping, Steam); jobs (Indeed, LinkedIn Jobs); local and travel (Google Maps, Yelp, TripAdvisor, Booking.com,
Airbnb, Yellow Pages, Craigslist); real estate (Zillow, Realtor.com, Redfin); search and news (Google Search,
Bing, Google News, BBC News, AP News, The Guardian, CNN, Al Jazeera, NPR, The Independent, Detik.com, Kompas.com, Hacker News, Reddit); apps and developers (Google Play, App Store, GitHub, Product
Hunt, Stack Overflow); media and reviews (YouTube, YouTube transcripts, Rotten Tomatoes, Goodreads, Trustpilot,
Wikipedia); sports (ESPN, Cricbuzz, Transfermarkt, Basketball-Reference); finance (Yahoo Finance, Google
Finance, Finviz, CoinMarketCap, CoinGecko).

## Scrapers

| Scraper | What it extracts | Catalog | Price / call |
|---|---|---|---|
| [Google Search Scraper (SERP)](scrapers/google-search-scraper/) | organic results incl. videos, People also ask, related searches, next page | [@extracthub1/google-serp](https://extracthub.io/extractor/@extracthub1/google-serp) | $0.0025 |
| [Google Maps Scraper (places search)](scrapers/google-maps-scraper/) | places from a Maps search: name, place link, place ID, coordinates, rating, reviews, category, address, open status, phone, website, hotel price, reviews and photos links | [@extracthub1/google-maps-search](https://extracthub.io/extractor/@extracthub1/google-maps-search) | $0.0035 |
| [Google Maps Place Scraper (place details)](scrapers/google-maps-place-scraper/) | one place: full address, phone, website, hours, Plus Code, place ID, coordinates, top reviews, reviews and photos links | [@extracthub1/google-maps-place](https://extracthub.io/extractor/@extracthub1/google-maps-place) | $0.0035 |
| [Google Maps Reviews Scraper](scrapers/google-maps-reviews-scraper/) | reviews of a place (5 to 13 shown without sign-in): author, rating, date, full text, detail ratings, photos, owner reply; rating distribution, topics | [@extracthub1/google-maps-reviews](https://extracthub.io/extractor/@extracthub1/google-maps-reviews) | $0.0035 |
| [Google Maps Photos Scraper](scrapers/google-maps-photos-scraper/) | photos and videos of a place (10 shown without sign-in): image link, resizable base link, video length | [@extracthub1/google-maps-photos](https://extracthub.io/extractor/@extracthub1/google-maps-photos) | $0.0035 |
| [Google Local Results Scraper](scrapers/google-local-results-scraper/) | places from Google's local results, 20 per page with next page: name, rating, reviews, category, address, phone, years in business | [@extracthub1/google-local-results](https://extracthub.io/extractor/@extracthub1/google-local-results) | $0.0025 |
| [Google Play App Scraper](scrapers/google-play-app-scraper/) | app page: rating, rating count, downloads, developer, category, price, update date, description, screenshots | [@extracthub1/google-play-app](https://extracthub.io/extractor/@extracthub1/google-play-app) | $0.0025 |
| [Apple App Store Scraper](scrapers/apple-app-store-scraper/) | app page: rating, rating count, price, version, release notes, size, age rating, developer, description, screenshots | [@extracthub1/apple-app-store-app](https://extracthub.io/extractor/@extracthub1/apple-app-store-app) | $0.0025 |
| [YouTube Channel Videos Scraper](scrapers/youtube-channel-videos-scraper/) | channel info + about 120 latest videos: title, views, publish date, duration | [@extracthub1/youtube-channel-videos](https://extracthub.io/extractor/@extracthub1/youtube-channel-videos) | $0.0035 |
| [YouTube Video Scraper](scrapers/youtube-video-scraper/) | title, description, channel, subscribers, views, likes, duration, publish date, keywords | [@extracthub1/youtube-video](https://extracthub.io/extractor/@extracthub1/youtube-video) | $0.0025 |
| [YouTube Transcript Scraper](scrapers/youtube-transcript-scraper/) | full video transcript: timestamped caption segments (start, duration, text) | [@extracthub1/youtube-transcript](https://extracthub.io/extractor/@extracthub1/youtube-transcript) | $0.0035 |
| [GitHub Repository Scraper](scrapers/github-repo-scraper/) | repo page: stars, forks, watchers, topics, license, commits, releases, open issues and PRs, latest commit | [@extracthub1/github-repo](https://extracthub.io/extractor/@extracthub1/github-repo) | $0.0025 |
| [Google News Scraper](scrapers/google-news-scraper/) | articles of a Google News topic page (~200): title, article id, article link, source, source site, publish time, author, image | [@extracthub1/google-news](https://extracthub.io/extractor/@extracthub1/google-news) | $0.0025 |
| [BBC News Home Scraper](scrapers/bbc-news-home-scraper/) | bbc.com home page and BBC News index: navigation-bar sections and subsections, story blocks with headline, link, summary, time, topic, image | [@extracthub1/bbc-news-home](https://extracthub.io/extractor/@extracthub1/bbc-news-home) | $0.0025 |
| [BBC News Section Scraper](scrapers/bbc-news-section-scraper/) | section or topic page: navigation-bar sections and subsections, story blocks with name and link, stories with headline, link, summary, time label, topic and image | [@extracthub1/bbc-news-section](https://extracthub.io/extractor/@extracthub1/bbc-news-section) | $0.0025 |
| [BBC News Article Scraper](scrapers/bbc-news-article-scraper/) | article: headline, summary, publish / update time, authors and roles, images with captions, body paragraphs and text, Markdown body, topics, related stories | [@extracthub1/bbc-news-article](https://extracthub.io/extractor/@extracthub1/bbc-news-article) | $0.0025 |
| [AP News Home Scraper](scrapers/apnews-home-scraper/) | home page: every story with headline, link, summary, times, authors, image; navigation-bar sections | [@extracthub1/apnews-home](https://extracthub.io/extractor/@extracthub1/apnews-home) | $0.0025 |
| [AP News Hub Scraper](scrapers/apnews-hub-scraper/) | hub (topic / section) page: navigation-bar sections, every story with position, headline, link, summary, published / updated time, authors, image, comment count | [@extracthub1/apnews-hub](https://extracthub.io/extractor/@extracthub1/apnews-hub) | $0.0025 |
| [AP News Article Scraper](scrapers/apnews-article-scraper/) | article: headline, summary, section, published / modified time, byline and authors, lead image and caption, keywords, subheadings, body paragraphs and text, Markdown body | [@extracthub1/apnews-article](https://extracthub.io/extractor/@extracthub1/apnews-article) | $0.0025 |
| [The Guardian Home Scraper](scrapers/guardian-home-scraper/) | edition front page: navigation sections and subsections, containers with their stories | [@extracthub1/guardian-home](https://extracthub.io/extractor/@extracthub1/guardian-home) | $0.0025 |
| [The Guardian Section Scraper](scrapers/guardian-section-scraper/) | section front: navigation sections and subsections, containers with name and link, stories with position, headline, kicker, link, trail text, time, card type, media label, image, sub-links | [@extracthub1/guardian-section](https://extracthub.io/extractor/@extracthub1/guardian-section) | $0.0025 |
| [The Guardian Article Scraper](scrapers/guardian-article-scraper/) | article: headline, standfirst, section and label, published / modified time, byline and authors, lead image and caption, keywords, subheadings, body paragraphs and text, Markdown body | [@extracthub1/guardian-article](https://extracthub.io/extractor/@extracthub1/guardian-article) | $0.0025 |
| [CNN Home Scraper](scrapers/cnn-home-scraper/) | home page: stories in page order with headline, link, type, image and credit; navigation-bar sections | [@extracthub1/cnn-home](https://extracthub.io/extractor/@extracthub1/cnn-home) | $0.0025 |
| [CNN Section Scraper](scrapers/cnn-section-scraper/) | home page and any section page: stories in page order with headline, link, type (article, video, gallery, live story), image and credit; navigation-bar sections | [@extracthub1/cnn-section](https://extracthub.io/extractor/@extracthub1/cnn-section) | $0.0025 |
| [CNN Article Scraper](scrapers/cnn-article-scraper/) | article: headline, description, section and breadcrumb, read time, published / modified time, byline and authors, word count, lead image and caption, body paragraphs and text, Markdown body | [@extracthub1/cnn-article](https://extracthub.io/extractor/@extracthub1/cnn-article) | $0.0025 |
| [Detik.com Index Scraper](scrapers/detik-index-scraper/) | latest-news index of a detik channel, 20 per page: category navigation, position, headline, link, publish time (Unix and WIB label), relative time, thumbnail, current and next page | [@extracthub1/detik-index](https://extracthub.io/extractor/@extracthub1/detik-index) | $0.0025 |
| [Detik.com Home Scraper](scrapers/detik-home-scraper/) | www.detik.com front page: channel navigation and stories with headline, link, publish time | [@extracthub1/detik-home](https://extracthub.io/extractor/@extracthub1/detik-home) | $0.0025 |
| [Detik.com Section Scraper](scrapers/detik-section-scraper/) | channel and category pages: category navigation and stories with headline, link, publish time | [@extracthub1/detik-section](https://extracthub.io/extractor/@extracthub1/detik-section) | $0.0025 |
| [Detik.com Article Scraper](scrapers/detik-article-scraper/) | article: id, headline, description, author and byline, channel, breadcrumb, published / modified time, dateline, lead image and caption, tags, page count, subheadings, body paragraphs (all pages) and text, Markdown body | [@extracthub1/detik-article](https://extracthub.io/extractor/@extracthub1/detik-article) | $0.0025 |
| [Kompas.com Home Scraper](scrapers/kompas-home-scraper/) | front page: navigation sections and stories with headline, link, label, date, image | [@extracthub1/kompas-home](https://extracthub.io/extractor/@extracthub1/kompas-home) | $0.0025 |
| [Kompas.com Section Scraper](scrapers/kompas-section-scraper/) | section and channel pages (three card layouts): navigation sections and stories with headline, link, label, date, image | [@extracthub1/kompas-section](https://extracthub.io/extractor/@extracthub1/kompas-section) | $0.0025 |
| [Kompas.com Article Scraper](scrapers/kompas-article-scraper/) | article: headline, description, section, breadcrumb, published / modified time, author with profile link, editor, dateline, word and page count, lead image and caption, tags, subheadings, body paragraphs and text, Markdown body, related links | [@extracthub1/kompas-article](https://extracthub.io/extractor/@extracthub1/kompas-article) | $0.0025 |
| [Al Jazeera Home Scraper](scrapers/aljazeera-home-scraper/) | front page: navigation sections with submenus, trending bar, stories with headline, link, summary, label, image | [@extracthub1/aljazeera-home](https://extracthub.io/extractor/@extracthub1/aljazeera-home) | $0.0025 |
| [Al Jazeera Section Scraper](scrapers/aljazeera-section-scraper/) | section, region and topic pages: navigation, stories with headline, link, summary, label, date, image | [@extracthub1/aljazeera-section](https://extracthub.io/extractor/@extracthub1/aljazeera-section) | $0.0025 |
| [Al Jazeera Article Scraper](scrapers/aljazeera-article-scraper/) | article: headline, standfirst, label, topics, dates, authors, image, subheadings, paragraphs, text, Markdown body | [@extracthub1/aljazeera-article](https://extracthub.io/extractor/@extracthub1/aljazeera-article) | $0.0025 |
| [NPR Home Scraper](scrapers/npr-home-scraper/) | front page: navigation sections with subsections, stories with headline, link, label, teaser, date, image | [@extracthub1/npr-home](https://extracthub.io/extractor/@extracthub1/npr-home) | $0.0025 |
| [NPR Section Scraper](scrapers/npr-section-scraper/) | section pages (other card layout): navigation, stories with headline, link, label, teaser, date, image | [@extracthub1/npr-section](https://extracthub.io/extractor/@extracthub1/npr-section) | $0.0025 |
| [NPR Article Scraper](scrapers/npr-article-scraper/) | story: headline, section, dates, authors, image, subheadings, paragraphs, text, Markdown body | [@extracthub1/npr-article](https://extracthub.io/extractor/@extracthub1/npr-article) | $0.0025 |
| [The Independent Home Scraper](scrapers/independent-home-scraper/) | front page: navigation sections, stories with headline, link, label, image | [@extracthub1/independent-home](https://extracthub.io/extractor/@extracthub1/independent-home) | $0.0025 |
| [The Independent Section Scraper](scrapers/independent-section-scraper/) | section and topic pages: navigation sections, stories with headline, link, label, image | [@extracthub1/independent-section](https://extracthub.io/extractor/@extracthub1/independent-section) | $0.0025 |
| [The Independent Article Scraper](scrapers/independent-article-scraper/) | article: headline, standfirst, section, dates, author, free / premium, image, paragraphs, text, Markdown body | [@extracthub1/independent-article](https://extracthub.io/extractor/@extracthub1/independent-article) | $0.0025 |
| [Google Shopping Scraper](scrapers/google-shopping-scraper/) | products of a Google Shopping search, about 40 per page: title, price, original and typical price, discount, store, rating, review count, delivery, Google product ids, themed product groups, next page | [@extracthub1/google-shopping](https://extracthub.io/extractor/@extracthub1/google-shopping) | $0.0025 |
| [Bing Search Scraper (SERP)](scrapers/bing-search-scraper/) | organic results of a Bing search: position, title, link, displayed URL, site name, snippet, date, plus result count, related searches, next page | [@extracthub1/bing-serp](https://extracthub.io/extractor/@extracthub1/bing-serp) | $0.0025 |
| [Hacker News Scraper](scrapers/hacker-news-scraper/) | stories from the front page, newest, ask, show: title, link, points, author, time, comments, next page | [@extracthub1/hacker-news-stories](https://extracthub.io/extractor/@extracthub1/hacker-news-stories) | $0.0025 |
| [Reddit Post Scraper](scrapers/reddit-post-scraper/) | post page: id, title, subreddit, author, score, upvote ratio, comments count, post type, link, date, text, plus the loaded comments with author, score, reply depth, date, text, link | [@extracthub1/reddit-post](https://extracthub.io/extractor/@extracthub1/reddit-post) | $0.0035 |
| [Product Hunt Leaderboard Scraper](scrapers/producthunt-leaderboard-scraper/) | ranked launches of a Product Hunt day: rank, name, tagline, link, topics, votes, comments, thumbnail, previous / next day | [@extracthub1/producthunt-leaderboard](https://extracthub.io/extractor/@extracthub1/producthunt-leaderboard) | $0.0025 |
| [Stack Overflow Questions Scraper (by tag)](scrapers/stackoverflow-questions-scraper/) | questions of a tag page, 15 per page, any sort tab: id, title, link, score, answers, accepted, views, comments, asked date, excerpt, tags, user, total questions, next page | [@extracthub1/stackoverflow-questions](https://extracthub.io/extractor/@extracthub1/stackoverflow-questions) | $0.0025 |
| [Stack Overflow Question Scraper](scrapers/stackoverflow-question-scraper/) | question page: score, views, dates, tags, body (text and HTML), author, comments and answers counts, up to 30 answers with score, accepted flag, date, body and author, next answers page | [@extracthub1/stackoverflow-question](https://extracthub.io/extractor/@extracthub1/stackoverflow-question) | $0.0025 |
| [Zillow Search Scraper](scrapers/zillow-search-scraper/) | homes for sale, for rent or recently sold from a Zillow search, 41 per page: address, price, bedrooms, floor size, coordinates, photo, link, total results, next page | [@extracthub1/zillow-search](https://extracthub.io/extractor/@extracthub1/zillow-search) | $0.0025 |
| [Zillow Property Scraper](scrapers/zillow-property-scraper/) | one home: price, Zestimate, beds, baths, area, description, days on Zillow, MLS #, facts & features, price and tax history | [@extracthub1/zillow-property](https://extracthub.io/extractor/@extracthub1/zillow-property) | $0.0035 |
| [Zillow Apartment Scraper](scrapers/zillow-apartment-scraper/) | one rental building: address, leasing phone, special offer, pet policies, amenities, walk / transit scores, photos, floor plans with rent ranges and available units, schools | [@extracthub1/zillow-apartment](https://extracthub.io/extractor/@extracthub1/zillow-apartment) | $0.0025 |
| [Zillow Agents Scraper](scrapers/zillow-agents-scraper/) | real estate agents and teams of a city or ZIP directory, 15 per page: name, profile link, price range, sales, rating, reviews, agents found | [@extracthub1/zillow-agents](https://extracthub.io/extractor/@extracthub1/zillow-agents) | $0.0025 |
| [Zillow Agent Profile Scraper](scrapers/zillow-agent-profile-scraper/) | one agent or team: brokerage, business address and phone, rating, licenses, service areas, sales, listings, team members, latest reviews | [@extracthub1/zillow-agent-profile](https://extracthub.io/extractor/@extracthub1/zillow-agent-profile) | $0.0025 |
| [Zillow Mortgage Rates Scraper](scrapers/zillow-mortgage-rates-scraper/) | today's Zillow Home Loans rates: rate, APR, points and fees, loan type and term per product | [@extracthub1/zillow-mortgage-rates](https://extracthub.io/extractor/@extracthub1/zillow-mortgage-rates) | $0.0025 |
| [Zillow Home Values Scraper](scrapers/zillow-home-values-scraper/) | housing market of a city, ZIP, neighborhood or state: typical home value and 1-year change, inventory, list and sale prices, days to pending, rent, monthly history, nearby regions | [@extracthub1/zillow-home-values](https://extracthub.io/extractor/@extracthub1/zillow-home-values) | $0.0025 |
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
| [Target Search Scraper](scrapers/target-search-scraper/) | search and category pages: results count, page links, breadcrumbs, sibling categories, related searches, products with TCIN, brand, price, regular price, sale type, rating | [@extracthub1/target-search](https://extracthub.io/extractor/@extracthub1/target-search) | $0.0035 |
| [Target Store Scraper](scrapers/target-store-scraper/) | store page: store id, address, coordinates, phone, 7-day hours, department hours, pickup and delivery options, store features | [@extracthub1/target-store](https://extracthub.io/extractor/@extracthub1/target-store) | $0.0035 |
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
| [TripAdvisor Hotels Scraper](scrapers/tripadvisor-hotels-scraper/) | hotels list of a city: rank, hotel id, name, link, rating, reviews count, Best Value rank, lowest price shown, review snippet, next page | [@extracthub1/tripadvisor-hotels](https://extracthub.io/extractor/@extracthub1/tripadvisor-hotels) | $0.0025 |
| [TripAdvisor Restaurants Scraper](scrapers/tripadvisor-restaurants-scraper/) | restaurants list of a city: rank, name, link, rating, reviews count, price range, cuisines, phone, address, coordinates, opening hours, next page | [@extracthub1/tripadvisor-restaurants](https://extracthub.io/extractor/@extracthub1/tripadvisor-restaurants) | $0.0025 |
| [TripAdvisor Restaurant Scraper](scrapers/tripadvisor-restaurant-scraper/) | restaurant page: rating, reviews count, ranking, price range, cuisines, meal types, features, phone, menu, address, opening hours, latest reviews (no reviewer names) | [@extracthub1/tripadvisor-restaurant](https://extracthub.io/extractor/@extracthub1/tripadvisor-restaurant) | $0.0025 |
| [TripAdvisor Attractions Scraper](scrapers/tripadvisor-attractions-scraper/) | things to do list of a city by category: rank, name, link, rating, reviews count, categories, ticket price, next page | [@extracthub1/tripadvisor-attractions](https://extracthub.io/extractor/@extracthub1/tripadvisor-attractions) | $0.0025 |
| [TripAdvisor Attraction Scraper](scrapers/tripadvisor-attraction-scraper/) | attraction page: rating, reviews count, ranking, description, opening hours, phone, website, address, coordinates, latest reviews (no reviewer names) | [@extracthub1/tripadvisor-attraction](https://extracthub.io/extractor/@extracthub1/tripadvisor-attraction) | $0.0025 |
| [TripAdvisor Search Autocomplete Scraper](scrapers/tripadvisor-autocomplete-scraper/) | search suggestions for a term: destinations, hotels, restaurants and attractions with type, location id, name with location, coordinates, link; filter by type | [@extracthub1/tripadvisor-autocomplete](https://extracthub.io/extractor/@extracthub1/tripadvisor-autocomplete) | $0.0025 |
| [TripAdvisor Destination Scraper](scrapers/tripadvisor-destination-scraper/) | destination page of a city, region or country: geo id, reviews and photos count, breadcrumbs, links to its lists, top things to do, hotels and restaurants with rating, themed tours with price, best cities to visit | [@extracthub1/tripadvisor-destination](https://extracthub.io/extractor/@extracthub1/tripadvisor-destination) | $0.0025 |
| [Booking.com Search Scraper](scrapers/booking-search-scraper/) | properties from a Booking.com search with dates, 15 to 20 per page: name, link, area, review score and count, room, price per night, total price, original price, deal, free cancellation, total found | [@extracthub1/booking-search](https://extracthub.io/extractor/@extracthub1/booking-search) | $0.0025 |
| [Booking.com Hotel Scraper](scrapers/booking-hotel-scraper/) | property page: hotel id, city id (ufi), stars, review score and count, subscores, location score, address, coordinates, description, popular facilities, check-in / check-out, house rules | [@extracthub1/booking-hotel](https://extracthub.io/extractor/@extracthub1/booking-hotel) | $0.0025 |
| [Booking.com Reviews Scraper](scrapers/booking-hotel-reviews-scraper/) | guest reviews from a property page, first 10 of the review list: guest name and country, room, nights, stay month, traveler type, date, title, score, liked / disliked, property reply; overall score and count | [@extracthub1/booking-hotel-reviews](https://extracthub.io/extractor/@extracthub1/booking-hotel-reviews) | $0.0035 |
| [Airbnb Listing Scraper](scrapers/airbnb-listing-scraper/) | listing page: property and room type, guests / bedrooms / beds / baths, location, coordinates, rating, reviews count, Guest favorite, category ratings, host (Superhost, rating, response), amenities, house rules, photos | [@extracthub1/airbnb-listing](https://extracthub.io/extractor/@extracthub1/airbnb-listing) | $0.0025 |
| [Trustpilot Reviews Scraper](scrapers/trustpilot-reviews-scraper/) | company page: TrustScore, review counts, star distribution, 20 reviews per page with rating, text, dates, company reply, next page | [@extracthub1/trustpilot-reviews](https://extracthub.io/extractor/@extracthub1/trustpilot-reviews) | $0.0025 |
| [Rotten Tomatoes Movie Scraper](scrapers/rottentomatoes-movie-scraper/) | movie page: Tomatometer, audience score, review counts, critics consensus, synopsis, rating, genres, directors, cast, Movie Info (box office, runtime, release dates, ...) | [@extracthub1/rottentomatoes-movie](https://extracthub.io/extractor/@extracthub1/rottentomatoes-movie) | $0.0025 |
| [Goodreads Book Scraper](scrapers/goodreads-book-scraper/) | book page: rating, ratings and reviews counts, star distribution, authors, series, description, genres, pages, format, publication info, publisher, language, ISBN / ISBN-13 / ASIN, awards, cover | [@extracthub1/goodreads-book](https://extracthub.io/extractor/@extracthub1/goodreads-book) | $0.0025 |
| [Steam Game Scraper](scrapers/steam-game-scraper/) | game page: app id, price, original price, discount, all and recent review summaries (label, count, % positive), release date, developers, publishers, genres, user tags, features, languages, platforms, Metacritic score, description | [@extracthub1/steam-game](https://extracthub.io/extractor/@extracthub1/steam-game) | $0.0025 |
| [Steam Search Scraper](scrapers/steam-search-scraper/) | games from a Steam store search, 50 per page: app id, name, image, platforms, release date, review summary, count and % positive, price, original price, discount, free flag, total results | [@extracthub1/steam-search](https://extracthub.io/extractor/@extracthub1/steam-search) | $0.0025 |
| [Wikipedia Article Scraper](scrapers/wikipedia-article-scraper/) | article page: title, short description, Wikidata id, lead summary, infobox label / value rows, infobox image, section headings, categories, references and languages counts, created and modified dates | [@extracthub1/wikipedia-article](https://extracthub.io/extractor/@extracthub1/wikipedia-article) | $0.0025 |
| [ESPN Scoreboard Scraper](scrapers/espn-scoreboard-scraper/) | games of a day from an ESPN scoreboard (NBA, NFL): game id, start time, status, teams with score, record, home / away and winner, period scores, venue, broadcasts, betting line, game link | [@extracthub1/espn-scoreboard](https://extracthub.io/extractor/@extracthub1/espn-scoreboard) | $0.0025 |
| [Cricbuzz Live Scores Scraper](scrapers/cricbuzz-live-scores-scraper/) | cricket matches from the live, recent or upcoming tab grouped by series: match id, title, description, venue, both teams with short name and score, status line, match link, plus all current matches with their state | [@extracthub1/cricbuzz-live-scores](https://extracthub.io/extractor/@extracthub1/cricbuzz-live-scores) | $0.0025 |
| [Transfermarkt Player Scraper](scrapers/transfermarkt-player-scraper/) | player profile: name, date of birth, age, citizenship, height, position, foot, agent, club, league, contract end, caps and goals, market value, titles, facts table | [@extracthub1/transfermarkt-player](https://extracthub.io/extractor/@extracthub1/transfermarkt-player) | $0.0035 |
| [Transfermarkt Squad Scraper](scrapers/transfermarkt-squad-scraper/) | club squad: players with shirt number, position, age, nationalities, contract end, market value, injury, captain, plus squad size, average age, stadium, total market value | [@extracthub1/transfermarkt-squad](https://extracthub.io/extractor/@extracthub1/transfermarkt-squad) | $0.0035 |
| [Transfermarkt League Table Scraper](scrapers/transfermarkt-league-table-scraper/) | league table: position, previous position, club, club id, matches, wins, draws, losses, goals for / against, goal difference, points, plus league, season | [@extracthub1/transfermarkt-league-table](https://extracthub.io/extractor/@extracthub1/transfermarkt-league-table) | $0.0035 |
| [Transfermarkt League Clubs Scraper](scrapers/transfermarkt-league-clubs-scraper/) | clubs of a league: club id, squad link, squad size, average age, foreigners, average and total market value, plus the league's country, level, champion, players, most valuable player, total market value | [@extracthub1/transfermarkt-league-clubs](https://extracthub.io/extractor/@extracthub1/transfermarkt-league-clubs) | $0.0035 |
| [Transfermarkt Player Stats Scraper](scrapers/transfermarkt-player-stats-scraper/) | player season stats per competition (appearances, goals, assists, cards, minutes) and the match log: date, venue, opponent, result, position, goals, assists, cards, minutes, absence note | [@extracthub1/transfermarkt-player-stats](https://extracthub.io/extractor/@extracthub1/transfermarkt-player-stats) | $0.0035 |
| [Transfermarkt Club Transfers Scraper](scrapers/transfermarkt-club-transfers-scraper/) | club arrivals and departures of a season: player, position, age, nationalities, other club, league, fee (text and euros), plus income, expenditure, balance | [@extracthub1/transfermarkt-club-transfers](https://extracthub.io/extractor/@extracthub1/transfermarkt-club-transfers) | $0.0035 |
| [Transfermarkt Market Values Scraper](scrapers/transfermarkt-market-values-scraper/) | most valuable players ranking, 25 per page: rank, player, position, age, nationalities, club, market value (text and euros), next page | [@extracthub1/transfermarkt-market-values](https://extracthub.io/extractor/@extracthub1/transfermarkt-market-values) | $0.0035 |
| [Basketball-Reference Player Scraper](scrapers/basketball-reference-player-scraper/) | NBA player page: bio, birth date and place, height, weight, honors, per-game stats for every season (games, minutes, shooting splits, rebounds, assists, steals, blocks, points, awards), career and per-team averages, career totals | [@extracthub1/basketball-reference-player](https://extracthub.io/extractor/@extracthub1/basketball-reference-player) | $0.0025 |
| [Yahoo Finance Quote Scraper](scrapers/yahoo-finance-quote-scraper/) | stock quote: price, change, after-hours price, day and 52-week range, volume, market cap, P/E, summary statistics, sector, industry, performance vs S&P 500, financial highlights, analyst price targets | [@extracthub1/yahoo-finance-quote](https://extracthub.io/extractor/@extracthub1/yahoo-finance-quote) | $0.0025 |
| [Yahoo Finance Historical Prices Scraper](scrapers/yahoo-finance-history-scraper/) | daily / weekly / monthly price rows (date, open, high, low, close, adjusted close, volume) plus dividends and splits | [@extracthub1/yahoo-finance-history](https://extracthub.io/extractor/@extracthub1/yahoo-finance-history) | $0.0025 |
| [Google Finance Quote Scraper](scrapers/google-finance-quote-scraper/) | stock quote: price, change, after-hours price, key stats (market cap, P/E, dividend, 52-week range, EPS, beta), company profile, analyst ratings and price targets, latest news, related stocks | [@extracthub1/google-finance-quote](https://extracthub.io/extractor/@extracthub1/google-finance-quote) | $0.0025 |
| [Google Finance Financials Scraper](scrapers/google-finance-financials-scraper/) | quarterly income statement, earnings history (EPS and revenue vs estimates, surprise %, filings), insider transactions | [@extracthub1/google-finance-financials](https://extracthub.io/extractor/@extracthub1/google-finance-financials) | $0.0035 |
| [Google Finance Markets Scraper](scrapers/google-finance-markets-scraper/) | market overview: indexes, currencies, crypto and futures, equity sectors, most active / gainers / losers, upcoming earnings, IPOs, market news | [@extracthub1/google-finance-markets](https://extracthub.io/extractor/@extracthub1/google-finance-markets) | $0.0025 |
| [Google Finance Earnings Scraper](scrapers/google-finance-earnings-scraper/) | earnings calendar: companies reporting yesterday to next week with time, fiscal period, EPS and revenue estimates | [@extracthub1/google-finance-earnings](https://extracthub.io/extractor/@extracthub1/google-finance-earnings) | $0.0025 |
| [Finviz Quote Scraper](scrapers/finviz-quote-scraper/) | stock quote: price, change, after-hours price, sector, industry, exchange, the full snapshot table of 84 fundamentals (market cap, P/E, EPS, short float, analyst recommendation, target price), latest news headlines, company description | [@extracthub1/finviz-quote](https://extracthub.io/extractor/@extracthub1/finviz-quote) | $0.0025 |
| [CoinMarketCap Listing Scraper](scrapers/coinmarketcap-listing-scraper/) | top cryptocurrencies, 100 per page: rank, name, symbol, price, 1h / 24h / 7d / 30d / 1y change, market cap, volume, dominance, supply, all-time high / low, plus global market stats | [@extracthub1/coinmarketcap-listing](https://extracthub.io/extractor/@extracthub1/coinmarketcap-listing) | $0.0025 |
| [CoinMarketCap Coin Scraper](scrapers/coinmarketcap-coin-scraper/) | coin page: price, changes from 1h to 1y, market cap, fully diluted cap, volume (CEX / DEX), supply, highs and lows, all-time high / low with dates, tags, contracts, links, holders, CertiK rating | [@extracthub1/coinmarketcap-coin](https://extracthub.io/extractor/@extracthub1/coinmarketcap-coin) | $0.0025 |
| [CoinGecko Coin Scraper](scrapers/coingecko-coin-scraper/) | coin page: USD / BTC price, 24h range, 1h to 1y change, market cap, statistics rows (FDV, volume, supply), all-time high / low with dates, links, categories, description, sentiment | [@extracthub1/coingecko-coin](https://extracthub.io/extractor/@extracthub1/coingecko-coin) | $0.0025 |
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
