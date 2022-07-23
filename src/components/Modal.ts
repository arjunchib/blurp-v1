import {
  APIModalInteractionResponseCallbackData,
  APITextInputComponent,
} from "../deps.ts";
import { ActionRow } from "./ActionRow.ts";

type Child = ReturnType<typeof ActionRow<APITextInputComponent>>;

interface ModalProps {
  children?: Child[] | Child;
  title: string;
}

export function Modal(
  props: ModalProps
): APIModalInteractionResponseCallbackData {
  let { title, children } = props;
  if (!Array.isArray(children)) {
    children = [children!]!;
  }
  return {
    title,
    custom_id: "modal",
    components: children,
  };
}
