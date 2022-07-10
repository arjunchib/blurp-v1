import {
  InteractionResponseType,
  APIMessageComponentInteraction,
  APIInteractionResponse,
} from "../deps.ts";
import { RenderState } from "../structures/RenderState.ts";
import { CommandState } from "../structures/CommandState.ts";
import type { Options } from "../start.ts";

export async function onMessageComponent(
  interaction: APIMessageComponentInteraction,
  ctx: Options
): Promise<APIInteractionResponse> {
  const [hashValue, buttonId] = interaction.data.custom_id.split("-");
  const cs = CommandState.get(hashValue);
  const command = ctx.commands.find((c) => c.name === cs.name)!;
  const rs = new RenderState();
  rs.inputs.clear();
  rs.store.clear();
  for (const [k, v] of cs.inputs) {
    rs.inputs.set(k, v);
  }
  for (const [k, v] of cs.store) {
    rs.store.set(k, v);
  }
  rs.buttonCount = 0;
  rs.mode = "output1";
  rs.buttonClicked = parseInt(buttonId);
  rs.runCommand(command);
  rs.inputs.clear();
  rs.store.clear();
  for (const [k, v] of cs.inputs) {
    rs.inputs.set(k, v);
  }
  for (const [k, v] of cs.store) {
    rs.store.set(k, v);
  }
  rs.buttonFn();
  rs.hash = await CommandState.set({
    name: command.name,
    inputs: [...rs.inputs],
    store: [...rs.store],
  });
  rs.buttonCount = 0;
  rs.mode = "output2";
  const data = rs.runCommand(command);
  return {
    type: InteractionResponseType.UpdateMessage,
    data,
  };
}
