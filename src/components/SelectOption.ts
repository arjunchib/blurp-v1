import { APISelectMenuOption } from "../deps.ts";

interface SelectOptionProps {
  value: string;
  description?: string;
  default?: boolean;
}

export function SelectOption(
  props: SelectOptionProps,
  children: string | string[]
): APISelectMenuOption {
  const { value, description } = props;
  const label = Array.isArray(children) ? children.join("") : children;
  return {
    label,
    value,
    description,
    default: props.default,
  };
}
