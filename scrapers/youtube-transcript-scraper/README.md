# YouTube Transcript Scraper

Get the transcript (captions) of a YouTube video as JSON: every caption segment with its start time,
duration and text. Works for long videos, with one API call per video. No YouTube API key or OAuth needed.

**Catalog:** [extracthub.io/extractor/@extracthub1/youtube-transcript](https://extracthub.io/extractor/@extracthub1/youtube-transcript)
**Extractor id:** `@extracthub1/youtube-transcript@1` · **Price:** $0.0035 per video (JavaScript tier)

## Input

A YouTube watch URL: `https://www.youtube.com/watch?v=<id>`. Add `&hl=en` for an English player UI.

## Output

| Field | Type | Description |
|---|---|---|
| `captionsStatus` | number \| null | HTTP status of the caption file the player loaded (`200` = captions found; `null` = the video has no captions or the player didn't load them) |
| `transcript.segments[]` | array | caption segments in order |
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
  --data-urlencode "extractor_id=@extracthub1/youtube-transcript@1" \
  --data-urlencode "target_url=https://www.youtube.com/watch?v=iG9CE55wbtY&hl=en"
```

With an AI agent (ExtractHub MCP connected):
> Get the transcript of https://www.youtube.com/watch?v=iG9CE55wbtY with
> `@extracthub1/youtube-transcript@1` and summarise the talk in 5 bullet points.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## How it works

The scraper opens the video in a real browser, starts playback and turns captions on. The YouTube player
then loads the caption file itself, and the scraper captures that response (XHR capture) and turns it into
segments. No tokens are generated or faked; it is what any viewer's browser does with subtitles on.

## Good to know

- **Which language?** The track the player picks by default: usually the video's own language, manual
  captions before auto-generated ones. Choosing another language or a translation is not supported yet.
- **No captions:** `captionsStatus` is `null` and `segments` is empty.
- **Occasional empty result:** in testing, 10 of 11 calls returned the full transcript. If `segments` is
  empty for a video you know has captions, retry.
- **Video metadata** (title, channel, views ...) is not included here: use the
  [YouTube Video Scraper](../youtube-video-scraper/) for that ($0.0025).

## Files

- [`extractor.json`](extractor.json): the extractor definition (browser actions + XHR capture + JSON
  fields)
- [`sample-output.json`](sample-output.json): output on a real video
