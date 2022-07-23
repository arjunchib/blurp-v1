import {
  APIInteractionResponseCallbackData,
  APIModalInteractionResponseCallbackData,
} from "../deps.ts";

export type Command = () =>
  | APIInteractionResponseCallbackData
  | APIModalInteractionResponseCallbackData;
