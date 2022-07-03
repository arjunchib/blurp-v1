import {
  APIInteraction,
  InteractionType,
  APIInteractionResponse,
  ApplicationCommandType,
  APIApplicationCommandInteractionDataOption,
  InteractionResponseType,
} from "discord_api_types";
import Base64 from "../../commands/Base64.tsx";

export function onInteraction(
  interaction: APIInteraction
): APIInteractionResponse {
  if (interaction.type === InteractionType.Ping) {
    return { type: 1 };
  } else if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.type === ApplicationCommandType.ChatInput) {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: Base64(toProps(interaction.data.options), {}, {}),
      };
    }
  }
  throw new Error("Invalid request");
}

function toProps(
  options: APIApplicationCommandInteractionDataOption[] | undefined
) {
  const props: Record<string, any> = {};
  if (!options) return props;
  for (const option of options) {
    if ("value" in option) {
      props[option.name] = option.value;
    }
  }
  return props;
}
