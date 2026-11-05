# Use the scrapers with the REST API

Every scraper in this repository is a published [ExtractHub](https://extracthub.io) extractor. You call it
with a URL and get structured JSON back. ExtractHub fetches the page (through its scraping proxy when the
scraper needs one), runs the extractor and returns the data. You don't run a browser or manage proxies.

## 1. Get an API key

1. Sign up at [extracthub.io](https://extracthub.io).
2. Dashboard → **API keys** → create a key.
   - `exth_test_...` keys are free and return simulated data (good for wiring up your code).
   - Live keys fetch the real page and are billed per successful call (price per scraper in the
     [table](../README.md#scrapers)).
3. Keep the key out of your code and out of git: use an environment variable.

```bash
export EXTRACTHUB_API_KEY=exth_your_key
```

## 2. Pick the extractor id

Each scraper has an id like `@extracthub1/google-serp`. Always call it with a **version pin**:

| Pin | Meaning |
|---|---|
| `@extracthub1/google-serp@1` | latest 1.x version: gets fixes, never breaking changes (recommended) |
| `@extracthub1/google-serp@1.0.0` | exactly this version |

## 3. Call it

`GET https://api.extracthub.io/api/extractor/extract?extractor_id=<pinned id>&target_url=<page URL>`
with the header `X-API-Key: <your key>`. URL-encode both parameters.

### curl

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "X-API-Key: $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/google-serp@1" \
  --data-urlencode "target_url=https://www.google.com/search?q=web+scraper&hl=en&gl=us"
```

### JavaScript / Node.js (18+)

```js
const params = new URLSearchParams({
  extractor_id: "@extracthub1/youtube-video@1",
  target_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
});
const res = await fetch(`https://api.extracthub.io/api/extractor/extract?${params}`, {
  headers: { "X-API-Key": process.env.EXTRACTHUB_API_KEY },
});
const body = await res.json();
if (!body.success) throw new Error(JSON.stringify(body));
console.log(body.result.extracted.title, body.result.extracted.viewCount);
```

### Python

```python
import os, requests

r = requests.get(
    "https://api.extracthub.io/api/extractor/extract",
    params={
        "extractor_id": "@extracthub1/quotes-toscrape-list@1",
        "target_url": "https://quotes.toscrape.com/",
    },
    headers={"X-API-Key": os.environ["EXTRACTHUB_API_KEY"]},
    timeout=120,
)
r.raise_for_status()
data = r.json()["result"]["extracted"]
for q in data["quotes"]:
    print(q["author"], "-", q["text"][:60])
```

## 4. The response

```json
{
  "success": true,
  "result": {
    "extracted": { "...": "the fields listed in each scraper's README" },
    "metadata": {
      "useProxy": true,
      "renderJs": false,
      "url": "https://...",
      "scrapedAt": "2026-11-05T03:10:37.606Z",
      "provider": "zyte"
    }
  }
}
```

- `result.extracted` holds the scraper's fields. Each scraper folder has a `sample-output.json`.
- A field that isn't on the page is `null` (or an empty array for lists).

## 5. Pagination

List scrapers return `nextPageUrl`. Loop until it is `null`:

```python
url, pages = "https://quotes.toscrape.com/", []
while url and len(pages) < 10:
    r = requests.get("https://api.extracthub.io/api/extractor/extract",
                     params={"extractor_id": "@extracthub1/quotes-toscrape-list@1", "target_url": url},
                     headers={"X-API-Key": os.environ["EXTRACTHUB_API_KEY"]}, timeout=120)
    data = r.json()["result"]["extracted"]
    pages.append(data)
    url = data.get("nextPageUrl")
```

## 6. Many URLs

For hundreds or thousands of URLs, use a **batch** instead of a loop of single calls: it runs in the
background and you read the results when they are ready. The simplest way to start one is from an AI agent
with the ExtractHub MCP server (`create_batch`, see [ai-agents.md](ai-agents.md)). Results can be read with
the REST API:

```bash
# progress
curl -H "X-API-Key: $EXTRACTHUB_API_KEY" https://api.extracthub.io/api/extractor/batch/<batch_id>
# results: NDJSON, one line per URL
curl -H "X-API-Key: $EXTRACTHUB_API_KEY" https://api.extracthub.io/api/extractor/batch/<batch_id>/results
```

## Errors and billing

| Situation | What you get |
|---|---|
| Bad / unpinned extractor id, bad URL | HTTP 400 `validation_error` |
| Target page answered non-200 (blocked, 404) | HTTP 502 `target_error` |
| Fetch failed / timed out at the provider | HTTP 502 / 504, retry later |
| Busy | the call becomes an async job (status `queued` + `job_id`) |
| Not enough credit | HTTP 402 |

You pay per call. Failures before any page was fetched are free; a call that fails after the provider fetched
the page (error or block page) may still be charged. Each scraper's catalog page on extracthub.io shows the
current price and example calls.
