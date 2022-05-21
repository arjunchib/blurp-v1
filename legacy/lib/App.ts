// Sift is a small routing library that abstracts away details like starting a
// listener on a port, and provides a simple function (serve) that has an API
// to invoke a function for a specific path.
import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.5.0/mod.ts";
// TweetNaCl is a cryptography library that we use to verify requests
// from Discord.
import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";
// load env var
import "https://deno.land/std@0.136.0/dotenv/load.ts";
import {
  APIInteraction,
  InteractionType,
  RESTPutAPIApplicationGuildCommandsJSONBody,
} from "https://deno.land/x/discord_api_types/v9.ts";
import { CommandEvent } from "./CommandEvent.ts";
import { Command } from "./Command.ts";
import { ApplicationCommandType } from "./ApplicationCommandType.ts";
import { ApplicationCommandInteractionData } from "./InteractionData.ts";
import { Interaction } from "./Interaction.ts";

interface AppOptions {
  commands: Command[];
  application_id: string;
  bot_token: string;
  guild_id?: string;
}

export class App {
  options: AppOptions;

  constructor(options: AppOptions) {
    this.options = options;
  }

  async serve() {
    await this.setupCommands();
    serve({
      "/": async (request) => await this.home(request),
    });
  }

  private async setupCommands() {
    const { application_id, guild_id, bot_token, commands } = this.options;
    const body = commands.map((c) => c._options);
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
      POST: {
        headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
      },
    });
    if (error) {
      return json({ error: error.message }, { status: error.status });
    }

    // verifySignature() verifies if the request is coming from Discord.
    // When the request's signature is not valid, we return a 401 and this is
    // important as Discord sends invalid requests to test our verification.
    const { valid, body } = await verifySignature(request);
    if (!valid) {
      return json(
        { error: "Invalid request" },
        {
          status: 401,
        }
      );
    }

    const interaction = JSON.parse(body) as APIInteraction;
    const { type } = interaction;
    // Discord performs Ping interactions to test our application.
    // Type 1 in a request implies a Ping interaction.
    if (type === InteractionType.Ping) {
      return json({
        type: 1, // Type 1 in a response is a Pong interaction response type.
      });
    }

    // Type 2 in a request is an ApplicationCommand interaction.
    // It implies that a user has issued a command.
    if (type === InteractionType.ApplicationCommand) {
      const data = interaction.data as ApplicationCommandInteractionData;
      const command = this.options.commands.find(
        (cmd) => cmd.name === data.name
      );
      if (command == null) {
        return json({
          type: 4,
          data: {
            content: "No command!",
          },
        });
      }
      switch (data.type) {
        case ApplicationCommandType.CHAT_INPUT:
          return await command.emit(
            CommandEvent.SLASH_COMMAND,
            interaction as any
          );
        case ApplicationCommandType.MESSAGE:
          return await command.emit(
            CommandEvent.MESSAGE_COMMAND,
            interaction as any
          );
        case ApplicationCommandType.USER:
          return await command.emit(
            CommandEvent.USER_COMMAND,
            interaction as any
          );
      }
    }

    // We will return a bad request error as a valid Discord request
    // shouldn't reach here.
    return json({ error: "bad request" }, { status: 400 });
  }
}

/** Verify whether the request is coming from Discord. */
async function verifySignature(
  request: Request
): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
  // Discord sends these headers with every request.
  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY)
  );

  return { valid, body };
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}
