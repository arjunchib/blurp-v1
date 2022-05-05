import { Command } from "../lib/Command.ts";
import { InteractionType } from "../lib/InteractionType.ts";
import { ApplicationCommand } from "../lib/ApplicationCommand.ts";
import { ApplicationCommandType } from "../lib/ApplicationCommandType.ts";

interface HelloCommandModel {
  name: "hello";
  description: "Greet a person";
  options: [];
  id: "";
  application_id: "asdasd";
  version: "0";
}

// interface HelloCommandModel
//   extends ApplicationCommand<ApplicationCommandType.CHAT_INPUT> {
//   name: "hello";
//   description: "Greet a person";
//   options: [];
// }

// const test: HelloCommandModel = {};

export class HelloCommand extends Command<
  HelloCommandModel,
  ApplicationCommandType.CHAT_INPUT
> {
  name = "hello";
  description = "Greet a person";
  options = [];
  blah;

  constructor(blah: string) {
    super();
    this.blah = blah;
    this.handler.on(InteractionType.APPLICATION_COMMAND, (interaction) => {
      interaction.data?.name;
    });
  }
}
