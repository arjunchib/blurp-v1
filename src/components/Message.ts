import {
  APIActionRowComponent,
  APIInteractionResponseChannelMessageWithSource,
  APIMessageActionRowComponent,
  ComponentType,
  InteractionResponseType,
} from "../deps.ts";

interface Stingifiable {
  toString(): string;
}

interface MessageProps {}

type MessageChildren = (
  | APIActionRowComponent<APIMessageActionRowComponent>
  | Stingifiable
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
  _props: MessageProps,
  children: MessageChildren
): APIInteractionResponseChannelMessageWithSource {
  let content = "";
  const components: APIActionRowComponent<APIMessageActionRowComponent>[] = [];
  children.forEach((child) => {
    if (isActionRow(child)) {
      components.push(child);
    } else {
      content += child;
    }
  });
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content,
      components,
    },
  };
}
