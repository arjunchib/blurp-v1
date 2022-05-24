import "https://deno.land/std@0.136.0/dotenv/load.ts";
import { App } from "./lib/App.ts";
import { Hello } from "./commands/Hello.tsx";
import { Base64 } from "./commands/Base64.tsx";
import { Poll } from "./commands/Poll.tsx";

const app = new App({
  commands: [Hello, Base64, Poll],
  application_id: Deno.env.get("APPLICATION_ID")!,
  bot_token: Deno.env.get("BOT_TOKEN")!,
  guild_id: Deno.env.get("GUILD_ID"),
});

app.serve();
