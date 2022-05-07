import { Command } from "../lib/Command.ts";
import { json } from "https://deno.land/x/sift@0.5.0/mod.ts";

export function HelloCommand() {
  const cmd = new Command({
    name: "hello",
    description: `Dont be a stranger, say hello!`,
    options: [
      {
        name: "name",
        required: true,
        type: 3,
        description: "The name of the person",
      },
      {
        name: "name2",
        required: false,
        type: 3,
        description: "The name of the person2",
      },
    ],
  } as const);

  const test = {
    name: "hello",
    description: `Dont be a stranger, say hello!`,
    options: [
      {
        name: "name",
        required: true,
        type: 3,
        description: "The name of the person",
      },
      {
        name: "name2",
        required: false,
        type: 3,
        description: "The name of the person2",
      },
    ] as const,
  } as const;

  type test = typeof test.options[number];

  cmd.onSlashCommand((interaction) => {
    // const option = interaction.data.options?.[0];
    return json({
      type: 4,
      data: {
        content: `Hello! ${interaction.data.id}`,
      },
    });
  });

  return cmd;
}
