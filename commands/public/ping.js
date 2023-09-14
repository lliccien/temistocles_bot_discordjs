import {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.reply("Pong!");
  },
};
