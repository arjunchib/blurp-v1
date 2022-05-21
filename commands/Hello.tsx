import { createCommand } from "../lib/Command.ts";
import { Message } from "../lib/components/Message.ts";

export const Hello = createCommand({
  name: "hello",
  description: "Responds with a salutation",
  options: {
    name: {
      type: 3,
      required: false,
      description: "Your name",
    },
  },
  resolve({ name }) {
    return <Message name={name || "stranger"}></Message>;
  },
});
