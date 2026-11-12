# LinkedIn Jobs Scraper (public job search)

Turn a public LinkedIn job search page into JSON, with no login and no LinkedIn account: for every job card its
job id, title, link, company, company page, location, posted date, benefit badge ("Actively Hiring", "Be an
early applicant") and company logo, plus the result count LinkedIn shows. Good for job market research, hiring
trend tracking and collecting job ids for the [LinkedIn Job Scraper](../linkedin-job-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/linkedin-jobs](https://extracthub.io/extractor/@extracthub1/linkedin-jobs)
**Extractor id:** `@extracthub1/linkedin-jobs@1` · **Price:** $0.0025 per page

## Input

A public LinkedIn job search page:

```
https://www.linkedin.com/jobs/search?keywords=<keywords>&location=<location>
```

e.g. `https://www.linkedin.com/jobs/search?keywords=python&location=United%20States`.

## Output

| Field | Type | Description |
|---|---|---|
| `jobs[]` | array | the job cards of the page, in page order (up to 60) |
| `jobs[].position` | number | position on the page (1 = first) |
| `jobs[].jobId` | string | LinkedIn job id, e.g. `4465379983` |
| `jobs[].title` | string | job title, e.g. `Senior Software Engineer - Python` |
| `jobs[].link` | string \| null | public job page, without tracking parameters, e.g. `https://www.linkedin.com/jobs/view/senior-software-engineer-python-at-venmo-4465379983` |
| `jobs[].company` | string \| null | e.g. `Venmo` |
| `jobs[].companyUrl` | string \| null | LinkedIn company page, e.g. `https://www.linkedin.com/company/venmo` |
| `jobs[].location` | string \| null | e.g. `Austin, TX`, `New York City Metropolitan Area` |
| `jobs[].postedDate` | string \| null | date the job was posted (`YYYY-MM-DD`), e.g. `2026-10-22` |
| `jobs[].postedText` | string \| null | as shown, e.g. `2 weeks ago` |
| `jobs[].benefit` | string \| null | badge on the card, e.g. `Actively Hiring`, `Be an early applicant`, `Actively Hiring +8 benefits` |
| `jobs[].companyLogo` | string \| null | company logo image (100 px) |
| `resultsCount` | string \| null | result count as LinkedIn shows it, e.g. `11,000+` |
| `searchTitle` | string \| null | e.g. `11,000+ Python Jobs in United States` |

Full example: [sample-output.json](sample-output.json) ("python" in the United States; shortened to 6 jobs).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/linkedin-jobs@1" \
  --data-urlencode "target_url=https://www.linkedin.com/jobs/search?keywords=python&location=United%20States"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/linkedin-jobs@1` on linkedin.com/jobs/search?keywords=data%20engineer&location=Texas and
> count the jobs per company, then list the 5 companies with the most openings and their locations.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Public page, no login:** this is the job search LinkedIn shows to visitors who are not signed in. It is a
  plain fetch through a US proxy; no browser is needed.
- **Up to 60 jobs per search:** the public page lists the first 60 results. A `start=` parameter is ignored
  (the same 60 come back); narrow the search with other keywords or a smaller location to see other jobs.
- **No salary on cards:** the public search cards carry no salary. The job page has it when the employer
  shows one (`salary` in the [LinkedIn Job Scraper](../linkedin-job-scraper/)).
- **Results change over time:** new postings move in and the order and result count change, like in a browser.
- **No jobs = failed request:** a page without job cards (a sign-in wall, a search with no results) fails with
  HTTP 422 `required_fields_missing` and is still charged. Batches retry it once.
- **No personal data:** only job and company data is extracted, no recruiter or member profiles.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real search page
