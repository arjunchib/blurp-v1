/** @jsx h */

import {
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
  Modal,
  TextInput,
  ModalSubmit,
} from "blurp";
import {
  APIApplicationCommandInteractionDataStringOption,
  APIChatInputApplicationCommandInteraction,
  APIMessageComponentButtonInteraction,
  APIMessageComponentSelectMenuInteraction,
  APIModalSubmitInteraction,
} from "../../../src/deps.ts";

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default class Counter {
  private i = 0;

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
  counter(interaction: APIChatInputApplicationCommandInteraction) {
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

  @ButtonClick("openModal") openModal(
    interaction: APIMessageComponentButtonInteraction
  ) {
    return this.renderModal();
  }

  @ButtonClick("random") async random(
    interaction: APIMessageComponentButtonInteraction
  ) {
    await sleep(1000);
    this.i = Math.ceil(Math.random() * 10);
    return this.render(true);
  }

  @Select("menu") select(
    interaction: APIMessageComponentSelectMenuInteraction
  ) {
    this.i = parseInt(interaction.data.values[0]);
    return this.render(true);
  }

  @ModalSubmit("modal") modalSubmit(interaction: APIModalSubmitInteraction) {
    this.i = parseInt(
      interaction.data.components?.[0].components[0].value ?? "1"
    );
    return this.render(true);
  }

  private render(update = false) {
    return (
      <Message update={update}>
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
          <Button style="Secondary" customId={new CustomData("openModal")}>
            Open Modal
          </Button>
          <Button style="Success" customId={new CustomData("random")}>
            Random
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

  private renderModal() {
    return (
      <Modal customId="modal" title="Pick your number!">
        <ActionRow>
          <TextInput customId="input" style="Short" label="Number">
            1
          </TextInput>
        </ActionRow>
      </Modal>
    );
  }
}
