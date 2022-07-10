import {
  APIApplicationCommandInteractionDataOption,
  RESTPostAPIApplicationCommandsJSONBody,
} from "../deps.ts";
import { Command } from "./Command.ts";

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

// Represent state for rendering commands
// 1 state per render
export class RenderState {
  inputs = new Map<string, APIApplicationCommandInteractionDataOption>();
  options = new Map<
    string,
    Flatten<RESTPostAPIApplicationCommandsJSONBody["options"]>
  >();
  // deno-lint-ignore no-explicit-any
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
