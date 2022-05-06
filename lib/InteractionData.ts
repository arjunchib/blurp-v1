import { CommandOptions } from "./Command.ts";

export type InteractionData<C extends CommandOptions> = {
  id: string;
  name: C["name"];
  type: number;
  resolved?: any;
  options?: any;
  guild_id?: string;
  custom_id?: string;
  component_type?: number;
  values?: any;
  target_id?: string;
  components?: any;
};

export type ApplicationCommandInteractionData<
  C extends CommandOptions = CommandOptions
> = Pick<
  InteractionData<C>,
  "id" | "name" | "type" | "resolved" | "options" | "guild_id"
>;

export type ComponentInteractionData<C extends CommandOptions> = Pick<
  InteractionData<C>,
  "custom_id" | "component_type"
>;

export type SelectComponentInteractionData<C extends CommandOptions> = Pick<
  InteractionData<C>,
  "values"
> &
  ComponentInteractionData<C>;

export type UserCommandInteractionData<C extends CommandOptions> = Pick<
  InteractionData<C>,
  "target_id"
> &
  ApplicationCommandInteractionData<C>;

export type MessageCommandInteractionData<C extends CommandOptions> = Pick<
  InteractionData<C>,
  "target_id"
> &
  ApplicationCommandInteractionData<C>;

export type ModalSubmitInteractionData<C extends CommandOptions> = Pick<
  InteractionData<C>,
  "custom_id" | "components"
>;
