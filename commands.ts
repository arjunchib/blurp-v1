// load env var
import "https://deno.land/std@0.136.0/dotenv/load.ts";

const commands = {
  name: "hello",
  description: "Greet a person",
  options: [
    {
      name: "name",
      description: "The name of the person",
      type: 3,
      required: true,
    },
  ],
};

await fetch(
  `https://discord.com/api/v8/applications/${Deno.env.get(
    "CLIENT_ID"
  )}/guilds/${Deno.env.get("GUILD_ID")}/commands`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${Deno.env.get("BOT_TOKEN")}`,
    },
    body: JSON.stringify(commands),
  }
);
