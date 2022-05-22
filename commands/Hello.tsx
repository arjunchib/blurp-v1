import { createCommand } from "../lib/Command.ts";
import { Message } from "../lib/components/Message.ts";

export const Hello = createCommand({
  name: "hello",
  description: "Responds with a salutation",
  options: {
    name: {
      type: "string",
      required: false,
      description: "Your name",
    },
  },
  resolve({ name }) {
    return <Message>Hello, {name || "stranger"}</Message>;
  },
});
