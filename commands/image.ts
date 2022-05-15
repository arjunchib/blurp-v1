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
      {
        name: "year",
        required: false,
        type: 10,
        description: "Year of the observation",
      },
      {
        name: "month",
        required: false,
        type: 10,
        description: "Month of the observation (1 - 12)",
      },
      {
        name: "dim",
        required: false,
        type: 10,
        description: "Zoom level of image (default 0.1)",
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
    const { value: year = 2022 } = interaction.data.options?.find(
      (opt) => opt.name === "year"
    )!;
    const { value: month = 1 } = interaction.data.options?.find(
      (opt) => opt.name === "month"
    )!;
    const { value: dim = 0.1 } = interaction.data.options?.find(
      (opt) => opt.name === "dim"
    )!;
    const formatter = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const parts = formatter.formatToParts(
      new Date(year as number, (month as number) - 1)
    );
    const { value: yy } = parts.find((p) => p.type === "year")!;
    const { value: mm } = parts.find((p) => p.type === "month")!;
    const { value: dd } = parts.find((p) => p.type === "day")!;
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      date: `${yy}-${mm}-${dd}`,
      dim: dim.toString(),
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
