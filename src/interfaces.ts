import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "./deps.ts";

export interface OnChatInput {
  onChatInput(
    interaction: APIApplicationCommandInteraction
  ): APIInteractionResponse | Promise<APIInteractionResponse>;
}

export interface Command extends Partial<OnChatInput> {
  slashCommand?: RESTPostAPIChatInputApplicationCommandsJSONBody;
}

export interface CommandConstructor {
  new (): Command;
}

export interface StartOptions {
  commands: CommandConstructor[];
  application_id: string;
  bot_token: string;
  guild_id?: string;
}
