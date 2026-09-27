import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

/**
 * Vercel Connect connector UID for the seodraft MCP server.
 *
 * Create it once from this project with:
 *   vercel connect create https://seodraft.app/mcp --name seodraft
 * then set SEODRAFT_CONNECTOR to the UID the CLI prints.
 * The fallback below is an unverified guess at the UID format (`<type>/<name>`);
 * always prefer the value the CLI returns.
 */
const seodraftConnector = process.env.SEODRAFT_CONNECTOR ?? "seodraft.app/seodraft";

/**
 * seodraft tools that change state the owner cares about. They pause for a
 * human decision before they run. Matched as substrings because eve passes the
 * qualified name (`seodraft__<tool>`). Tool names can change on the server; the
 * agent discovers the live list through `connection_search`.
 */
const APPROVAL_REQUIRED_TOOLS = [
  "deliver_draft",
  "approve_post",
  "approve_profile",
  "archive_post",
  "archive_topic",
  "merge_topics",
];

/**
 * seodraft (https://seodraft.app): an SEO agent exposed as a remote MCP server.
 *
 * Auth is user-scoped OAuth through Vercel Connect. seodraft's authorization
 * server supports dynamic client registration and PKCE, so no client ID or
 * secret is needed. Each person signs in with their own seodraft account, and
 * the token never reaches the model.
 */
export default defineMcpClientConnection({
  url: "https://seodraft.app/mcp",
  description:
    "seodraft SEO content desk: read and update the site profile, propose and plan " +
    "blog topics with measured search volume, research SERP briefs, store evidence, " +
    "write and update drafts, run the quality gate (filler, keyword placement, " +
    "cannibalization), manage the content calendar, and deliver approved drafts.",
  auth: connect(seodraftConnector),
  approval: ({ toolName }) =>
    APPROVAL_REQUIRED_TOOLS.some((tool) => toolName.includes(tool))
      ? "user-approval"
      : "not-applicable",
});
