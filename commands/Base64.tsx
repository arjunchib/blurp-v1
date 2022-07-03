import { Message } from "../lib/components/Message.ts";

export const options = {
  name: "base64",
  description: "Converts a string to base64 encoded",
  options: {
    input: {
      type: "string",
      required: true,
      description: "Input to be encoded",
    },
  },
  state: {
    i: 0,
  },
  listeners: {
    click(props: any, state: any) {
      state.i += 1;
    },
  },
};

export default function Base641(props: any, state: any, listeners: any) {
  const output = btoa(props.input);
  return <Message>{output}</Message>;
}
