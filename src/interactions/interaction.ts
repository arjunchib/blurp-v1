import {
  APIInteraction,
  InteractionType,
  APIInteractionResponse,
  InteractionResponseType,
} from "../deps.ts";
import { onApplicationCommand } from "./application-command.ts";
import { onMessageComponent } from "./message-component.ts";
import { onModalSubmit } from "./modal-submit.ts";
import { onAutocomplete } from "./autocomplete.ts";

export async function onInteraction(
  interaction: APIInteraction
): Promise<APIInteractionResponse> {
  if (interaction.type === InteractionType.Ping) {
    return { type: InteractionResponseType.Pong };
  } else if (interaction.type === InteractionType.ApplicationCommand) {
    return await onApplicationCommand(interaction);
  } else if (interaction.type === InteractionType.MessageComponent) {
    return await onMessageComponent(interaction);
  } else if (interaction.type === InteractionType.ModalSubmit) {
    return await onModalSubmit(interaction);
  } else if (
    interaction.type === InteractionType.ApplicationCommandAutocomplete
  ) {
    return await onAutocomplete(interaction);
  }
  throw new Error("Request not handled yet");
}
