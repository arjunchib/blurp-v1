import { json } from "https://deno.land/x/sift@0.5.0/mod.ts";
import { CommandEvent } from "./CommandEvent.ts";
import { Interaction, SlashCommandInteraction } from "./Interaction.ts";
import { ApplicationCommandOption } from "./ApplicationCommandOption.ts";

export interface CommandOptions {
  name: string;
  name_localizations?: any;
  description: string;
  description_localizations?: any;
  options?: Readonly<ApplicationCommandOption[]>;
  default_permission?: any;
  type?: any;
}

// Looks weird but typescript says its all good :)
// deno-lint-ignore no-empty-interface
export interface Command<C extends CommandOptions> extends CommandOptions {}

type AllowPromise<T> = Promise<T> | T;
// type HandlerFn<T extends Interaction<Command>> = (
//   interaction: T
// ) => AllowPromise<Response>;

export class Command<C extends CommandOptions = CommandOptions> {
  handlers = new Map<CommandEvent, (...args: any) => AllowPromise<Response>>();
  _options: CommandOptions;

  constructor(options: C) {
    this._options = options;
    Object.assign(this, options);
  }

  private on(
    event: CommandEvent,
    fn: (...args: any) => AllowPromise<Response>
  ) {
    this.handlers.set(event, fn);
  }

  onSlashCommand(
    fn: (
      interaction: SlashCommandInteraction<C>
    ) => Promise<Response> | Response
  ) {
    this.on(CommandEvent.SLASH_COMMAND, fn);
  }

  // onUserCommand(fn: HandlerFn<Interaction<this>>) {
  //   this.on(CommandEvent.USER_COMMAND, fn);
  // }

  // onMessageCommand(fn: HandlerFn<Interaction<this>>) {
  //   this.on(CommandEvent.MESSAGE_COMMAND, fn);
  // }

  // onMessageComponent(fn: HandlerFn<Interaction<this>>) {
  //   this.on(CommandEvent.MESSAGE_COMPONENT, fn);
  // }

  // onSelectMenuComponent(fn: HandlerFn<Interaction<this>>) {
  //   this.on(CommandEvent.SELECT_MENU_COMPONENT, fn);
  // }

  // onAutocomplete(fn: HandlerFn<Interaction<this>>) {
  //   this.on(CommandEvent.AUTOCOMPLETE, fn);
  // }

  // onModalSubmit(fn: HandlerFn<Interaction<this>>) {
  //   this.on(CommandEvent.MODAL_SUBMIT, fn);
  // }

  emit(
    event: CommandEvent,
    interaction: Interaction<any>
  ): AllowPromise<Response> {
    const fn = this.handlers.get(event);
    if (fn) {
      return fn(interaction);
    } else {
      return json({
        type: 4,
        data: {
          content: `Error, no callback setup!`,
        },
      });
    }
  }
}
