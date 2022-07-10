import {
  InteractionResponseType,
  APIMessageComponentInteraction,
  APIInteractionResponse,
} from "../deps.ts";
import { RenderState, props } from "../globals.ts";
import type { Options } from "../start.ts";
import { hash } from "../util.ts";

export async function onMessageComponent(
  interaction: APIMessageComponentInteraction,
  ctx: Options
): Promise<APIInteractionResponse> {
  const [propHash, buttonId] = interaction.data.custom_id.split("-");
  const prop = props.get(propHash)!;
  const command = ctx.commands.find((c) => c.name === prop.name)!;
  const rs = new RenderState();
  rs.inputs.clear();
  rs.store.clear();
  for (const [k, v] of prop.inputs) {
    rs.inputs.set(k, v);
  }
  for (const [k, v] of prop.store) {
    rs.store.set(k, v);
  }
  rs.buttonCount = 0;
  rs.mode = "output1";
  rs.buttonClicked = parseInt(buttonId);
  rs.runCommand(command);
  rs.inputs.clear();
  rs.store.clear();
  for (const [k, v] of prop.inputs) {
    rs.inputs.set(k, v);
  }
  for (const [k, v] of prop.store) {
    rs.store.set(k, v);
  }
  rs.buttonFn();
  const newProp = {
    name: command.name,
    inputs: [...rs.inputs],
    store: [...rs.store],
  };
  const customId = await hash(newProp);
  props.set(customId, newProp);
  rs.hash = customId;
  rs.buttonCount = 0;
  rs.mode = "output2";
  const data = rs.runCommand(command);
  return {
    type: InteractionResponseType.UpdateMessage,
    data,
  };
}
