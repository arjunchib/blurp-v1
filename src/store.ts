import {
  APIInteraction,
  APIInteractionResponse,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "./deps.ts";

type Hook = (
  interaction: APIInteraction
) => APIInteractionResponse | Promise<APIInteractionResponse>;

export const slashCommands =
  new Array<RESTPostAPIChatInputApplicationCommandsJSONBody>();
export const chatInputs = new Map<string, Hook>();
export const buttonClicks = new Map<string, Hook>();
