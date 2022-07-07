import { APIApplicationCommandInteractionDataOption, RESTPostAPIApplicationCommandsJSONBody } from "discord_api_types";

export let inputs = new Map<string, APIApplicationCommandInteractionDataOption>;
export let options = new Map<string, Flatten< RESTPostAPIApplicationCommandsJSONBody['options']>>;

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;