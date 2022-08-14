import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "../deps.ts";
import { hooks, slashCommands } from "../store.ts";

export function SlashCommand(
  command: Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, "type">
) {
  return function (
    target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    hooks.chatInput.set(command.name, original.bind(target));
    slashCommands.push(command);
  };
}
