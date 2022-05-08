import { Command } from "../lib/Command.ts";
import { json } from "https://deno.land/x/sift@0.5.0/mod.ts";

export function ImageCommand() {
  const cmd = new Command({
    name: "image",
    description: "Find closest image taken by Landsat 8",
    options: [
      {
        name: "latitude",
        required: true,
        type: 10,
        description: "Latitude from -180 to 180",
      },
      {
        name: "longitude",
        required: true,
        type: 10,
        description: "Longitude from -180 to 180",
      },
    ],
  } as const);

  cmd.onSlashCommand((interaction) => {
    return json({
      type: 4,
      data: {
        content: `Hello! ${interaction.data.id}`,
      },
    });
  });

  return cmd;
}
