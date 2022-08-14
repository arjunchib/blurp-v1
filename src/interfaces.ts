import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "./deps.ts";

export interface Command {}

export interface CommandConstructor {
  new (): Command;
}

export interface StartOptions {
  commands: CommandConstructor[];
  application_id: string;
  bot_token: string;
  guild_id?: string;
}

export interface Stringifiable {
  toString(): string;
}
