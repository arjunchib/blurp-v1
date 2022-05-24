import {
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types@0.32.1/v9.ts";
import { ActionRow } from "./ActionRow.ts";

interface MessageProps {
  children?: unknown[];
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isActionRow(value: any): value is ReturnType<typeof ActionRow> {
  return value[Symbol.for("type")] === "ActionRow";
}

export function Message({
  children,
}: MessageProps): APIInteractionResponseChannelMessageWithSource {
  const content = children?.filter(isString).join("");
  const components = children?.filter(isActionRow) as any;
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: { content, components },
  };
}
