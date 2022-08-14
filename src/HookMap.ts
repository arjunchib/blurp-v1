import {
  APIApplicationCommandInteraction,
  APIChatInputApplicationCommandInteraction,
  APIInteraction,
  APIInteractionResponse,
  APIMessageComponentInteraction,
  APIModalSubmitInteraction,
} from "./deps.ts";
import { errorMessage } from "./util.ts";

type Hook = (
  interaction: APIInteraction
) => APIInteractionResponse | Promise<APIInteractionResponse>;

export class HookMap extends Map<string, Hook> {
  private matchCustomId(
    interaction: APIMessageComponentInteraction | APIModalSubmitInteraction
  ): Hook | undefined {
    let key = interaction.data.custom_id;
    const terminatorIndex = key.indexOf(";");
    if (terminatorIndex >= 0) {
      key = key.substring(0, terminatorIndex);
    }
    return this.get(key);
  }

  async runWithChatInput(interaction: APIApplicationCommandInteraction) {
    const hook = this.get(interaction.data.name);
    if (hook) {
      return await hook(interaction);
    } else {
      return errorMessage;
    }
  }

  async runWithCustomId(
    interaction: APIMessageComponentInteraction | APIModalSubmitInteraction
  ) {
    const hook = this.matchCustomId(interaction);
    if (hook) {
      return await hook(interaction);
    } else {
      return errorMessage;
    }
  }
}
