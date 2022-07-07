import { Message } from "../lib/components/Message.ts";
import { useInput } from "../lib/hooks/use-input.ts";

export default function base64() {
  const input = useInput("input", "string", "Input to be encoded", true);
  const output = btoa(input as string);
  return <Message>{output}</Message>;
}
