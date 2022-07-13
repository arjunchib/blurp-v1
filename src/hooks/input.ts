import { RenderState } from "../structures/RenderState.ts";
import {
  ApplicationCommandOptionType,
  APIApplicationCommandInteractionDataBasicOption,
} from "../deps.ts";

type InputType = "string" | "number";

interface InputOptions<T extends InputType> {
  type: T;
  name: string;
  description: string;
  required?: boolean;
}

type InputTypeValue<T extends InputType> = T extends "string" ? string : number;

export function useInput<T extends InputType>(
  options: InputOptions<T>
): InputTypeValue<T> {
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
  return (option as APIApplicationCommandInteractionDataBasicOption)
    ?.value as InputTypeValue<T>;
}
