import { isMessageComponentButtonInteraction } from "https://deno.land/x/discord_api_types@0.36.1/utils/v10.ts";
import {
  APIInteractionResponse,
  APIMessageComponentInteraction,
  InteractionResponseType,
} from "../deps.ts";
import { buttonClicks } from "../store.ts";

export async function onMessageComponent(
  interaction: APIMessageComponentInteraction
): Promise<APIInteractionResponse> {
  if (isMessageComponentButtonInteraction(interaction)) {
    const buttonClick = [...buttonClicks].find(([pattern, _]) =>
      interaction.data.custom_id.startsWith(pattern)
    );
    if (!buttonClick) {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: "Error: could not find command",
        },
      };
    }
    const hook = buttonClick[1];
    return await hook(interaction);
  }
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: "Error: could not find command",
    },
  };
}
