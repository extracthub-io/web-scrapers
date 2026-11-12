# Indeed Jobs Scraper (job search results)

Turn an Indeed.com job search page into JSON: for every job card on the page its job key, title, link,
company, location, salary, tags (job type, schedule, benefits), snippet and whether it is sponsored, plus the
total number of jobs Indeed reports and the next page link. Good for job market research, salary benchmarks
and collecting job keys for the [Indeed Job Scraper](../indeed-job-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/indeed-jobs](https://extracthub.io/extractor/@extracthub1/indeed-jobs)
**Extractor id:** `@extracthub1/indeed-jobs@1` · **Price:** $0.0025 per page

## Input

An Indeed.com job search page:

```
https://www.indeed.com/jobs?q=<keywords>&l=<location>
https://www.indeed.com/jobs?q=<keywords>&l=<location>&start=10
```

e.g. `https://www.indeed.com/jobs?q=data+analyst&l=Remote`.

## Output

| Field | Type | Description |
|---|---|---|
| `jobs[]` | array | the job cards of the page, in page order (about 40 to 50: the main results and the grouped carousels) |
| `jobs[].position` | number | position on the page (1 = first) |
| `jobs[].jobKey` | string | Indeed job key, e.g. `40a14417050bd353`; the job page is `https://www.indeed.com/viewjob?jk=<jobKey>` |
| `jobs[].title` | string | job title |
| `jobs[].link` | string \| null | Indeed's click link to the job (`/rc/clk?jk=...` or `/pagead/clk?...` for sponsored jobs); `null` on carousel cards that have no link |
| `jobs[].company` | string \| null | e.g. `Lockheed Martin` |
| `jobs[].location` | string \| null | e.g. `Remote`, `Remote in Chicago, IL 60606` (main results only, `null` on carousel cards) |
| `jobs[].salary` | string \| null | salary as shown, e.g. `$90,000 a year`, `$60 - $70 an hour` |
| `jobs[].attributes[]` | string[] | tags shown on the card, salary first, e.g. `["$100,000 - $125,000 a year", "Full-time", "Profit sharing"]` |
| `jobs[].snippet` | string \| null | short extract of the job description (main results only) |
| `jobs[].sponsored` | boolean | `true` for sponsored jobs |
| `totalJobs` | number \| null | number of jobs Indeed reports for the search, e.g. `4416` |
| `nextPageUrl` | string \| null | the next results page, `null` on the last page |

Full example: [sample-output.json](sample-output.json) ("data analyst" in Remote; shortened to 6 jobs).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/indeed-jobs@1" \
  --data-urlencode "target_url=https://www.indeed.com/jobs?q=data+analyst&l=Remote"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/indeed-jobs@1` on the first 3 pages of indeed.com/jobs?q=nurse&l=Chicago%2C+IL and make a
> table of the non-sponsored jobs with company, location and salary, sorted by salary.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Plain fetch:** the job cards are in the HTML Indeed sends, so no browser is needed.
- **Two kinds of cards:** the main results (about 15 per page) have a link, location and snippet. The grouped
  carousels below them ("Data science positions", ...) are mostly sponsored, show only title, company and tags,
  and often have no link. Use `jobKey` to open any job: `https://www.indeed.com/viewjob?jk=<jobKey>`, or the
  [Indeed Job Scraper](../indeed-job-scraper/) for the full description and salary range.
- **Hidden cards are skipped:** Indeed puts invisible decoy cards (`aria-hidden`) into the page; they are not
  returned.
- **No posted date:** search cards carry no date in the HTML. The job page has it (`posted` in the Indeed Job
  Scraper).
- **Results vary per request:** the order of results, the carousels and the sponsored jobs change between
  requests, like in a browser. `totalJobs` changes too.
- **Paging:** `nextPageUrl` adds `&start=10`, `&start=20`, ...; Indeed shows a limited number of pages per
  search.
- **No jobs = failed request:** a page without job cards (a bot check, a search with no results) fails with
  HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **US results:** fetched through a US proxy from indeed.com.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page
