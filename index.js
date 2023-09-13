import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import loadCommands from "./functions/loadCommands.js";
import loadEvents from "./functions/loadEvents.js";
import config from "./config/index.js";

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.events = new Collection();
client.setMaxListeners(0);

client
  .login(config.discordToken)
  .then(async () => {
    await loadEvents(client);
    await loadCommands(client);
  })
  .catch((err) => {
    console.error(err);
  });
