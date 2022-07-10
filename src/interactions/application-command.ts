import {
  InteractionResponseType,
  APIApplicationCommandInteraction,
  ApplicationCommandType,
  APIInteractionResponse,
} from "../deps.ts";
import { inputs, store, state, props } from "../globals.ts";
import type { Options } from "../start.ts";
import { hash } from "../util.ts";

export async function onApplicationCommand(
  interaction: APIApplicationCommandInteraction,
  ctx: Options
): Promise<APIInteractionResponse> {
  if (interaction.data.type === ApplicationCommandType.ChatInput) {
    const command = ctx.commands.find((c) => c.name === interaction.data.name)!;
    inputs.clear();
    store.clear();
    interaction.data.options?.forEach((opt) => inputs.set(opt.name, opt));
    state.mode = "input1";
    command();
    const prop = {
      name: command.name,
      inputs: [...inputs],
      store: [...store],
    };
    const customId = await hash(prop);
    props.set(customId, prop);
    state.mode = "input2";
    state.hash = customId;
    state.buttonCount = 0;
    const data = command();
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data,
    };
  }
  throw new Error("Invalid request");
}
