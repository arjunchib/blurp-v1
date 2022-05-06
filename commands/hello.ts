import { Command } from "../lib/Command.ts";
import { json } from "https://deno.land/x/sift@0.5.0/mod.ts";

export function HelloCommand() {
  const cmd = new Command({
    name: "hello",
    description: `Dont be a stranger, say hello!`,
  } as const);

  cmd.onSlashCommand((interaction) => {
    interaction.data.name;
    return json({
      type: 4,
      data: {
        content: `Hello! ${interaction.data.id}`,
      },
    });
  });

  return cmd;
}
