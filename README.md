# seodraft agents

Ready-made agent templates and plugins that connect to [seodraft](https://seodraft.app), the SEO agent that writes without AI slop.

[Español](README.es.md)

## What is seodraft?

[seodraft](https://seodraft.app) is an SEO agent delivered as a remote MCP server at `https://seodraft.app/mcp`. You connect it to the AI you already use (Claude, ChatGPT, Cursor, Grok Bot, or any MCP client) and it runs a full blog workflow:

- **Topics with measured search volume**, pulled from your own [DataForSEO](https://seodraft.app/features/dataforseo) account, not guessed.
- **SERP briefs** that summarize intent and what the current top results cover before anything gets written. See [content briefs](https://seodraft.app/features/content-brief).
- **Drafts from evidence you supply.** The agent cites facts you accepted, or the draft doesn't pass. See [E-E-A-T evidence](https://seodraft.app/features/eeat-evidence).
- **Quality checks against AI slop:** no filler, correct keyword placement, and no [keyword cannibalization](https://seodraft.app/features/keyword-cannibalization) with your existing posts.
- **Delivery of approved drafts only**, as Markdown, HTML, or a git draft in your repository. There is no publish tool.

The server has 38 tools and uses OAuth (Clerk) with dynamic client registration and PKCE, so there's no API key or client ID to paste. Details: [seodraft MCP server](https://seodraft.app/features/mcp-server).

### Why "without AI slop"?

Most AI-written posts read the same: a generic intro, padded paragraphs, invented numbers. seodraft runs every draft through rules that flag those patterns, and it won't use a statistic or quote you didn't provide. You can try the same checks for free on any text with the [AI slop checker](https://seodraft.app/tools/ai-slop), and see which AI crawlers your site lets in with the [AI crawler checker](https://seodraft.app/tools/ai-crawlers).

## What's in this repo

| Path | What it is |
| --- | --- |
| [`.cursor-plugin/`](.cursor-plugin), [`mcp.json`](mcp.json), [`skills/`](skills), [`rules/`](rules) | A Cursor plugin: the seodraft MCP server plus two skills and an editorial rule |
| [`eve/`](eve) | An [eve](https://eve.dev) agent template (Vercel's agent framework) with a Deploy button |
| [`grok-bot/`](grok-bot) | A link to the ready-made Grok Bot template |
| [`.mcp.json`](.mcp.json) | Project MCP config for Claude Code and other clients that read `.mcp.json` |

This repository contains only configuration, prompts, and docs. seodraft itself is a hosted, closed-source service.

## Connect seodraft

You need a seodraft account first. The 7-day trial at [seodraft.app](https://seodraft.app) needs no card.

The server URL is the same everywhere:

```text
https://seodraft.app/mcp
```

### Claude

- **claude.ai / Claude Desktop:** Settings → Connectors → Add custom connector. Paste `https://seodraft.app/mcp` and sign in to seodraft when prompted.
- **Claude Code:**

  ```bash
  claude mcp add --transport http seodraft https://seodraft.app/mcp
  ```

  Then run `/mcp` inside Claude Code to finish the sign-in.

### ChatGPT

Turn on developer mode (Settings → Apps → Advanced settings; OpenAI has moved this toggle during 2026, so it may be under Settings → Security and login). Then create an app or connector, paste `https://seodraft.app/mcp` as the MCP server URL, choose OAuth, and sign in to seodraft. On Business and Enterprise workspaces an admin has to allow developer mode first.

### Cursor

One click:

[![Add seodraft to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=seodraft&config=eyJ1cmwiOiJodHRwczovL3Nlb2RyYWZ0LmFwcC9tY3AifQ%3D%3D)

Or add it to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project):

```json
{
  "mcpServers": {
    "seodraft": {
      "url": "https://seodraft.app/mcp"
    }
  }
}
```

To get the skills and the editorial rule too, install this repository as a Cursor plugin. For local testing, copy it into `~/.cursor/plugins/local/seodraft` and run **Developer: Reload Window**.

### Grok Bot

Start from the ready-made template: https://x.ai/bot/OkT4Dbjy4xVf7oVBCr8hL. It includes the content desk skills and walks you through connecting seodraft. More in [`grok-bot/`](grok-bot).

### eve (Vercel)

The [`eve/`](eve) folder is a complete eve agent with a user-scoped OAuth connection to seodraft through Vercel Connect, the content desk skills, and approval gates on delivery. See [`eve/README.md`](eve/README.md) for setup and the Deploy button.

### Other MCP clients

Any client that speaks Streamable HTTP and OAuth can connect. Point it at `https://seodraft.app/mcp`; discovery, client registration, and PKCE all start from that URL.

- **VS Code** (`.vscode/mcp.json`):

  ```json
  {
    "servers": {
      "seodraft": { "type": "http", "url": "https://seodraft.app/mcp" }
    }
  }
  ```

- **Codex CLI:**

  ```bash
  codex mcp add seodraft --url https://seodraft.app/mcp
  ```

seodraft is also listed in the official MCP registry as `app.seodraft/seodraft` and on [Smithery](https://smithery.ai/servers/jorge-5rsf/seodraft).

## Skills

The skills in [`skills/`](skills) follow the Agent Skills `SKILL.md` format, so they work in Cursor, eve, Grok Bot, and other clients that load skills:

- [`getting-started-seodraft`](skills/getting-started-seodraft/SKILL.md): connect seodraft and set up the site profile, one question at a time.
- [`seodraft-content-desk`](skills/seodraft-content-desk/SKILL.md): profile → topics → research → evidence → draft → quality gate → review → delivery, with explicit approval before anything is delivered.

## Pricing

seodraft costs **$5/month or $50/year**, after a **7-day free trial with no card**. The writing runs on the AI subscription you already pay for. The only other cost is your own DataForSEO usage, and seodraft shows the estimated cost before each paid call. See [pricing](https://seodraft.app/pricing).

## License

[MIT](LICENSE). The license covers the configuration, prompts, and docs in this repository only, not the seodraft service.
