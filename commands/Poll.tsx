import { createCommand } from "../lib/Command.ts";
import { Message } from "../lib/components/Message.ts";
import { ActionRow } from "../lib/components/ActionRow.ts";
import { Button } from "../lib/components/Button.ts";

export const Poll = createCommand({
  name: "poll",
  description: "Creates a poll",
  options: {
    choice1: {
      type: "string",
      required: true,
      description: "Choice 1",
    },
    choice2: {
      type: "string",
      required: true,
      description: "Choice 2",
    },
    choice3: {
      type: "string",
      required: false,
      description: "Choice 3",
    },
    choice4: {
      type: "string",
      required: false,
      description: "Choice 4",
    },
    choice5: {
      type: "string",
      required: false,
      description: "Choice 5",
    },
  },
  resolve({ choice1, choice2, choice3, choice4, choice5 }) {
    return (
      <Message>
        <ActionRow>
          <Button style="primary" customId="1">
            {choice1}
          </Button>
          <Button style="secondary" customId="2">
            {choice2}
          </Button>
        </ActionRow>
      </Message>
    );
  },
});
