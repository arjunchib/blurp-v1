export { start } from "./start.ts";

export * from "./interfaces.ts";

// components
export { Message } from "./components/Message.ts";
export { ActionRow } from "./components/ActionRow.ts";
export { Button } from "./components/Button.ts";
export { SelectMenu } from "./components/SelectMenu.ts";
export { SelectOption } from "./components/SelectOption.ts";

// decorators
export { SlashCommand } from "./decorators/SlashCommand.ts";
export { ButtonClick } from "./decorators/ButtonClick.ts";
export { Select } from "./decorators/Select.ts";

// helpers
export { CustomData } from "./helpers/CustomData.ts";

export const h = (tag: string | Function, props: object, ...children: any) => {
  if (typeof tag === "function") {
    return tag(props, children);
  } else {
    return [tag, props];
  }
};
