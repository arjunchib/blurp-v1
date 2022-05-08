import { CommandOptions } from "./Command.ts";
import { ApplicationCommandOption } from "./ApplicationCommandOption.ts";

// export interface ApplicationCommandInteractionDataOption<
//   C extends CommandOptions
// > {
//   name: C["options"];
//   type: number;
//   value?: string | number;
//   options?: ApplicationCommandInteractionDataOption<C>[];
//   focused?: boolean;
// }

export type ApplicationCommandInteractionDataOption<C> = ToDataOption<
  Intersect<NonNullable<C>>
>;

// I assume this works via Distributive Conditional Types
// Im not sure I understand this
// https://github.com/Microsoft/TypeScript/issues/31192#issuecomment-488762397
type Intersect<T> = T extends { [K in keyof T]: infer E } ? E : T;

type ToDataOption<T> = T extends { [key: string]: any }
  ? Pick<T, "name" | "type"> & { focused?: boolean }
  : undefined;
