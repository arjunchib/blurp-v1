import { APIButtonComponent, ButtonStyle, ComponentType } from "../deps.ts";
import { CustomData } from "../helpers/CustomData.ts";

interface ButtonPropsBase {}

interface ButtonPropsCustomId extends ButtonPropsBase {
  customId: string | CustomData;
  style: "Primary" | "Secondary" | "Success" | "Danger";
}

interface ButtonPropsLink extends ButtonPropsBase {
  url: string;
  style: "Link";
}

type ButtonChildren = string[] | string;

export function Button(
  props: ButtonPropsCustomId | ButtonPropsLink,
  children: ButtonChildren
): APIButtonComponent {
  // Candidate for `satisfies` and `as`
  const baseButton = {
    type: ComponentType.Button,
    label: Array.isArray(children) ? children.join("") : children,
  } as const;
  if (props.style === "Link") {
    return {
      ...baseButton,
      style: ButtonStyle.Link,
      url: props.url,
    };
  } else {
    const custom_id =
      typeof props.customId === "string"
        ? props.customId
        : props.customId.toString();
    return {
      ...baseButton,
      custom_id,
      style: ButtonStyle[props.style],
    };
  }
}
