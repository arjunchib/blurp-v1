import { APIInteractionResponse, APIModalSubmitInteraction } from "../deps.ts";
import { hooks } from "../store.ts";

export async function onModalSubmit(
  interaction: APIModalSubmitInteraction
): Promise<APIInteractionResponse> {
  return await hooks.modalSubmit.runWithCustomId(interaction);
}
