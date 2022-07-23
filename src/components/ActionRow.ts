import {
  APIActionRowComponent,
  ComponentType,
  APIButtonComponent,
  APIActionRowComponentTypes,
  APITextInputComponent,
} from "../deps.ts";

interface ActionRowMessageProps {
  children?: APIButtonComponent | APIButtonComponent[];
}

interface ActionRowModalProps {
  children?: APITextInputComponent | APITextInputComponent[];
}

type ActionRowProps<T> = T extends APITextInputComponent
  ? ActionRowModalProps
  : ActionRowMessageProps;

export function ActionRow<T extends APIActionRowComponentTypes>(
  props: ActionRowProps<T>
): APIActionRowComponent<T> {
  let children: (APIButtonComponent | APITextInputComponent)[];
  if (props.children === undefined) {
    props.children = [];
  }
  if (!Array.isArray(props.children)) {
    children = [props.children];
  } else {
    children = props.children;
  }
  return {
    type: ComponentType.ActionRow,
    components: children! as T[],
  };
}
