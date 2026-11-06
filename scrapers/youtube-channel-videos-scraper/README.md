# YouTube Channel Videos Scraper

Turn a YouTube channel's Videos tab into JSON: channel name, id, handle, description, subscriber and video
counts, plus its latest videos (about 120 per call) with id, URL, title, view count, publish date and duration,
newest first. Pairs with the [YouTube Video Scraper](../youtube-video-scraper/) and the
[YouTube Transcript Scraper](../youtube-transcript-scraper/): list a channel's videos, then get each video's
full details or transcript.

**Catalog:** [extracthub.io/extractor/@extracthub1/youtube-channel-videos](https://extracthub.io/extractor/@extracthub1/youtube-channel-videos)
**Extractor id:** `@extracthub1/youtube-channel-videos@1` · **Price:** $0.0035 per channel (JavaScript tier)

## Input

The channel's Videos tab:

```
https://www.youtube.com/@<handle>/videos?hl=en&gl=US
https://www.youtube.com/channel/<channelId>/videos?hl=en&gl=US
```

`hl=en` keeps dates and counts in English ("2 days ago", "9.3M").

## Output

| Field | Type | Description |
|---|---|---|
| `channelName` | string | channel name |
| `channelId` | string \| null | channel id (`UC...`) |
| `channelUrl` | string \| null | `https://www.youtube.com/channel/<channelId>` |
| `handle` | string \| null | channel handle, e.g. `@mkbhd` |
| `description` | string \| null | channel description |
| `avatar` | string \| null | URL of the channel picture |
| `subscriberCount` | number \| null | subscribers, as YouTube rounds them (`21.4M` → `21400000`) |
| `videoCount` | number \| null | number of videos on the channel, as YouTube rounds it (`1.8K` → `1800`) |
| `videos[]` | array | the latest videos, newest first (about 120) |
| `videos[].position` | number | 1 = newest |
| `videos[].videoId` | string | video id |
| `videos[].url` | string \| null | `https://www.youtube.com/watch?v=<videoId>` |
| `videos[].title` | string \| null | video title |
| `videos[].viewCount` | number \| null | views, as YouTube rounds them (`9.3M` → `9300000`) |
| `videos[].published` | string \| null | relative publish date, e.g. `2 days ago`, `1 year ago` |
| `videos[].duration` | string \| null | duration as shown, e.g. `13:00`, `1:02:45` |

Thumbnail of any video: `https://i.ytimg.com/vi/<videoId>/hqdefault.jpg`.

Full example: [sample-output.json](sample-output.json) (first 5 videos of a tech channel).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/youtube-channel-videos@1" \
  --data-urlencode "target_url=https://www.youtube.com/@mkbhd/videos?hl=en&gl=US"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/youtube-channel-videos@1` on https://www.youtube.com/@veritasium/videos and give me the 10 most
> viewed of its recent videos as a table of title, views and publish date.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **About 120 videos per call:** the scraper scrolls the page three times. Older videos are not included;
  for exact numbers and dates of a video, use the [YouTube Video Scraper](../youtube-video-scraper/).
- **Rounded numbers:** YouTube's list shows rounded views and subscribers (`9.3M`), and only relative dates.
- **Regular videos only:** Shorts and live streams are on other tabs and not included.
- **No channel = failed request:** if the page has no channel data or no videos (a bot check, a wrong URL, a
  channel without videos), the call fails with HTTP 422 `required_fields_missing` and is still charged. Batches
  retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (JavaScript rendering, three scrolls, CSS + embedded JSON fields)
- [`sample-output.json`](sample-output.json): output on a real channel
