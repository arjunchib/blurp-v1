import {
  APIApplicationCommandInteractionDataOption,
  RESTPostAPIApplicationCommandsJSONBody,
} from "./deps.ts";
import { Command } from "./start.ts";

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

export const props = new Map<
  string,
  {
    name: string;
    inputs: [string, APIApplicationCommandInteractionDataOption][];
    store: [string, any][];
  }
>();

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
  constructor(
    private name: string,
    private inputs: [string, APIApplicationCommandInteractionDataOption][],
    private store: [string, any][]
  ) {}

  static all = new Map<string, CommandState>();
}
