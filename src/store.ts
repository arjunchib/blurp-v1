import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "./deps.ts";
import { HookMap } from "./HookMap.ts";

export const slashCommands =
  new Array<RESTPostAPIChatInputApplicationCommandsJSONBody>();

export const hooks = {
  chatInput: new HookMap(),
  buttonClick: new HookMap(),
  select: new HookMap(),
  modalSubmit: new HookMap(),
  autocomplete: new HookMap(),
};
