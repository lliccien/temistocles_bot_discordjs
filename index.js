import { Client, GatewayIntentBits, Partials } from "discord.js";
import config from "./config/index.js";

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

client.setMaxListeners(0);

client
  .login(config.discordToken)
  .then(() => {
    console.log(`Logged whith ${client.user.username}`);
  })
  .catch((err) => {
    console.error(err);
  });
