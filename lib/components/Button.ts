import {
  // APIButtonComponent,
  APIButtonComponentWithCustomId,
  ComponentType,
  ButtonStyle,
} from "discord_api_types";

interface ButtonProps {
  children?: string;
}

export function Button(props: ButtonProps): APIButtonComponentWithCustomId {
  return {
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    label: props.children,
    custom_id: "test",
  };
}
