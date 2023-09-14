// eslint-disable-next-line no-unused-vars
import { Client } from "discord.js";

export default {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    console.log(`Logged in as ${client.user.username}!`);
  },
};
