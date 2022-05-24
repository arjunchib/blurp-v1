import {
  APIButtonComponent,
  ButtonStyle,
  ComponentType,
} from "discord_api_types";

interface BaseButtonProps {
  // label?: string;
  children?: unknown[];
  emoji?: {
    name?: string;
    id?: string;
    animated?: boolean;
  };
  disabled?: boolean;
}

interface LinkButtonProps extends BaseButtonProps {
  style: "link";
  url: string;
}

interface NonLinkButtonProps extends BaseButtonProps {
  style: "primary" | "secondary" | "success" | "danger";
  customId: string;
}

type ButtonProps = LinkButtonProps | NonLinkButtonProps;

function lookupStyle(style: ButtonProps["style"]) {
  switch (style) {
    case "primary":
      return ButtonStyle.Primary;
    case "secondary":
      return ButtonStyle.Secondary;
    case "success":
      return ButtonStyle.Success;
    case "danger":
    default:
      return ButtonStyle.Danger;
  }
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function Button(props: ButtonProps): APIButtonComponent {
  const { style, disabled, emoji, children } = props;

  const label = children?.filter(isString).join("");

  const btn = {
    [Symbol.for("type")]: "Button",
    type: ComponentType.Button,
    label,
    disabled,
    emoji,
  } as const;

  if (style === "link") {
    return { ...btn, url: props.url, style: ButtonStyle.Link };
  } else {
    const style = lookupStyle(props.style);
    return { ...btn, custom_id: props.customId, style };
  }
}
