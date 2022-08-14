import {
  APIActionRowComponent,
  APIInteractionResponseChannelMessageWithSource,
  APIInteractionResponseUpdateMessage,
  APIMessageActionRowComponent,
  ComponentType,
  InteractionResponseType,
} from "../deps.ts";
import { Stringifiable } from "../interfaces.ts";

interface MessageProps {
  update?: boolean;
}

type MessageChildren = (
  | APIActionRowComponent<APIMessageActionRowComponent>
  | Stringifiable
)[];

function isActionRow(
  value: unknown
): value is APIActionRowComponent<APIMessageActionRowComponent> {
  return !!(
    value &&
    typeof value === "object" &&
    Reflect.get(value, "type") === ComponentType.ActionRow
  );
}

export function Message(
  props: MessageProps,
  children: MessageChildren
):
  | APIInteractionResponseChannelMessageWithSource
  | APIInteractionResponseUpdateMessage {
  let content = "";
  const components: APIActionRowComponent<APIMessageActionRowComponent>[] = [];
  children.forEach((child) => {
    if (isActionRow(child)) {
      components.push(child);
    } else {
      content += child;
    }
  });
  const type = props.update
    ? InteractionResponseType.UpdateMessage
    : InteractionResponseType.ChannelMessageWithSource;
  return {
    type,
    data: {
      content,
      components,
    },
  };
}
