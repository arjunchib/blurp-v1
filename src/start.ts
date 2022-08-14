import { verifySignature, digestMessage } from "./util.ts";
import {
  serve,
  validateRequest,
  json,
  RESTPutAPIApplicationCommandsJSONBody,
} from "./deps.ts";
import { StartOptions } from "./interfaces.ts";
import { slashCommands } from "./store.ts";
import { onInteraction } from "./interactions/interaction.ts";

export function start(options: StartOptions) {
  try {
    // registerCommands(options);
    serve({ "/": (req) => onRequest(req) });
  } catch (e) {
    console.error(e);
  }
}

async function onRequest(request: Request): Promise<Response> {
  // validateRequest() ensures that a request is of POST method and
  // has the following headers.
  const { error } = await validateRequest(request, {
    POST: { headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"] },
  });
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  // verifySignature() verifies if the request is coming from Discord.
  // When the request's signature is not valid, we return a 401 and this is
  // important as Discord sends invalid requests to test our verification.
  const { valid, body } = await verifySignature(request);
  if (!valid) {
    return json({ error: "Invalid request" }, { status: 401 });
  }

  // Handle interaction if request is a discord interaction event
  try {
    const res = await onInteraction(JSON.parse(body));
    return json(res);
  } catch (e) {
    console.error(e);
    // We will return a bad request error as a valid Discord request
    // shouldn't reach here.
    return json({ error: "bad request" }, { status: 400 });
  }
}

function isDefined<T>(value: T | null | undefined): value is T {
  return Boolean(value);
}

async function registerCommands(options: StartOptions) {
  const { application_id, guild_id, bot_token } = options;
  const body: RESTPutAPIApplicationCommandsJSONBody = slashCommands;
  // console.log(body);
  // if (await tryCache("commandHash", body)) {
  //   console.log("Skipped updating commands");
  //   return;
  // }
  const res = await fetch(
    `https://discord.com/api/v10/applications/${application_id}/guilds/${guild_id}/commands`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${bot_token}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    }
  );
  const j = await res.json();
  console.error(JSON.stringify(j, null, 2));
}
