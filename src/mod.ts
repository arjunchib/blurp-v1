export { start } from "./start.ts";

// hooks
export { useInput } from "./hooks/input.ts";
export { useState } from "./hooks/state.ts";
export { onInvoke } from "./hooks/invoke.ts";

// components
export { ActionRow } from "./components/ActionRow.ts";
export { Button } from "./components/Button.ts";
export { Message } from "./components/Message.ts";

export const h = (tag: string | Function, props: object, ...children: any) => {
  console.log(tag, props, children);
  if (typeof tag === "function") {
    return tag({ ...props, children });
  } else {
    return [tag, props];
  }
};
