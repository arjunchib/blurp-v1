import { Command } from "./Command.ts";

export interface Context {
  commands: Command[];
  application_id: string;
  bot_token: string;
  guild_id?: string;
}
