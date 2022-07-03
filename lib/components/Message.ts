import { APIInteractionResponseCallbackData } from "discord_api_types";

interface MessageProps {
  children?: string[];
}

export function Message(
  props: MessageProps
): APIInteractionResponseCallbackData {
  console.log(props.children);
  return {
    content: props.children?.join(""),
  };
}
