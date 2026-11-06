# GitHub Repository Scraper (repo page)

Turn a public GitHub repository page into JSON: owner, name, description, website, topics, stars, forks,
watchers, license, default branch, latest commit, commit / release / tag counts, open issues and pull requests,
creation date and flags (fork, archived, template). Good for open source tracking, dependency due diligence and
developer-tool market research. No GitHub token needed.

**Catalog:** [extracthub.io/extractor/@extracthub1/github-repo](https://extracthub.io/extractor/@extracthub1/github-repo)
**Extractor id:** `@extracthub1/github-repo@1` · **Price:** $0.0025 per repository

## Input

A repository home page:

```
https://github.com/<owner>/<repo>
```

e.g. `https://github.com/microsoft/vscode`. Renamed or moved repositories are followed to their new address.

## Output

| Field | Type | Description |
|---|---|---|
| `fullName` | string | `owner/repo`, e.g. `microsoft/vscode` (the current name after a redirect) |
| `owner` | string \| null | owner login |
| `name` | string \| null | repository name |
| `repoId` | number \| null | GitHub's numeric repository id |
| `description` | string \| null | the About text |
| `website` | string \| null | the website in About |
| `topics` | string[] | topics, e.g. `editor`, `typescript`; empty when none |
| `stars` | number \| null | exact star count |
| `forks` | number \| null | exact fork count |
| `watchers` | number \| null | exact watcher count |
| `license` | string \| null | license name, e.g. `MIT License` (`Other` for custom licenses) |
| `licenseSpdx` | string \| null | SPDX id, e.g. `MIT`, `Apache-2.0` (`NOASSERTION` for custom licenses) |
| `defaultBranch` | string \| null | e.g. `main` |
| `latestCommitSha` | string \| null | SHA of the latest commit on the default branch |
| `commitCount` | number \| null | commits on the default branch |
| `releaseCount` | number \| null | number of releases |
| `tagCount` | number \| null | number of tags |
| `openIssues` | number \| null | open issues as GitHub rounds it (`5k+` → `5000`); `null` when there are none or issues are off |
| `openPullRequests` | number \| null | open pull requests, rounded the same way; `null` when there are none |
| `createdAt` | string \| null | creation time (ISO 8601) |
| `isFork` | boolean \| null | the repository is a fork |
| `isArchived` | boolean \| null | the repository is archived (read-only) |
| `isTemplate` | boolean \| null | the repository is a template |
| `isOrg` | boolean \| null | the owner is an organization |
| `ownerAvatar` | string \| null | owner avatar URL |

Full example: [sample-output.json](sample-output.json) (microsoft/vscode).

## Quick start

```bash
curl -G "https://api.extracthub.io/api/extractor/extract" \
  -H "Authorization: Bearer $EXTRACTHUB_API_KEY" \
  --data-urlencode "extractor_id=@extracthub1/github-repo@1" \
  --data-urlencode "target_url=https://github.com/microsoft/vscode"
```

With an AI agent (ExtractHub MCP connected):
> Use `@extracthub1/github-repo@1` on github.com/fastapi/fastapi, github.com/pallets/flask and
> github.com/django/django and compare stars, forks, open issues, license and last commit in a table.

More: [REST API guide](../../docs/api.md) · [AI agent guide](../../docs/ai-agents.md)

## Good to know

- **Public repositories only.** A private or missing repository answers HTTP 404 and the call fails with
  `target_error` (charged, as the page was fetched).
- **Not included:** README text, languages, contributors and the latest release, which GitHub loads after the
  page.
- **Issue and pull request counts are rounded** by GitHub above 1,000 (`3.1k` → `3100`).

## Versions

- **1.0.1:** fetches through the scraping proxy for more reliable results. Output unchanged.
- **1.0.0:** first release.

## Files

- [`extractor.json`](extractor.json): the extractor definition (plain fetch through a proxy; embedded page JSON + CSS fields)
- [`sample-output.json`](sample-output.json): output on a real repository
