import { APIInteractionResponseCallbackData } from "../deps.ts";

export type Command = () => APIInteractionResponseCallbackData;
