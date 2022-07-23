import {
  InteractionResponseType,
  APIMessageComponentInteraction,
  APIInteractionResponse,
  APIInteractionResponseCallbackData,
  APIModalInteractionResponseCallbackData,
} from "../deps.ts";
import { RenderState } from "../structures/RenderState.ts";
import { CommandState } from "../structures/CommandState.ts";
import { Context } from "../structures/Context.ts";

export async function onMessageComponent(
  interaction: APIMessageComponentInteraction,
  _ctx: Context
): Promise<APIInteractionResponse> {
  const [hashValue, buttonId] = interaction.data.custom_id.split("-");
  const cs = CommandState.get(hashValue);
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
  rs.runCommand(cs.command);
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
    command: cs.command,
    name: cs.command.name,
    inputs: [...rs.inputs],
    store: [...rs.store],
  });
  rs.buttonCount = 0;
  rs.mode = "output2";
  const data = rs.runCommand(cs.command);
  if (isModal(data)) throw new Error("Modal not supported!");
  return {
    type: InteractionResponseType.UpdateMessage,
    data,
  };
}

function isModal(
  data:
    | APIInteractionResponseCallbackData
    | APIModalInteractionResponseCallbackData
): data is APIModalInteractionResponseCallbackData {
  return "title" in data;
}
