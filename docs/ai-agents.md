# Use the scrapers with an AI agent

AI agents (Claude Code, Claude Desktop, Cursor and any MCP client) can run these scrapers directly through
the **ExtractHub MCP server**. You ask in plain language ("get the top Google results for *web scraper*"),
and the agent calls the scraper and works with the JSON.

## 1. Connect the ExtractHub MCP server

Server: `https://api.extracthub.io/mcp` (Streamable HTTP), header `Authorization: Bearer <your API key>`
(or `X-API-Key: <key>`). Get a key in the ExtractHub dashboard → **API keys**.

### Claude Code

One command:

```bash
claude mcp add --transport http extracthub https://api.extracthub.io/mcp \
  --header "Authorization: Bearer YOUR_EXTRACTHUB_API_KEY"
```

Or per project, keeping the key out of git (this is how this repository is set up):

```jsonc
// .claude/settings.local.json  (git-ignored)
{ "env": { "EXTRACTHUB_API_KEY": "YOUR_EXTRACTHUB_API_KEY" }, "enabledMcpjsonServers": ["extracthub"] }
```

```jsonc
// .mcp.json  (committed, no secret in it)
{ "mcpServers": { "extracthub": { "type": "http", "url": "https://api.extracthub.io/mcp",
  "headers": { "Authorization": "Bearer ${EXTRACTHUB_API_KEY}" } } } }
```

Restart Claude Code; `/mcp` should list `extracthub` as connected.

### Claude Desktop

`claude_desktop_config.json`, through the `mcp-remote` bridge:

```json
{
  "mcpServers": {
    "extracthub": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://api.extracthub.io/mcp", "--header", "Authorization:${EXTRACTHUB_AUTH}"],
      "env": { "EXTRACTHUB_AUTH": "Bearer YOUR_EXTRACTHUB_API_KEY" }
    }
  }
}
```

### Other MCP clients (Cursor, Windsurf, VS Code, ...)

Add a remote / HTTP MCP server with URL `https://api.extracthub.io/mcp` and the header above. The server does
not offer OAuth yet, so clients that only support OAuth connectors can't connect; use the
[REST API](api.md) there.

More: [extracthub.io/mcp](https://extracthub.io/mcp)

## 2. Ask for data

Name the scraper (or just the site) and the URL. Example prompts:

- *"Use `@extracthub1/google-serp@1` to get the organic results for `best web scraper` (US, English) and make a
  table of title, source and snippet."*
- *"Get the views, likes and publish date of these YouTube videos with `@extracthub1/youtube-video@1`: …"*
- *"Scrape all pages of quotes.toscrape.com with `@extracthub1/quotes-toscrape-list@1` and count quotes per
  author."*
- *"Is there an ExtractHub scraper for Google search? Show me its fields and price."* (the agent uses
  `search_extractors` / `get_extractor`)

What the agent does with the MCP tools:

| Tool | Use |
|---|---|
| `search_extractors` | find a scraper for a site or kind of data |
| `get_extractor` | versions, output fields, sample output, price |
| `extract` | one URL, realtime |
| `create_batch` → `get_batch` / `get_batch_results` | many URLs in the background |
| `get_account` | balance and prices (check before big jobs) |

Agents should always use a pinned id (`@extracthub1/<slug>@1`). Live calls are billed, so a good agent
checks the price first and asks before large batches.

## 3. Build your own scraper with an agent

Need a site that isn't here? Install the
[ExtractHub extractor builder skill](https://github.com/extracthub-io/extracthub-extractor-builder). Every
scraper in this repository was built with it. The agent then inspects the page, picks the cheapest fetch
mode, writes the extractor, validates it on the real page, uploads it as a private draft, tests it and
releases it when you agree.

```bash
# Claude Code: personal skills (all projects)
git clone https://github.com/extracthub-io/extracthub-extractor-builder.git ~/.claude/skills/extracthub-extractor-builder
```

Then ask, for example: *"Create an ExtractHub extractor for this shop's product pages: name, price, stock,
images. Example: https://…"*

To start from one of the definitions in this repository, give the agent the folder's `extractor.json`
(*"Use scrapers/youtube-video-scraper/extractor.json as a base, add the comment count"*).
