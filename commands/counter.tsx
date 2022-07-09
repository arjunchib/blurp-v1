import { Message } from "../lib/components/Message.ts";
import { useInput } from "../lib/hooks/use-input.ts";
import { ActionRow } from "../lib/components/ActionRow.ts";
import { Button } from "../lib/components/Button.ts";
import { useState } from "../lib/hooks/use-state.ts";

export default function counter() {
  const input = useInput("start", "string", "Value to start at", false);
  const [count, setCount] = useState("count", parseInt(input as string) || 0);
  return (
    <Message>
      count: {count}
      <ActionRow>
        <Button onClick={() => setCount(count - 1)}>Down</Button>
        <Button onClick={() => setCount(count + 1)}>Up</Button>
      </ActionRow>
    </Message>
  );
}
