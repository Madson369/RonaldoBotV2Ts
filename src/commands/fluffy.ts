import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { time } from "discord.js";
import fs from "fs";
import util from "util";
const dataFluffy = new Date("02/11/2023 20:00");
const timeString = time(dataFluffy);
const relative = time(dataFluffy, "R");



const mensagem = `O Fluffy the Cup , nosso torneio de Guilty Gear - STRIVE -  para iniciantes, mais recente foi/será em ${timeString}(${relative}) (Check in <t:1674252000:t>). 
Para se inscrever mande seu perfil do challonge e rating update para algum organizador do torneio para se inscrever. Você receberá um convite no site para entrar no torneio. As regras estão na página do torneio: https://challonge.com/pt_BR/kvd3byrs
`;

const readFile = util.promisify(fs.readFile);

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("fluffy")
    .setDescription("Detalhes sobre torneio!"),
  async execute(interaction: ChatInputCommandInteraction) {
    readFile("data.json", "utf8").then(async (res) => {
      const text = JSON.parse(res).fluffy ?? "";
      await interaction.reply({
        content: text,
        ephemeral: false,
      });
    });
  },
};
