import { Message, ActionRow, Button, useState, useInput } from "blurp";

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
