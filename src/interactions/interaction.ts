import {
  APIInteraction,
  InteractionType,
  APIInteractionResponse,
  InteractionResponseType,
} from "../deps.ts";
import { Context } from "../structures/Context.ts";
import { onApplicationCommand } from "./application-command.ts";
import { onMessageComponent } from "./message-component.ts";

export async function onInteraction(
  interaction: APIInteraction,
  ctx: Context
): Promise<APIInteractionResponse> {
  if (interaction.type === InteractionType.Ping) {
    return { type: InteractionResponseType.Pong };
  } else if (interaction.type === InteractionType.ApplicationCommand) {
    return await onApplicationCommand(interaction, ctx);
  } else if (interaction.type === InteractionType.MessageComponent) {
    return await onMessageComponent(interaction, ctx);
  }
  throw new Error("Invalid request");
}
