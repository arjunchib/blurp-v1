import {
  APIInteraction,
  InteractionType,
  APIInteractionResponse,
  ApplicationCommandType,
  InteractionResponseType,
} from "../deps.ts";
import { inputs, store, state, props } from "../globals.ts";
import type { Options } from "../start.ts";

export async function onInteraction(
  interaction: APIInteraction,
  ctx: Options
): Promise<APIInteractionResponse> {
  if (interaction.type === InteractionType.Ping) {
    return { type: 1 };
  } else if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.data.type === ApplicationCommandType.ChatInput) {
      const command = ctx.commands.find(
        (c) => c.name === interaction.data.name
      )!;
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
      // console.log(JSON.stringify(prop));
      console.log(JSON.stringify(data));
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data,
      };
    }
  } else if (interaction.type === InteractionType.MessageComponent) {
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
    console.log(store);
    state.buttonFn();
    console.log(store);
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
    console.log(JSON.stringify(data));
    return {
      type: InteractionResponseType.UpdateMessage,
      data,
    };
  }
  throw new Error("Invalid request");
}

async function hash(data: any) {
  const msgUint8 = new TextEncoder().encode(JSON.stringify(data));
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
