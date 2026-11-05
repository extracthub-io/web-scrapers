# YouTube Transcript Scraper

Get the transcript (captions) of a YouTube video as JSON: every caption segment with its start time,
duration and text. Works for long videos, with one API call per video. No YouTube API key or OAuth needed.

**Catalog:** [extracthub.io/extractor/@extracthub1/youtube-transcript](https://extracthub.io/extractor/@extracthub1/youtube-transcript)
**Extractor id:** `@extracthub1/youtube-transcript@2` · **Price:** $0.0035 per video (JavaScript tier)

## Input

A YouTube watch URL: `https://www.youtube.com/watch?v=<id>`. Add `&hl=en` for an English player UI.

## Output

| Field | Type | Description |
|---|---|---|
| `captionsStatus` | number | HTTP status of the caption file the player loaded (`200` = captions found) |
| `transcript.segments[]` | array | caption segments in order (never empty: see "No transcript" below) |
| `transcript.segments[].position` | number | 1-based segment number |
| `transcript.segments[].startMs` | number | start time in milliseconds |
| `transcript.segments[].durationMs` | number | how long the segment is shown, in milliseconds |
| `transcript.segments[].text` | string | caption text |

Full example: [sample-output.json](sample-output.json) (Sir Ken Robinson, "Do schools kill creativity?",
427 segments over 19 minutes).

Plain text in one line of JavaScript:

```js
const text = data.transcript.segments.map(s => s.text).join(" ");
```

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/youtube-transcript@2" \
  --data-urlencode "target_url=https://www.youtube.com/watch?v=iG9CE55wbtY&hl=en"
```

With an AI agent (ExtractHub MCP connected):
> Get the transcript of https://www.youtube.com/watch?v=iG9CE55wbtY with
> `@extracthub1/youtube-transcript@2` and summarise the talk in 5 bullet points.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## How it works

The scraper opens the video in a real browser, starts playback and turns captions on. The YouTube player
then loads the caption file itself, and the scraper captures that response (XHR capture) and turns it into
segments. No tokens are generated or faked; it is what any viewer's browser does with subtitles on.

## Good to know

- **Which language?** The track the player picks by default: usually the video's own language, manual
  captions before auto-generated ones. Choosing another language or a translation is not supported yet.
- **No transcript = failed request:** if no caption file was captured (the video has no captions, or the
  player didn't load them this time), the call fails with HTTP 422 `required_fields_missing` instead of
  returning an empty list. The page was fetched, so the failure is charged ($0.0035). In batches and pipelines
  the item is retried once automatically; for single calls, retry once yourself. In testing about 1 in 11 calls
  needed a retry on videos that do have captions.
- **Video metadata** (title, channel, views ...) is not included here: use the
  [YouTube Video Scraper](../youtube-video-scraper/) for that ($0.0025).

## Versions

- **2.0.0** (`@2`, current): `transcript` and `transcript.segments` are required, so a missing transcript
  fails the request (422) instead of returning an empty list.
- **1.0.0** (`@1`): returns `captionsStatus: null` and an empty `segments` list when no transcript was
  captured. Still available; existing `@1` integrations keep working unchanged.

## Files

- [`extractor.json`](extractor.json): the extractor definition (browser actions + XHR capture + JSON
  fields)
- [`sample-output.json`](sample-output.json): output on a real video
