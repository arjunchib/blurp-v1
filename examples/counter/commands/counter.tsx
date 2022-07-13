import { Message, ActionRow, Button, useState, useInput } from "blurp";

export default function counter() {
  const input = useInput({
    name: "start",
    type: "number",
    description: "Value to start at",
  });
  const [count, setCount] = useState("count", input || 0);
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
