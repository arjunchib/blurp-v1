import "https://deno.land/std@0.136.0/dotenv/load.ts";
import { App } from "./lib/App.ts";
import { Hello } from "./commands/hello.tsx";

const app = new App({
  commands: [Hello],
  application_id: Deno.env.get("APPLICATION_ID")!,
  bot_token: Deno.env.get("BOT_TOKEN")!,
  guild_id: Deno.env.get("GUILD_ID"),
});

await app.serve();
