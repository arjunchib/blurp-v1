import "https://deno.land/std@0.136.0/dotenv/load.ts";
import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.5.0/mod.ts";
import {
  APIInteraction,
  InteractionType,
  APIApplicationCommandInteractionDataBasicOption,
} from "https://deno.land/x/discord_api_types@0.32.1/v9.ts";
import { verifySignature, digestMessage } from "./util.ts";
import { Command } from "./Command.ts";

export interface AppOptions {
  commands: Command[];
  application_id: string;
  bot_token: string;
  guild_id?: string;
}

export class App {
  constructor(public options: AppOptions) {}

  serve() {
    this.setupCommands();
    serve({
      "/": async (request) => await this.home(request),
    });
  }

  private async setupCommands() {
    const { application_id, guild_id, bot_token, commands } = this.options;
    const body = commands.map((c) => {
      const command = { ...c } as any;
      delete command.resolve;
      command.options = Object.entries(command.options!).map(([k, v]) => {
        (v as any).name = k;
        return v;
      });
      return command;
    });
    const commandsHash = await digestMessage(
      JSON.stringify([body, this.options])
    );
    if (localStorage.getItem("commandsHash") === commandsHash) {
      console.log("Skipped updating commands");
      return;
    }
    localStorage.setItem("commandsHash", commandsHash);
    const res = await fetch(
      `https://discord.com/api/v9/applications/${application_id}/guilds/${guild_id}/commands`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${bot_token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      }
    );
    console.log(`${res.status} ${res.statusText}`);
    console.log(await res.json());
  }

  private async home(request: Request) {
    // validateRequest() ensures that a request is of POST method and
    // has the following headers.
    const { error } = await validateRequest(request, {
      POST: { headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"] },
    });
    if (error) {
      return json({ error: error.message }, { status: error.status });
    }

    // verifySignature() verifies if the request is coming from Discord.
    // When the request's signature is not valid, we return a 401 and this is
    // important as Discord sends invalid requests to test our verification.
    const { valid, body } = await verifySignature(request);
    if (!valid) {
      return json({ error: "Invalid request" }, { status: 401 });
    }

    const interaction = JSON.parse(body) as APIInteraction;
    // Discord performs Ping interactions to test our application.
    // Type 1 in a request implies a Ping interaction.
    if (interaction.type === InteractionType.Ping) {
      return json({
        type: 1, // Type 1 in a response is a Pong interaction response type.
      });
    }

    // Type 2 in a request is an ApplicationCommand interaction.
    // It implies that a user has issued a command.
    if (
      interaction.type === InteractionType.ApplicationCommand &&
      interaction.data.type === 1
    ) {
      const name = interaction.data.name;
      const command = this.options.commands.find((c) => c.name === name);
      if (command == null) {
        return json({
          type: 4,
          data: { content: "Something went wrong!" },
        });
      }
      const props =
        interaction.data.options?.reduce<
          Record<string, string | number | boolean>
        >((acc, o) => {
          // ignore subcommands for now
          const { value, name } =
            o as APIApplicationCommandInteractionDataBasicOption;
          acc[name] = value;
          return acc;
        }, {}) ?? {};
      const res = command.resolve(props);
      return json(res);
    }

    // We will return a bad request error as a valid Discord request
    // shouldn't reach here.
    return json({ error: "bad request" }, { status: 400 });
  }
}
