import {
  isMessageComponentButtonInteraction,
  isMessageComponentSelectMenuInteraction,
} from "https://deno.land/x/discord_api_types@0.36.1/utils/v10.ts";
import {
  APIInteractionResponse,
  APIMessageComponentInteraction,
  InteractionResponseType,
} from "../deps.ts";
import { buttonClicks, selects } from "../store.ts";

const error = {
  type: InteractionResponseType.ChannelMessageWithSource,
  data: {
    content: "Error: could not find command",
  },
} as const;

export async function onMessageComponent(
  interaction: APIMessageComponentInteraction
): Promise<APIInteractionResponse> {
  console.log(interaction);
  if (isMessageComponentButtonInteraction(interaction)) {
    const buttonClick = [...buttonClicks].find(([pattern, _]) =>
      interaction.data.custom_id.startsWith(pattern)
    );
    if (!buttonClick) {
      return error;
    }
    const hook = buttonClick[1];
    return await hook(interaction);
  } else if (isMessageComponentSelectMenuInteraction(interaction)) {
    const select = [...selects].find(
      ([pattern, _]) => interaction.data.custom_id === pattern
    );
    if (!select) {
      return error;
    }
    const hook = select[1];
    return await hook(interaction);
  } else {
    console.log(interaction);
  }
  return error;
}
