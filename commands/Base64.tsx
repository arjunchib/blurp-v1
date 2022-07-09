import { Message } from "../lib/components/Message.ts";
import { useInput } from "../lib/hooks/use-input.ts";
import { ActionRow } from "../lib/components/ActionRow.ts";
import { Button } from "../lib/components/Button.ts";
import { useState } from "../lib/hooks/use-state.ts";

export default function base64() {
  const input = useInput("input", "string", "Input to be encoded", true);
  const [count, setCount] = useState("count", 0);
  const output = btoa(input as string);
  return (
    <Message>
      {output}
      count: {count}
      <ActionRow>
        <Button onClick={() => setCount(count + 1)}>Clicko</Button>
      </ActionRow>
    </Message>
  );
}
