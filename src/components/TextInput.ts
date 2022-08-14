import {
  APITextInputComponent,
  ComponentType,
  TextInputStyle,
} from "../deps.ts";
import { Stringifiable } from "../interfaces.ts";

interface TextInputProps {
  customId: string;
  style: "Short" | "Paragraph";
  label: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  placeholder?: string;
}

export function TextInput(
  props: TextInputProps,
  children: Stringifiable[]
): APITextInputComponent {
  const value = children.join("");
  const style = TextInputStyle[props.style];
  return {
    type: ComponentType.TextInput,
    custom_id: props.customId,
    style,
    label: props.label,
    min_length: props.minLength,
    max_length: props.maxLength,
    required: props.required,
    value,
    placeholder: props.placeholder,
  };
}
