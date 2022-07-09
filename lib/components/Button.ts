import {
  // APIButtonComponent,
  APIButtonComponentWithCustomId,
  ComponentType,
  ButtonStyle,
} from "discord_api_types";
import { state, props as _props } from "../globals.ts";

interface ButtonProps {
  children?: string;
  onClick?: () => void;
}

export function Button(props: ButtonProps): APIButtonComponentWithCustomId {
  if (state.mode === "output1" && state.buttonCount === state.buttonClicked) {
    state.buttonFn = props.onClick!;
  }
  return {
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    label: props.children,
    custom_id: `${state.hash}-${state.buttonCount++}`,
  };
}
