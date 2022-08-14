/** @jsx h */

import { Message, ActionRow, Button, useState, useInput, h } from "blurp";

export default function counter() {
  const start = useInput({
    name: "start",
    type: "number",
    description: "Value to start at",
    minValue: 2,
  });
  const [count, setCount] = useState("count", start || 0);
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
