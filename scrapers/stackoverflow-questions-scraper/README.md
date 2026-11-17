# Stack Overflow Questions Scraper (questions by tag)

Turn a Stack Overflow tag page (stackoverflow.com/questions/tagged/...) into JSON: 15 questions per page with
question id, title, link, score, answers count, accepted answer, views, comments count, asked date, excerpt and
tags, the user shown on each card (name, profile link, reputation, action date), plus the total questions count
of the tag and the next page link. Works on every sort tab (Newest, Active, Bountied, Unanswered, Score) and every
page. Good for developer trend research, tracking questions about your library or API, support monitoring and
building Q&A datasets.

**Catalog:** [extracthub.io/extractor/@extracthub1/stackoverflow-questions](https://extracthub.io/extractor/@extracthub1/stackoverflow-questions)
**Extractor id:** `@extracthub1/stackoverflow-questions@1` · **Price:** $0.0025 per page

## Input

A Stack Overflow tag page, with the sort tab and page you want:

```
https://stackoverflow.com/questions/tagged/<tag>?tab=<newest|active|bounties|unanswered|votes>&page=<n>
```

e.g. `https://stackoverflow.com/questions/tagged/web-scraping?tab=newest`.

## Output

| Field | Type | Description |
|---|---|---|
| `heading` | string \| null | the list heading, e.g. `Newest 'web-scraping' Questions` |
| `totalQuestions` | number \| null | questions with this tag, e.g. `51616` |
| `questions[]` | array | the questions of the page, in page order (15 per page) |
| `questions[].position` | number | 1-based position on the page |
| `questions[].id` | number | question id, e.g. `80009348` |
| `questions[].title` | string | e.g. `How do I solve an error with a Python scraping program` |
| `questions[].url` | string \| null | question link |
| `questions[].score` | number \| null | votes, e.g. `-4` |
| `questions[].answerCount` | number \| null | e.g. `2` |
| `questions[].hasAcceptedAnswer` | boolean | an answer is accepted |
| `questions[].views` | number \| null | views as shown; large counts are rounded by the page (`1.3m` → `1300000`) |
| `questions[].commentCount` | number \| null | comments on the question (`null` when the card has none) |
| `questions[].askedAt` | string \| null | asked date (UTC), e.g. `2026-10-12 00:09:34Z` |
| `questions[].excerpt` | string \| null | the start of the question text, as shown on the card |
| `questions[].tags` | string[] | e.g. `["python", "web-scraping"]` |
| `questions[].userName` | string \| null | the user shown on the card (see Good to know) |
| `questions[].userUrl` | string \| null | that user's profile link |
| `questions[].userReputation` | number \| null | that user's reputation, e.g. `196` |
| `questions[].userActionAt` | string \| null | date of that user's action (asked, answered or modified) |
| `nextPageUrl` | string \| null | next page of the list, e.g. `...?tab=newest&page=2&pagesize=15` (`null` on the last page) |

Full example: [sample-output.json](sample-output.json) (the web-scraping Newest page above; shortened to 3
questions, user names shortened to initials).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/stackoverflow-questions@1" \
  --data-urlencode "target_url=https://stackoverflow.com/questions/tagged/web-scraping?tab=newest"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/stackoverflow-questions@1` on the first 3 pages of
> https://stackoverflow.com/questions/tagged/web-scraping?tab=newest and list the unanswered questions with their
> title, score, views and link.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything is in the page HTML (schema.org microdata on each card), fetched through a US proxy
  without a browser.
- **Always pass `tab=`:** without it, Stack Overflow picks the sort per visitor (one test returned Newest, the next
  Active, then Score). Add `?tab=newest` (or `active`, `votes`, ...) to get a stable order.
- **The user on the card:** on Newest, Score and Unanswered it is the asker (`userActionAt` = `askedAt`). On the
  Active tab it is the user of the latest activity (an editor or answerer), so `userActionAt` is the activity date.
  Community wiki cards have no user (`null`).
- **Page size:** 15 questions per page (the `nextPageUrl` keeps `pagesize=15`); other page sizes were not tested.
- **Full question and answers:** use the [Stack Overflow Question Scraper](../stackoverflow-question-scraper/) on
  each `questions[].url`.
- **Bot checks:** a page without questions fails with HTTP 422 `required_fields_missing` and is still charged.
  Batches retry it once.
- **Other Stack Exchange sites** (superuser.com, serverfault.com, ...) use the same markup but were not tested.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real tag page (shortened)
