# Indeed Job Scraper (job page)

Turn an Indeed.com job page into JSON: job key, title, company, company rating and reviews count, location,
job type, salary as shown plus min / max / period / currency, how long ago it was posted, and the full job
description as plain text and as Markdown. Good for salary research, job market analysis and enriching job
lists. Get job keys from the [Indeed Jobs Scraper](../indeed-jobs-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/indeed-job](https://extracthub.io/extractor/@extracthub1/indeed-job)
**Extractor id:** `@extracthub1/indeed-job@1` · **Price:** $0.0035 per page

## Input

An Indeed.com job page:

```
https://www.indeed.com/viewjob?jk=<jobKey>
```

e.g. `https://www.indeed.com/viewjob?jk=40a14417050bd353`.

## Output

| Field | Type | Description |
|---|---|---|
| `jobKey` | string | Indeed job key, e.g. `40a14417050bd353` |
| `title` | string | job title, e.g. `Reporting Analyst` |
| `url` | string \| null | canonical job page |
| `company` | string \| null | e.g. `Joseph & Associates` |
| `companyRating` | number \| null | company rating on Indeed (1 to 5), e.g. `4.5` |
| `companyReviewsCount` | number \| null | number of company reviews on Indeed |
| `location` | string \| null | e.g. `Remote`, `Chicago, IL 60603` |
| `jobType` | string \| null | e.g. `Full-time`, `Part-time`, `Contract` |
| `salary` | string \| null | salary as shown, e.g. `$90,000 a year`, `From $20 an hour` |
| `salaryMin` | number \| null | lower end, e.g. `90000` |
| `salaryMax` | number \| null | upper end; `-1` when Indeed has no upper end (`From $20 an hour`) |
| `salaryPeriod` | string \| null | `YEARLY`, `MONTHLY`, `WEEKLY`, `DAILY` or `HOURLY` |
| `salaryCurrency` | string \| null | e.g. `USD` |
| `posted` | string \| null | how long ago the job was posted, e.g. `10 days ago`, `30+ days ago` |
| `description` | string | full job description, plain text |
| `descriptionMarkdown` | string \| null | the same description as Markdown (headings, lists, bold) |

Full example: [sample-output.json](sample-output.json) (Reporting Analyst at Joseph & Associates, Remote).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/indeed-job@1" \
  --data-urlencode "target_url=https://www.indeed.com/viewjob?jk=40a14417050bd353"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/indeed-jobs@1` on indeed.com/jobs?q=data+analyst&l=Remote, then `@extracthub1/indeed-job@1`
> on the first 10 job keys (https://www.indeed.com/viewjob?jk=...), and list title, company, salary range and
> the required years of experience from each description.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Browser rendering:** Indeed answers a plain fetch of a job page with HTTP 401, so this extractor renders
  the page in a browser (JavaScript tier, $0.0035). Pages take longer than a plain fetch; batches are the
  better fit for many jobs.
- **Expired or removed jobs:** a job page without a title or description (an expired job, a bot check) fails
  with HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **Salary numbers:** `salaryMin` / `salaryMax` / `salaryPeriod` are Indeed's own parsing of the salary, also
  when the employer wrote it only in the description. `salaryMax` is `-1` for open-ended salaries ("From ...").
- **Contact details in descriptions:** some employers write a recruiting e-mail or phone number into the
  description; it is returned as part of the text.
- **Not included:** the apply link (Indeed opens it through a sign-in flow) and benefits lists.
- **US results:** fetched through a US proxy from indeed.com.

## Files

- [`extractor.json`](extractor.json): the extractor definition (browser rendering through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real job page
