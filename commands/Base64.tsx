import { createCommand } from "../lib/Command.ts";
import { Message } from "../lib/components/Message.ts";

export const Base64 = createCommand({
  name: "base64",
  description: "Converts a string to base64 encoded",
  options: {
    input: {
      type: "string",
      required: true,
      description: "Input to be encoded",
    },
  },
  resolve({ input }) {
    const output = btoa(input);
    return <Message>```{output}```</Message>;
  },
});
