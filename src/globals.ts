import {
  APIApplicationCommandInteractionDataOption,
  RESTPostAPIApplicationCommandsJSONBody,
} from "./deps.ts";
import { Command } from "./start.ts";
import { hash } from "./util.ts";

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

// export const props = new Map<
//   string,
//   {
//     name: string;
//     inputs: [string, APIApplicationCommandInteractionDataOption][];
//     store: [string, any][];
//   }
// >();

// Represent state for rendering commands
// 1 state per render
export class RenderState {
  inputs = new Map<string, APIApplicationCommandInteractionDataOption>();
  options = new Map<
    string,
    Flatten<RESTPostAPIApplicationCommandsJSONBody["options"]>
  >();
  store = new Map<string, any>();
  mode = "input1";
  hash = "";
  buttonCount = 0;
  buttonClicked = -1;
  buttonFn = () => {};

  static active: RenderState | undefined;

  runCommand(command: Command): ReturnType<Command> {
    RenderState.active = this;
    return command();
  }
}

// Represents state for retained data between commands
// 1 state per command shape (i.e. multiple commands can share state)
export class CommandState {
  private constructor(
    public name: string,
    public inputs: [string, APIApplicationCommandInteractionDataOption][],
    public store: [string, any][]
  ) {}

  static all = new Map<string, CommandState>();
  static counts = new Map<string, number>();

  static async set(state: CommandState): Promise<string> {
    const hashValue = await hash(state);
    CommandState.all.set(hashValue, state);
    const count = CommandState.counts.get(hashValue) ?? 0;
    CommandState.counts.set(hashValue, count + 1);
    return hashValue;
  }

  static get(hashValue: string): CommandState {
    const state = CommandState.all.get(hashValue)!;
    const count = CommandState.counts.get(hashValue) ?? 0;
    if (count - 1 <= 0) {
      CommandState.all.delete(hashValue);
      CommandState.counts.delete(hashValue);
    } else {
      CommandState.counts.set(hashValue, count - 1);
    }
    return state;
  }
}
