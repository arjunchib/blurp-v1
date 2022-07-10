import { APIApplicationCommandInteractionDataOption } from "../deps.ts";
import { hash } from "../util.ts";

// Represents state for retained data between commands
// 1 state per command shape (i.e. multiple commands can share state)
export class CommandState {
  private constructor(
    public name: string,
    public inputs: [string, APIApplicationCommandInteractionDataOption][],
    // deno-lint-ignore no-explicit-any
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
