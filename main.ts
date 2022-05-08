import { App } from "./lib/App.ts";
import { ImageCommand } from "./commands/hello.ts";
import "https://deno.land/std@0.136.0/dotenv/load.ts";

const app = new App({
  commands: [ImageCommand()],
  application_id: Deno.env.get("APPLICATION_ID")!,
  bot_token: Deno.env.get("BOT_TOKEN")!,
  guild_id: Deno.env.get("GUILD_ID"),
});

await app.serve();
