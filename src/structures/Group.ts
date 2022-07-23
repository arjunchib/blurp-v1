import { Command } from "./Command.ts";

export interface Group {
  name: string;
  description: string;
  subcommands: Command[];
}
