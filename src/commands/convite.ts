import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("convite")
    .setDescription("ta aqui o contive krai"),
  async execute(interaction: ChatInputCommandInteraction) {
    readFile("data.json", "utf8").then(async (res) => {
      const text = JSON.parse(res).convite ?? "";
      await interaction.reply({
        content: text,
        ephemeral: false,
      });
    });
  },
};
