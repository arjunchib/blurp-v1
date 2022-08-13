import {
  APISelectMenuComponent,
  APISelectMenuOption,
  ComponentType,
} from "../deps.ts";

interface SelectMenuProps {
  customId: string;
  placeholder?: string;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

export function SelectMenu(
  props: SelectMenuProps,
  children: APISelectMenuOption[]
): APISelectMenuComponent {
  return {
    type: ComponentType.SelectMenu,
    custom_id: props.customId,
    options: children,
    placeholder: props.placeholder,
    min_values: props.minValues,
    max_values: props.maxValues,
    disabled: props.disabled,
  };
}
