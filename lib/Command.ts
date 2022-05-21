import { APIInteractionResponse } from "https://deno.land/x/discord_api_types@0.32.1/v9.ts";

interface Option {
  type: 3 | 4;
  description: string;
  required: boolean;
}

type Options = {
  [index: string | symbol]: Option;
};

type Propify<T extends Options> = {
  [P in keyof T as T[P]["required"] extends true ? P : never]-?: Typify<T[P]>;
} & {
  [P in keyof T as T[P]["required"] extends false ? P : never]?: Typify<T[P]>;
};

type Typify<T extends Option> = T["type"] extends 3 ? string : number;

type Expand<T> = T extends unknown ? { [K in keyof T]: T[K] } : never;

export interface Command<T extends Options = Options> {
  name: string;
  description: string;
  options: T;
  resolve: (props: Expand<Propify<T>>) => APIInteractionResponse;
}

export function createCommand<T extends Options>(options: Command<T>) {
  return options;
}
