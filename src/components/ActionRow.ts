import {
  APIActionRowComponent,
  APIActionRowComponentTypes,
  APIButtonComponent,
  ComponentType,
} from "../deps.ts";

interface ActionRowProps {}

type ActionRowChildren = APIButtonComponent[];

export function ActionRow(
  props: ActionRowProps,
  children: ActionRowChildren
): APIActionRowComponent<APIActionRowComponentTypes> {
  return {
    type: ComponentType.ActionRow,
    components: children,
  };
}
