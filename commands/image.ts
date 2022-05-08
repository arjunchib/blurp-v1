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

  cmd.onSlashCommand(async (interaction) => {
    const { value: lat } = interaction.data.options?.find(
      (opt) => opt.name === "latitude"
    )!;
    const { value: lon } = interaction.data.options?.find(
      (opt) => opt.name === "longitude"
    )!;
    const formatter = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const parts = formatter.formatToParts();
    const { value: year } = parts.find((p) => p.type === "year")!;
    const { value: month } = parts.find((p) => p.type === "month")!;
    const { value: day } = parts.find((p) => p.type === "day")!;
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      // date: `${year}-${month}-${day}`,
      dim: "0.1",
      date: "2022-01-01",
      api_key: Deno.env.get("NASA_API_KEY")!,
    });
    const url = new URL(
      `https://api.nasa.gov/planetary/earth/assets/?${params.toString()}`
    );
    const res = await fetch(url.toString());
    const data = await res.json();
    console.log(data.url);
    data.url;
    return json({
      type: 4,
      data: {
        embeds: [
          {
            image: {
              url: data.url,
            },
          },
        ],
      },
    });
  });

  return cmd;
}
