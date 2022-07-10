import { RenderState } from "../globals.ts";

export function useInput(
  name: string,
  _type: "number" | "string",
  description: string,
  required = false
) {
  const rs = RenderState.active!;
  rs.options.set(name, { name, type: 3, description, required });
  const option = rs.inputs?.get(name);
  if (option && "value" in option) {
    return option.value;
  }
}
