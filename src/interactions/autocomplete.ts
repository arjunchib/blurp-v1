import {
  APIApplicationCommandAutocompleteInteraction,
  APIInteractionResponse,
} from "../deps.ts";
import { hooks } from "../store.ts";

export async function onAutocomplete(
  interaction: APIApplicationCommandAutocompleteInteraction
): Promise<APIInteractionResponse> {
  return await hooks.autocomplete.runWithAutocomplete(interaction);
}
