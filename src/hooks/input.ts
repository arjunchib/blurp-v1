import { RenderState } from "../structures/RenderState.ts";
import {
  ApplicationCommandOptionType,
  APIApplicationCommandInteractionDataBasicOption,
} from "../deps.ts";

// type InputType =
//   | "string"
//   | "integer"
//   | "boolean"
//   | "user"
//   | "channel"
//   | "role"
//   | "mentionable"
//   | "number"
//   | "attachment";

interface BaseInputOptions {
  name: string;
  description: string;
  type: "string" | "number";
  required?: boolean;
}

interface StringInputOptions extends BaseInputOptions {
  type: "string";
  minLength?: number;
}

interface NumberInputOptions extends BaseInputOptions {
  type: "number";
  minValue?: number;
}

export function useInput(options: StringInputOptions): string;
export function useInput(options: NumberInputOptions): number;
export function useInput(options: BaseInputOptions): unknown {
  const rs = RenderState.active!;
  let { name, type, description, required } = options;
  if (required == null) {
    required = true;
  }
  let typeNum;
  if (type === "string") {
    typeNum = ApplicationCommandOptionType.String;
  } else if (type === "number") {
    typeNum = ApplicationCommandOptionType.Number;
  }
  rs.options.set(name, {
    name,
    type: typeNum as number,
    description,
    required,
  });
  const option = rs.inputs?.get(name)!;
  return (option as APIApplicationCommandInteractionDataBasicOption)?.value;
}
