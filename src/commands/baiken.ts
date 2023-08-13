import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const disabled = false;
export const data = new SlashCommandBuilder()
  .setName("baiken")
  .setDescription("baiken");
export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({
    content: `https://media.discordapp.net/attachments/1031620896298901634/1115489063231836160/169px-GGST_Baiken_236P.png`,
    ephemeral: false,
  });
}
