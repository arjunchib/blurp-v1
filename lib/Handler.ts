import { Interaction } from "./Interaction.ts";
import { InteractionType } from "./InteractionType.ts";

export class Handler<T> {
  on<K extends InteractionType>(
    event: K,
    reciever: (interaction: Interaction<T, K>) => void
  ) {}
}
