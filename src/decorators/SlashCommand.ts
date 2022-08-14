import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "../deps.ts";
import { chatInputs, slashCommands } from "../store.ts";

export function SlashCommand(
  command: Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, "type">
) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    chatInputs.set(command.name, original.bind(target));
    slashCommands.push(command);
  };
}
