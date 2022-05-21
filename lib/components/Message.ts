import {
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types@0.32.1/v9.ts";

interface MessageProps {
  children?: string[] | string;
}

export function Message(
  props: MessageProps
): APIInteractionResponseChannelMessageWithSource {
  const { children } = props;
  const content = Array.isArray(children) ? children.join("") : children;
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: { content },
  };
}
