import { ApplicationCommandType } from "./ApplicationCommandType.ts";

interface BaseApplicationCommand<T extends ApplicationCommandType> {
  /**
   * unique id of the command
   */
  id: string;

  /**
   * the type of command, defaults 1 if not set
   */
  type?: T;

  /**
   * unique id of the parent application
   */
  application_id: string;

  /**
   * guild id of the command, if not global
   */
  guild_id?: string;

  /**
   * 1-32 character name
   */
  name: string;

  /**
   * Localization dictionary for the name field. Values follow the same restrictions as name
   */
  name_localizations?: any;

  /**
   * 1-100 character description for `CHAT_INPUT` commands, empty string for `USER` and `MESSAGE` commands
   */
  description: string;

  /**
   * Localization dictionary for the description field. Values follow the same restrictions as description
   */
  description_localizations?: any;

  /**
   * the parameters for the command, max 25
   */
  options?: [];

  /**
   * whether the command is enabled by default when the app is added to a guild (default true)
   */
  default_permission?: boolean;

  /**
   * autoincrementing version identifier updated during substantial record changes
   */
  version: string;
}

export type ApplicationCommand<T extends ApplicationCommandType> =
  T extends ApplicationCommandType.CHAT_INPUT
    ? BaseApplicationCommand<T>
    : Omit<BaseApplicationCommand<T>, "options">;
