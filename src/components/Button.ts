import {
  // APIButtonComponent,
  APIButtonComponentWithCustomId,
  ComponentType,
  ButtonStyle,
} from "../deps.ts";
import { RenderState, props as _props } from "../globals.ts";

interface ButtonProps {
  children?: string;
  onClick?: () => void;
}

export function Button(props: ButtonProps): APIButtonComponentWithCustomId {
  const rs = RenderState.active!;
  if (rs.mode === "output1" && rs.buttonCount === rs.buttonClicked) {
    rs.buttonFn = props.onClick!;
  }
  return {
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    label: props.children,
    custom_id: `${rs.hash}-${rs.buttonCount++}`,
  };
}
