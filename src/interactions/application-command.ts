import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  InteractionResponseType,
} from "../deps.ts";
import { chatInputs } from "../store.ts";

export async function onApplicationCommand(
  interaction: APIApplicationCommandInteraction
): Promise<APIInteractionResponse> {
  const hook = chatInputs.get(interaction.data.name);
  if (!hook) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "Error: could not find command",
      },
    };
  }
  return await hook(interaction);
}
