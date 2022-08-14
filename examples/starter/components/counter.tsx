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
  SelectMenu,
  SelectOption,
  Select,
} from "blurp";
import {
  APIApplicationCommandInteractionDataStringOption,
  APIChatInputApplicationCommandInteraction,
  APIMessageComponentButtonInteraction,
  APIMessageComponentSelectMenuInteraction,
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

  @Select("menu") select(
    interaction: APIMessageComponentSelectMenuInteraction
  ) {
    this.i = parseInt(interaction.data.values[0]);
    return this.render(true);
  }

  private render(update = false) {
    return (
      <Message update>
        Value: {this.i}
        <ActionRow>
          <Button
            style="Primary"
            customId={new CustomData("up", { i: this.i })}
          >
            Up
          </Button>
          <Button
            style="Primary"
            customId={new CustomData("down", { i: this.i })}
          >
            Down
          </Button>
        </ActionRow>
        <ActionRow>
          <SelectMenu customId="menu">
            <SelectOption value="1">One</SelectOption>
            <SelectOption value="2">Two</SelectOption>
          </SelectMenu>
        </ActionRow>
      </Message>
    );
  }
}
