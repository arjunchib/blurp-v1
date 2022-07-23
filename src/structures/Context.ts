import { Command } from "./Command.ts";
import { Group } from "./Group.ts";

export interface Context {
  commands: Array<Command | Group>;
  application_id: string;
  bot_token: string;
  guild_id?: string;
}
