import {
  APIActionRowComponent,
  APIActionRowComponentTypes,
} from "discord_api_types";
import { Button } from "./Button.ts";

interface MessageProps {
  children?: unknown[];
}

function isButton(value: any): value is ReturnType<typeof Button> {
  return value[Symbol.for("type")] === "Button";
}

export function ActionRow({
  children,
}: MessageProps): APIActionRowComponent<APIActionRowComponentTypes> {
  const components = children?.filter(isButton);
  if (components == null) {
    throw new Error("ActionRow must contain at least one component");
  }
  return {
    [Symbol.for("type")]: "ActionRow",
    type: 1,
    components,
  };
}
