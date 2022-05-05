import { Handler } from "./Handler.ts";
import { ApplicationCommand } from "../lib/ApplicationCommand.ts";
import { ApplicationCommandType } from "../lib/ApplicationCommandType.ts";

export abstract class Command<
  T extends ApplicationCommand<K>,
  K extends ApplicationCommandType
> {
  abstract name: string;
  abstract description: string;
  abstract options: any[];
  handler = new Handler<T>();
}
