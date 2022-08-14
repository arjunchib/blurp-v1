import {
  APIActionRowComponent,
  APIModalActionRowComponent,
  APIModalInteractionResponse,
  InteractionResponseType,
} from "../deps.ts";

interface ModalProps {
  customId: string;
  title: string;
}

export function Modal(
  props: ModalProps,
  children: APIActionRowComponent<APIModalActionRowComponent>[]
): APIModalInteractionResponse {
  return {
    type: InteractionResponseType.Modal,
    data: {
      title: props.title,
      custom_id: props.customId,
      components: children,
    },
  };
}
