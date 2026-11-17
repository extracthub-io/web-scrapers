# Stack Overflow Question Scraper (question + answers)

Turn a Stack Overflow question page into JSON: question id, title, link, score, views, asked and modified dates,
tags, the full question body (text and HTML with code blocks), author (name, profile link, reputation), community
wiki flag, comments and answers counts, and every answer on the page (up to 30) with id, score, accepted flag,
date, body text and HTML, author and community wiki flag, plus the link to the next answers page. Good for RAG and
coding-assistant datasets, documentation research, support analytics and tracking answers to your own questions.

**Catalog:** [extracthub.io/extractor/@extracthub1/stackoverflow-question](https://extracthub.io/extractor/@extracthub1/stackoverflow-question)
**Extractor id:** `@extracthub1/stackoverflow-question@1` · **Price:** $0.0025 per page

## Input

A Stack Overflow question page:

```
https://stackoverflow.com/questions/<question-id>/<slug>
```

e.g. `https://stackoverflow.com/questions/11227809/why-is-conditional-processing-of-a-sorted-array-faster-than-of-an-unsorted-array`.

## Output

| Field | Type | Description |
|---|---|---|
| `id` | number | question id, e.g. `11227809` |
| `title` | string | e.g. `Why is conditional processing of a sorted array faster than of an unsorted array?` (closed questions end in `[closed]`) |
| `url` | string \| null | canonical question link |
| `score` | number \| null | votes, e.g. `27549` |
| `viewCount` | number \| null | exact views, e.g. `2028896` |
| `askedAt` | string \| null | asked date (UTC), e.g. `2012-06-27 13:51:36Z` |
| `modifiedAt` | string \| null | last activity date (UTC) |
| `tags` | string[] | e.g. `["java", "c++", "performance", "cpu-architecture", "branch-prediction"]` |
| `body` | string \| null | question text (code included, whitespace collapsed) |
| `bodyHtml` | string \| null | question HTML (paragraphs, `<pre><code>` blocks, links, images) |
| `authorName` | string \| null | asker's display name (`null` on community wiki posts) |
| `authorUrl` | string \| null | asker's profile link |
| `authorReputation` | number \| null | asker's reputation; above 10,000 rounded as shown (`507k` → `507000`) |
| `isCommunityWiki` | boolean | the question is community wiki |
| `commentCount` | number \| null | comments on the question, e.g. `14` |
| `answerCount` | number \| null | all answers, e.g. `25` |
| `answers[]` | array | answers on this page, in the page's order (highest score first, up to 30) |
| `answers[].position` | number | 1-based order on the page |
| `answers[].id` | number | answer id, e.g. `11227902` |
| `answers[].score` | number \| null | e.g. `35296` |
| `answers[].isAccepted` | boolean | the accepted answer |
| `answers[].answeredAt` | string \| null | answer date (UTC) |
| `answers[].body` | string \| null | answer text |
| `answers[].bodyHtml` | string \| null | answer HTML |
| `answers[].authorName` | string \| null | answerer's display name (`null` on community wiki answers) |
| `answers[].authorUrl` | string \| null | answerer's profile link (`null` for deleted users) |
| `answers[].authorReputation` | number \| null | answerer's reputation (rounded above 10,000) |
| `answers[].isCommunityWiki` | boolean | the answer is community wiki |
| `nextAnswersPageUrl` | string \| null | next page of answers when the question has more than 30, else `null` |

Full example: [sample-output.json](sample-output.json) (the sorted-array question above; shortened to 3 answers and
short bodies, user names shortened to initials).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/stackoverflow-question@1" \
  --data-urlencode "target_url=https://stackoverflow.com/questions/11227809/why-is-conditional-processing-of-a-sorted-array-faster-than-of-an-unsorted-array"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/stackoverflow-question@1` on
> https://stackoverflow.com/questions/11227809/why-is-conditional-processing-of-a-sorted-array-faster-than-of-an-unsorted-array
> and summarize the accepted answer and the two highest-scored other answers.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** everything is in the page HTML, fetched through a US proxy without a browser.
- **Answers per page:** Stack Overflow shows 30 answers per page, sorted by score. For questions with more (the
  git undo question has 105), follow `nextAnswersPageUrl`, or add `?answertab=createdasc` etc. to the URL for
  another order.
- **Closed and duplicate questions:** the notice ("Closed. This question is seeking recommendations ...") is part
  of the question body on the page, so it is at the start of `body` / `bodyHtml`.
- **Comments:** only the counts are extracted, not the comment texts.
- **Reputation:** exact below 10,000; above it the page only shows a rounded value (`69.7k`), returned as `69700`.
- **Licence:** Stack Overflow content is CC BY-SA. Keep the attribution (link and author) when you republish it.
- **Bot checks / removed questions:** a page without id or title fails with HTTP 422 `required_fields_missing` and
  is still charged. Batches retry it once.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real question page (shortened)
