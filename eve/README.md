# seodraft SEO content desk: eve agent template

An [eve](https://eve.dev) agent that runs an SEO content desk through [seodraft](https://seodraft.app), the SEO agent that writes without AI slop. The agent connects to the seodraft MCP server at `https://seodraft.app/mcp`, plans blog topics with measured search volume, researches SERP briefs, drafts from evidence you supply, runs seodraft's quality gate, and delivers a draft only after you approve it.

eve is Vercel's open-source agent framework (currently in beta). This template was written against eve `0.67.x`.

## What's inside

```text
agent/
  agent.ts                         # model config (default from `eve init`)
  instructions.md                  # always-on rules for the content desk
  channels/eve.ts                  # eve's HTTP channel (scaffold default auth)
  connections/seodraft.ts          # seodraft MCP connection, user-scoped OAuth via Vercel Connect
  skills/
    getting-started-seodraft/      # first-run setup: connect seodraft, capture site profile
    seodraft-content-desk/         # plan → research → evidence → draft → check → review → deliver
```

The connection gates these seodraft tools behind human approval: `deliver_draft`, `approve_post`, `approve_profile`, `archive_post`, `archive_topic`, and `merge_topics`. Everything else (reading the profile, proposing topics, research, drafting, running the gate) runs without a prompt. seodraft has no publish tool; delivery writes a draft file or a git draft, never a live post.

## Requirements

- Node.js 24 or newer
- A seodraft account. The 7-day trial at https://seodraft.app needs no card; after that it's $5/month or $50/year.
- For measured search volume and live SERPs, a DataForSEO account connected inside seodraft. seodraft spends only your own DataForSEO balance.
- A Vercel account for Vercel Connect (OAuth) and deployment.

No API keys or secrets are stored in this template. seodraft's authorization server supports dynamic client registration and PKCE, so there's no client ID or secret to paste.

## Set up

```bash
npm install
npx eve link                     # link or create a Vercel project
npm install -g vercel            # if you don't have the Vercel CLI
vercel connect create https://seodraft.app/mcp --name seodraft
vercel connect attach <connector-uid> --yes
vercel env pull
```

Set `SEODRAFT_CONNECTOR` to the connector UID the CLI printed (in `.env.local` for local dev and in the Vercel project environment). If you don't set it, the connection falls back to `seodraft.app/seodraft`, which is only a guess at the UID format.

Then run the agent:

```bash
npm run dev
```

### About user-scoped auth

The seodraft connection is user-scoped: each person signs in to their own seodraft account, and the token never reaches the model. eve can only start that sign-in when the session belongs to an authenticated user (`principalType: "user"`). In practice that means:

- **Slack or another platform channel:** these attach a user principal for the sender by default. Add one with `npx eve add channel/slack`.
- **Your own web app:** replace `placeholderAuth()` in `agent/channels/eve.ts` with your app's auth so it returns a user principal. See [eve authentication](https://eve.dev/docs/guides/auth-and-route-protection).
- **Schedules:** a cron-triggered run has no user, so a user-scoped connection fails with `principal_required`. Start recurring work from a user-authenticated channel instead.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fch0rch%2Fseodraft-agents%2Ftree%2Fmain%2Feve&project-name=seodraft-eve-agent&repository-name=seodraft-eve-agent)

The button clones only this `eve/` folder into a new repository and Vercel project. After the first deploy, create and attach the seodraft connector (the `vercel connect` commands above) from the new project, set `SEODRAFT_CONNECTOR`, and redeploy.

From a local checkout you can also deploy with:

```bash
npx eve deploy
```

Before exposing the agent to browsers, replace `placeholderAuth()` in `agent/channels/eve.ts`. The scaffold default rejects production browser requests on purpose.

## Links

- seodraft: https://seodraft.app
- seodraft MCP server: https://seodraft.app/features/mcp-server
- Free AI slop checker: https://seodraft.app/tools/ai-slop
- eve docs, MCP connections: https://eve.dev/docs/connections/mcp
- Vercel Connect: https://vercel.com/docs/connect

## License

MIT, covering the files in this repository only. seodraft itself is a hosted, closed-source service.
