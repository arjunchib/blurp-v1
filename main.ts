import { App } from "./lib/App.ts";
import { HelloCommand } from "./commands/hello.ts";

const app = new App({
  commands: [HelloCommand()],
});

app.serve();
