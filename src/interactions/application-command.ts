import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
} from "../deps.ts";
import { hooks } from "../store.ts";

export async function onApplicationCommand(
  interaction: APIApplicationCommandInteraction
): Promise<APIInteractionResponse> {
  return await hooks.chatInput.runWithChatInput(interaction);
}
