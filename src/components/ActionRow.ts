import {
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ComponentType,
  APIButtonComponent,
} from "../deps.ts";

interface ActionRowProps {
  children?: APIButtonComponent | APIButtonComponent[];
}

export function ActionRow(
  props: ActionRowProps
): APIActionRowComponent<APIMessageActionRowComponent> {
  if (props.children === undefined) {
    props.children = [];
  }
  if (!Array.isArray(props.children)) {
    props.children = [props.children];
  }
  return {
    type: ComponentType.ActionRow,
    components: props.children,
  };
}
