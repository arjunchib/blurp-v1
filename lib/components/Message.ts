import {
  APIInteractionResponseCallbackData,
  ComponentType,
} from "discord_api_types";
import type { ActionRow } from "./ActionRow.ts";

type Child = string | ReturnType<typeof ActionRow>;

interface MessageProps {
  children?: Child[] | Child;
}

function isActionRow(
  // deno-lint-ignore no-explicit-any
  component: any
): component is ReturnType<typeof ActionRow> {
  return component["type"] === ComponentType.ActionRow;
}

export function Message(
  props: MessageProps
): APIInteractionResponseCallbackData {
  if (props.children === undefined) {
    props.children = "";
  }
  if (!Array.isArray(props.children)) {
    props.children = [props.children];
  }
  const content = props.children
    ?.filter((child) => !isActionRow(child))
    .join("");
  const components = props.children?.filter(isActionRow);
  return {
    content,
    components,
  };
}
