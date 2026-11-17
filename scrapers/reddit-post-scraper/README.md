# Reddit Post Scraper (post + comments)

Turn a Reddit post page into JSON: post id, title, subreddit, author, score, upvote ratio, comments count, post
type, link target, date and the full text body, plus the comments Reddit loads with the page (id, author, score,
reply depth, date, text and link). Good for community research, brand and product mentions, sentiment analysis
and building datasets of discussions.

**Catalog:** [extracthub.io/extractor/@extracthub1/reddit-post](https://extracthub.io/extractor/@extracthub1/reddit-post)
**Extractor id:** `@extracthub1/reddit-post@1` · **Price:** $0.0035 per page

## Input

A Reddit post page:

```
https://www.reddit.com/r/<subreddit>/comments/<post-id>/<slug>/
```

e.g. `https://www.reddit.com/r/webscraping/comments/1xukkss/akamai_standard_bmp_fully_reversed_vm_isa_other/`.

## Output

| Field | Type | Description |
|---|---|---|
| `id` | string | Reddit post id (fullname), e.g. `t3_1xukkss` |
| `title` | string | post title, e.g. `AKAMAI (STANDARD + BMP) FULLY REVERSED + VM ISA, OTHER CHECKS` |
| `subreddit` | string | e.g. `r/webscraping` |
| `author` | string \| null | username of the poster |
| `score` | number \| null | post score (upvotes minus downvotes), e.g. `34` |
| `upvoteRatio` | number \| null | share of upvotes, 0 to 1, e.g. `0.972` |
| `commentCount` | number \| null | total comments on the post, e.g. `5` |
| `postType` | string \| null | Reddit's post type, e.g. `multi_media` (text with media), `video` |
| `domain` | string \| null | link domain, `self.<subreddit>` for text posts, e.g. `self.webscraping` |
| `contentUrl` | string \| null | where the post points (the external link or media for link / video posts, the post itself for text posts) |
| `createdAt` | string | creation time (ISO 8601, UTC), e.g. `2026-11-12T18:29:28.521000+0000` |
| `text` | string \| null | post body as plain text (`null` for posts without text) |
| `url` | string | canonical post link |
| `comments[]` | array | comments loaded with the page, in thread order |
| `comments[].position` | number | 1-based order on the page |
| `comments[].id` | string | comment id, e.g. `t1_19sjijhsy6xur` |
| `comments[].author` | string \| null | username of the commenter |
| `comments[].score` | number \| null | comment score (see Good to know) |
| `comments[].depth` | number \| null | reply level: `null` = top-level comment, `1` = reply, `2` = reply to a reply, ... |
| `comments[].createdAt` | string | e.g. `2026-11-12T20:55:56.764Z` |
| `comments[].text` | string | comment text |
| `comments[].url` | string | comment permalink |

Full example: [sample-output.json](sample-output.json) (the r/webscraping post above; usernames shortened to
initials).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/reddit-post@1" \
  --data-urlencode "target_url=https://www.reddit.com/r/webscraping/comments/1xukkss/akamai_standard_bmp_fully_reversed_vm_isa_other/"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/reddit-post@1` on these Reddit threads and give me, per thread, the title, score, comments
> count and the three highest-scored top-level comments.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Browser rendering:** Reddit answers plain fetches with a "Prove your humanity" page, so this extractor renders
  the page in a browser through a US proxy (JavaScript price tier).
- **Comments loaded with the page:** Reddit shows the first comments of a thread (in tests, 16 of a 28-comment
  thread) and loads the rest when you click "more replies". Very long threads return that first part;
  `commentCount` still gives the full total.
- **Comment scores can be missing:** Reddit sometimes renders a comment's vote row after the page is captured;
  `comments[].score` is then `null`. Post `score`, `upvoteRatio` and `commentCount` are always read from the post.
- **Removed or private posts:** a page without a post id or title (removed post, private or banned subreddit, a
  bot check) fails with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **Usernames only:** authors are returned as public Reddit usernames; no profile details are extracted.
- **Not included:** subreddit feeds (the list of posts in a subreddit). Reddit renders only 3 posts of a feed
  without scrolling, so there is no feed scraper yet.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real post page
