import { inputs, options } from "../globals.ts";

export function useInput(
  name: string,
  type: "number" | "string",
  description: string,
  required = false
) {
  options.set(name, { name, type: 3, description, required });
  const option = inputs?.get(name);
  if (option && "value" in option) {
    return option.value;
  }
}
