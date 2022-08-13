import {
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  ApplicationCommandType,
  APIInteractionResponse,
  APIInteraction,
} from "../deps.ts";
import { chatInputs, slashCommands } from "../store.ts";
import { CommandConstructor } from "../interfaces.ts";

type Consturctor = { new (...args: any[]): any };

export function SlashCommand(
  command: Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, "type">
) {
  return function <T extends Consturctor>(BaseClass: T) {
    const slashCommand: RESTPostAPIChatInputApplicationCommandsJSONBody = {
      type: ApplicationCommandType.ChatInput,
      ...command,
    };
    slashCommands.push(slashCommand);
    chatInputs.set(
      slashCommand.name,
      new (BaseClass as CommandConstructor)().onChatInput! as (
        interaction: APIInteraction
      ) => APIInteractionResponse | Promise<APIInteractionResponse>
    );
    return class extends BaseClass {
      slashCommand: RESTPostAPIChatInputApplicationCommandsJSONBody =
        slashCommand;
    };
  };
}
