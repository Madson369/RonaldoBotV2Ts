import { ChatInputCommandInteraction } from "discord.js";

import { SlashCommandBuilder } from "discord.js";
import fs from "node:fs";
const messageChannel = "810605680498311208";

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder().setName("teste").setDescription("teste!"),
  async execute(interaction: ChatInputCommandInteraction) {
    const guilda = interaction.guild
    if (!guilda) return
    console.log(`interaction`, interaction);
    guilda.channels.cache.get(messageChannel);
    console.log(
      "guilda.channels.cache.get(messageChannel): ",
      guilda.channels.cache.get(messageChannel)
    );

    await interaction.reply({
      content: "teste",
      ephemeral: false,
    });
  },
};
