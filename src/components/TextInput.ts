import {
  APITextInputComponent,
  ComponentType,
  TextInputStyle,
} from "../deps.ts";

interface TextInputProps {
  style: "short" | "paragraph";
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
  children?: [];
}

export function TextInput(props: TextInputProps): APITextInputComponent {
  const style =
    props.style === "short" ? TextInputStyle.Short : TextInputStyle.Paragraph;
  const { label } = props;
  const optionalProps: Partial<TextInputProps> = { ...props };
  delete optionalProps.style;
  delete optionalProps.label;
  delete optionalProps.children;
  return {
    type: ComponentType.TextInput,
    custom_id: label,
    style,
    label,
    ...(optionalProps as Omit<typeof optionalProps, "style" | "label">),
  };
}
