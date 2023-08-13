import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: "Secret Pong!", ephemeral: false });
  },
};
