/** @jsx h */

import {
  OnChatInput,
  SlashCommand,
  CustomData,
  ButtonClick,
  h,
  Message,
  ActionRow,
  Button,
} from "blurp";
import {
  APIApplicationCommandInteractionDataStringOption,
  APIChatInputApplicationCommandInteraction,
  APIMessageComponentButtonInteraction,
} from "../../../src/deps.ts";

@SlashCommand({
  name: "counter",
  description: "Keep track of a value",
  options: [
    {
      name: "initial",
      description: "starting value",
      type: 3,
      required: true,
    },
  ],
})
export default class Counter implements OnChatInput {
  private i = 0;

  onChatInput(interaction: APIChatInputApplicationCommandInteraction) {
    const initial = interaction.data.options?.find(
      (opt) => opt.name === "initial"
    ) as APIApplicationCommandInteractionDataStringOption;
    if (initial) {
      this.i = parseInt(initial.value);
    }
    return this.render();
  }

  @ButtonClick("up;") up(interaction: APIMessageComponentButtonInteraction) {
    const data = new CustomData(interaction.data.custom_id);
    this.i = parseInt(data.get("i") ?? "0") + 1;
    return this.render(true);
  }

  @ButtonClick("down;") down(
    interaction: APIMessageComponentButtonInteraction
  ) {
    const data = new CustomData(interaction.data.custom_id);
    this.i = parseInt(data.get("i") ?? "0") - 1;
    return this.render(true);
  }

  private render(update = false) {
    return (
      <Message update>
        Value: {this.i}
        <ActionRow>
          <Button
            style="Primary"
            customId={new CustomData("up", { i: this.i.toString() })}
          >
            Up
          </Button>
          <Button
            style="Primary"
            customId={new CustomData("down", { i: this.i.toString() })}
          >
            Down
          </Button>
        </ActionRow>
      </Message>
    );
  }
}
