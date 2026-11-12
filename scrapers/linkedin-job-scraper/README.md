# LinkedIn Job Scraper (public job page)

Turn a public LinkedIn job page into JSON, with no login and no LinkedIn account: job id, title, company,
company page and logo, location (also as city, region and country), posted date and age, expiry date,
applicant count, salary when the employer shows one, employment type, seniority level, industry, required
experience and education, and the full job description as text. Good for salary research, job market analysis
and enriching job lists. Get job links from the [LinkedIn Jobs Scraper](../linkedin-jobs-scraper/).

**Catalog:** [extracthub.io/extractor/@extracthub1/linkedin-job](https://extracthub.io/extractor/@extracthub1/linkedin-job)
**Extractor id:** `@extracthub1/linkedin-job@1` · **Price:** $0.0025 per page

## Input

A public LinkedIn job page:

```
https://www.linkedin.com/jobs/view/<title-slug>-at-<company-slug>-<jobId>
https://www.linkedin.com/jobs/view/<jobId>
```

e.g. `https://www.linkedin.com/jobs/view/lead-python-software-engineer-at-archer-4481685585`.

## Output

| Field | Type | Description |
|---|---|---|
| `jobId` | string | LinkedIn job id, e.g. `4481685585` |
| `title` | string | job title, e.g. `Lead Python Software Engineer` |
| `url` | string \| null | canonical job page |
| `company` | string \| null | e.g. `Archer` |
| `companyUrl` | string \| null | LinkedIn company page |
| `companyLogo` | string \| null | company logo image (200 px) |
| `location` | string \| null | as shown, e.g. `Arlington, VA` |
| `city` / `region` / `country` | string \| null | e.g. `Arlington`, `VA`, `US` |
| `datePosted` | string \| null | ISO date-time the job was posted, e.g. `2026-10-23T13:04:37.000Z` |
| `validThrough` | string \| null | ISO date-time the posting expires |
| `postedText` | string \| null | as shown, e.g. `2 weeks ago` |
| `applicants` | string \| null | as shown, e.g. `Over 200 applicants`, `Be among the first 25 applicants` |
| `salary` | string \| null | salary range when the employer shows one, e.g. `$139,400.00/yr - $190,000.00/yr` |
| `employmentType` | string \| null | e.g. `FULL_TIME`, `PART_TIME`, `CONTRACTOR` |
| `criteria[]` | array | the job criteria box: `{ name, value }`, e.g. `Seniority level` = `Mid-Senior level`, `Employment type`, `Job function`, `Industries` |
| `industry` | string \| null | e.g. `Artificial Intelligence` |
| `experienceMonths` | number \| null | required experience in months, e.g. `72` |
| `education` | string \| null | required education, e.g. `bachelor degree` |
| `description` | string \| null | full job description, plain text with line breaks |

Full example: [sample-output.json](sample-output.json) (Lead Python Software Engineer at Archer, Arlington, VA;
description shortened).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/linkedin-job@1" \
  --data-urlencode "target_url=https://www.linkedin.com/jobs/view/lead-python-software-engineer-at-archer-4481685585"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/linkedin-jobs@1` on linkedin.com/jobs/search?keywords=python&location=United%20States, then
> `@extracthub1/linkedin-job@1` on the first 10 job links, and make a table of title, company, salary, seniority
> level and required years of experience.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Public page, no login:** this is the job page LinkedIn shows to visitors who are not signed in. It is a
  plain fetch through a US proxy; most fields come from the page's schema.org `JobPosting` data.
- **Salary only when shown:** `salary` is `null` when the employer does not publish a range on LinkedIn (the
  description sometimes still mentions pay).
- **Criteria vary:** the criteria box usually has seniority level, employment type, job function and industries,
  but LinkedIn leaves out the ones it does not know; read them by `name`.
- **Expired or removed jobs:** a page without a job id or title (a removed job, a sign-in wall) fails with HTTP
  422 `required_fields_missing` and is still charged. Batches retry it once.
- **No personal data:** recruiter / hiring team profiles are not extracted. Some employers write a contact
  e-mail or phone number into the description; it is returned as part of the text.
- **Not included:** the apply link (LinkedIn opens it through a sign-in flow or the employer's site).

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a US proxy)
- [`sample-output.json`](sample-output.json): output on a real job page
