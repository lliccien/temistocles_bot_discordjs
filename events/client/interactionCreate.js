import {
  Client,
  PermissionFlagsBits,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from "discord.js";

const cooldown = new Set();

export default {
  name: "interactionCreate",
  once: false,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.guild || !interaction.channel) return;
    if (!interaction.isChatInputCommand) return;

    const command = client.commands.get(interaction.commandName);
    const cooldowns = await command.Cooldown;

    if (command) {
      if (!command)
        return interaction.reply({
          content: "This command is not available",
          ephemeral: true,
        });
      if (command.Cooldown && cooldown.has(interaction.user.id))
        return interaction.reply({
          content: `You must wait ${command.Cooldown} seconds to use this command again`,
          ephemeral: true,
        });
      cooldown.add(interaction.user.id);

      try {
        setTimeout(() => {
          cooldown.delete(interaction.user.id);
        }, cooldowns * 1000);
        command.execute(interaction, client);
      } catch (error) {
        return interaction.reply({
          content: `There was an error executing this command: ${error}`,
          ephemeral: true,
        });
      }
    }
  },
};
