import {
  APIInteraction,
  InteractionType,
  APIInteractionResponse,
  ApplicationCommandType,
  InteractionResponseType,
} from "discord_api_types";
import { inputs } from "../globals.ts";
import type { Options } from "../start.ts";

export function onInteraction(
  interaction: APIInteraction,
  ctx: Options
): APIInteractionResponse {
  if (interaction.type === InteractionType.Ping) {
    return { type: 1 };
  } else if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.type === ApplicationCommandType.ChatInput) {
      const command = ctx.commands.find(
        (c) => c.name === interaction.data.name
      );
      inputs.clear();
      interaction.data.options?.forEach((opt) => inputs.set(opt.name, opt));
      const data = command!();
      console.log(JSON.stringify(data));
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data,
      };
    }
  }
  throw new Error("Invalid request");
}
