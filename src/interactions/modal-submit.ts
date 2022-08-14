import {
  APIInteractionResponse,
  APIModalSubmitInteraction,
  InteractionResponseType,
} from "../deps.ts";
import { modalSubmits } from "../store.ts";

const error = {
  type: InteractionResponseType.ChannelMessageWithSource,
  data: {
    content: "Error: could not find command",
  },
} as const;

export async function onModalSubmit(
  interaction: APIModalSubmitInteraction
): Promise<APIInteractionResponse> {
  const modalSubmit = [...modalSubmits].find(
    ([pattern, _]) => interaction.data.custom_id === pattern
  );
  if (!modalSubmit) {
    return error;
  }
  const hook = modalSubmit[1];
  return await hook(interaction);
}
