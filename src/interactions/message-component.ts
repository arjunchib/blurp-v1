import {
  isMessageComponentButtonInteraction,
  isMessageComponentSelectMenuInteraction,
} from "https://deno.land/x/discord_api_types@0.36.1/utils/v10.ts";
import {
  APIInteractionResponse,
  APIMessageComponentInteraction,
} from "../deps.ts";
import { hooks } from "../store.ts";
import { errorMessage } from "../util.ts";

export async function onMessageComponent(
  interaction: APIMessageComponentInteraction
): Promise<APIInteractionResponse> {
  if (isMessageComponentButtonInteraction(interaction)) {
    return await hooks.buttonClick.runWithCustomId(interaction);
  } else if (isMessageComponentSelectMenuInteraction(interaction)) {
    return await hooks.select.runWithCustomId(interaction);
  } else {
    return errorMessage;
  }
}
