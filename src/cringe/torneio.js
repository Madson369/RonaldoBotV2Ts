const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: true,
  data: new SlashCommandBuilder()
    .setName("torneio")
    .setDescription("Detalhes sobre torneio!"),
  async execute(interaction) {
    await interaction.reply({
      content: "Torneio é pog em melhor confiar!",
      ephemeral: false,
    });
  },
};
