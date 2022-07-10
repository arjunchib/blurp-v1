import {
  InteractionResponseType,
  APIApplicationCommandInteraction,
  ApplicationCommandType,
  APIInteractionResponse,
} from "../deps.ts";
import { props, RenderState } from "../globals.ts";
import type { Options } from "../start.ts";
import { hash } from "../util.ts";

export async function onApplicationCommand(
  interaction: APIApplicationCommandInteraction,
  ctx: Options
): Promise<APIInteractionResponse> {
  if (interaction.data.type === ApplicationCommandType.ChatInput) {
    const command = ctx.commands.find((c) => c.name === interaction.data.name)!;
    const rs = new RenderState();
    rs.inputs.clear();
    rs.store.clear();
    interaction.data.options?.forEach((opt) => rs.inputs.set(opt.name, opt));
    rs.mode = "input1";
    rs.runCommand(command);
    const prop = {
      name: command.name,
      inputs: [...rs.inputs],
      store: [...rs.store],
    };
    const customId = await hash(prop);
    props.set(customId, prop);
    rs.mode = "input2";
    rs.hash = customId;
    rs.buttonCount = 0;
    const data = rs.runCommand(command);
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data,
    };
  }
  throw new Error("Invalid request");
}
