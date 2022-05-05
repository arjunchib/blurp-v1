import { InteractionType } from "./InteractionType.ts";

interface BaseInteractionData<T, K> {
  /**
   * the ID of the invoked command
   */
  id: string;

  /**
   * the name of the invoked command
   */
  name: string;

  /**
   * the type of the invoked command
   */
  type: number;

  /**
   * converted users + roles + channels + attachments
   */
  resolved?: object;

  /**
   * interaction data option	the params + values from the user
   */
  options?: object[];

  /**
   * the id of the guild the command is registered to
   */
  guild_id?: string;

  /**
   * the custom_id of the component
   */
  custom_id?: string;

  /**
   * the type of the component
   */
  component_type?: number;

  /**
   * the values the user selected
   */
  values?: object[];

  /**
   * id the of user or message targeted by a user or message command
   */
  target_id?: string;

  /**
   * the values submitted by the user
   */
  components?: object[];
}

type ApplicationCommandFields =
  | "id"
  | "name"
  | "type"
  | "resolved"
  | "options"
  | "guild_id"
  | "target_id";
type ComponentFields = "custom_id" | "component_type" | "values";
type ModalSubmitFields = "custom_id" | "components";

export type InteractionData<T, K extends InteractionType> = Pick<
  BaseInteractionData<T, K>,
  K extends InteractionType.APPLICATION_COMMAND
    ? ApplicationCommandFields
    : K extends InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE
    ? ApplicationCommandFields
    : K extends InteractionType.MESSAGE_COMPONENT
    ? ComponentFields
    : K extends InteractionType.MODAL_SUBMIT
    ? ModalSubmitFields
    : never
>;
