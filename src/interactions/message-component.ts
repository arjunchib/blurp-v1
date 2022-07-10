import {
  InteractionResponseType,
  APIMessageComponentInteraction,
  APIInteractionResponse,
} from "../deps.ts";
import { inputs, store, state, props } from "../globals.ts";
import type { Options } from "../start.ts";
import { hash } from "../util.ts";

export async function onMessageComponent(
  interaction: APIMessageComponentInteraction,
  ctx: Options
): Promise<APIInteractionResponse> {
  const [propHash, buttonId] = interaction.data.custom_id.split("-");
  const prop = props.get(propHash)!;
  const command = ctx.commands.find((c) => c.name === prop.name)!;
  inputs.clear();
  store.clear();
  for (const [k, v] of prop.inputs) {
    inputs.set(k, v);
  }
  for (const [k, v] of prop.store) {
    store.set(k, v);
  }
  state.buttonCount = 0;
  state.mode = "output1";
  state.buttonClicked = parseInt(buttonId);
  command();
  inputs.clear();
  store.clear();
  for (const [k, v] of prop.inputs) {
    inputs.set(k, v);
  }
  for (const [k, v] of prop.store) {
    store.set(k, v);
  }
  state.buttonFn();
  const newProp = {
    name: command.name,
    inputs: [...inputs],
    store: [...store],
  };
  const customId = await hash(newProp);
  props.set(customId, newProp);
  state.hash = customId;
  state.buttonCount = 0;
  state.mode = "output2";
  const data = command();
  return {
    type: InteractionResponseType.UpdateMessage,
    data,
  };
}
