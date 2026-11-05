# YouTube Video Scraper

Scrape YouTube video metadata into JSON: title, description, channel, subscriber count, views, likes,
duration, publish date, category, keywords, thumbnail and more. One API call per video, no YouTube API key
or quota needed.

**Catalog:** [extracthub.io/extractor/@extracthub1/youtube-video](https://extracthub.io/extractor/@extracthub1/youtube-video)
**Extractor id:** `@extracthub1/youtube-video@1` · **Price:** $0.0025 per video (proxy, no JavaScript)

## Input

A YouTube watch URL: `https://www.youtube.com/watch?v=<id>` (short links `https://youtu.be/<id>` work too).

## Output

| Field | Type | Description |
|---|---|---|
| `videoId` | string | video id |
| `url` | string | canonical watch URL |
| `title` | string | video title |
| `description` | string | full description (original text, links kept) |
| `channelName` | string | channel name |
| `channelId` | string | channel id (`UC...`) |
| `channelUrl` | string | channel URL (`https://www.youtube.com/@handle`) |
| `subscriberCount` | number | channel subscribers (rounded, from "4.56M subscribers") |
| `viewCount` | number | total views |
| `durationSeconds` | number | length in seconds (for live streams: time since the stream started) |
| `likeCount` | number | likes |
| `publishDate` | string | ISO 8601 date-time |
| `category` | string | YouTube category ("Music", "Education", ...) |
| `keywords` | string[] | video tags |
| `thumbnailUrl` | string | largest thumbnail |
| `isLive` | boolean | live stream / live content |
| `isFamilySafe` | boolean | family-safe flag |
| `playabilityStatus` | string | `OK`, `UNPLAYABLE`, `LOGIN_REQUIRED`, ... (see below) |

Full example: [sample-output.json](sample-output.json).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "X-API-Key: $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/youtube-video@1" \
  --data-urlencode "target_url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

With an AI agent (ExtractHub MCP connected):
> Get the title, views, likes and publish date of https://www.youtube.com/watch?v=dQw4w9WgXcQ with
> `@extracthub1/youtube-video@1`.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Partial results.** YouTube sometimes answers with its "Sign in to confirm you're not a bot" screen. The
  scraper still returns the core fields (`videoId`, `url`, `title`, `channel*`, `subscriberCount`,
  `viewCount`). `durationSeconds`, `likeCount`, `publishDate`, `category`, `keywords`, `thumbnailUrl`,
  `isLive`, `isFamilySafe` and `description` are `null` then, and `playabilityStatus` is
  `LOGIN_REQUIRED`. **Retry that URL** to get the full set.
- `UNPLAYABLE` (e.g. an ended live stream, region limits) is only the playback status: the metadata is usually
  complete.
- Transcripts / captions are not included: YouTube does not serve them to automated clients.

## Files

- [`extractor.json`](extractor.json): the extractor definition (reads YouTube's embedded `ytInitialData`
  and `ytInitialPlayerResponse` JSON)
- [`sample-output.json`](sample-output.json): real output of the released version
