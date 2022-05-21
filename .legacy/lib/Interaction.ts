import { InteractionType } from "./InteractionType.ts";
import {
  InteractionData,
  ApplicationCommandInteractionData,
} from "./InteractionData.ts";
import { CommandOptions } from "./Command.ts";

export interface Interaction<C extends CommandOptions> {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: InteractionData<C>;
  guild_id?: string;
  channel_id?: string;
  member?: any;
  user?: any;
  token: string;
  version: number;
  message?: any;
  locale?: string;
  guild_locale?: string;
}

export interface SlashCommandInteraction<C extends CommandOptions>
  extends Interaction<C> {
  type: InteractionType.APPLICATION_COMMAND;
  data: ApplicationCommandInteractionData<C>;
}
