import {
  InteractionResponseType,
  APIApplicationCommandInteraction,
  ApplicationCommandType,
  APIInteractionResponse,
  APIModalInteractionResponseCallbackData,
  APIInteractionResponseCallbackData,
} from "../deps.ts";
import { RenderState } from "../structures/RenderState.ts";
import { CommandState } from "../structures/CommandState.ts";
import { Context } from "../structures/Context.ts";

export async function onApplicationCommand(
  interaction: APIApplicationCommandInteraction,
  ctx: Context
): Promise<APIInteractionResponse> {
  if (interaction.data.type === ApplicationCommandType.ChatInput) {
    let command = ctx.commands.find((c) => c.name === interaction.data.name)!;
    if (typeof command !== "function") {
      const name = interaction.data.options?.[0].name;
      command = command.subcommands.find((c) => c.name === name)!;
    }
    const rs = new RenderState();
    rs.inputs.clear();
    rs.store.clear();
    interaction.data.options?.forEach((opt) => rs.inputs.set(opt.name, opt));
    rs.mode = "input1";
    rs.runCommand(command);
    rs.mode = "input2";
    await rs.invokeFn();
    rs.hash = await CommandState.set({
      command,
      name: command.name,
      inputs: [...rs.inputs],
      store: [...rs.store],
    });
    rs.buttonCount = 0;
    const data = rs.runCommand(command);
    if (isModal(data)) {
      return {
        type: InteractionResponseType.Modal,
        data,
      };
    } else {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data,
      };
    }
  }
  throw new Error("Invalid request");
}

function isModal(
  data:
    | APIInteractionResponseCallbackData
    | APIModalInteractionResponseCallbackData
): data is APIModalInteractionResponseCallbackData {
  return "title" in data;
}
