import "https://deno.land/std@0.136.0/dotenv/load.ts";
import { start } from "blurp";
import counter from "./commands/counter.tsx";
import justwatch from "./commands/justwatch.tsx";

start({
  commands: [counter, justwatch],
  application_id: Deno.env.get("APPLICATION_ID")!,
  bot_token: Deno.env.get("BOT_TOKEN")!,
  guild_id: Deno.env.get("GUILD_ID"),
});
