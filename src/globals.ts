import { APIApplicationCommandInteractionDataOption, RESTPostAPIApplicationCommandsJSONBody } from "./deps.ts";

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

export const inputs = new Map<string, APIApplicationCommandInteractionDataOption>;
export const options = new Map<string, Flatten< RESTPostAPIApplicationCommandsJSONBody['options']>>;
export const store = new Map<string, any>
export const state = {
  mode: 'input1',
  hash: '',
  buttonCount: 0,
  buttonClicked: -1,
  buttonFn: () => {}
}
export const props = new Map<string, {
  name: string
  inputs: [string, APIApplicationCommandInteractionDataOption][];
  store: [string, any][];
}>