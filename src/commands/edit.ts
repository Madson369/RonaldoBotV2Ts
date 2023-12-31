import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMemberRoleManager } from "discord.js";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);
const teste = () =>
  readFile("data.json", "utf8").then((res) => {
    const stringArray = Object.keys(JSON.parse(res));
    let optionArr = stringArray.map((item) => {
      return { name: item, value: item };
    });

    return {
      disabled: false,
      data: new SlashCommandBuilder()
        .setName("edit")
        .setDescription("edita o texto ai men!")
        .addStringOption((option) =>
          option
            .setName("texto")
            .setDescription("lança o verbo")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("comando")
            .setDescription("quer editar qual comando chapa")
            .setRequired(true)
            .addChoices(...optionArr)
        ),
      async execute(interaction: ChatInputCommandInteraction) {
        let roleArray = [];
        const roleManager = interaction?.member?.roles as GuildMemberRoleManager
        const roles = roleManager.cache
        for (let item of roles) {
          roleArray.push(item[0]);
        }


        const permissionBool = roleArray.some((role) => {
          return (
            role === "807823269306695680" ||
            role === "1065679711931482112" ||
            role === "850420756314587227"
          );
        });

        if (permissionBool) {

          const texto = interaction.options.getString("texto") ?? '';
          const comando = interaction.options.getString("comando") ?? '';

          try {
            readFile("data.json", "utf8").then((res) => {
              let response = JSON.parse(res);
              response[comando] = texto;
              fs.writeFile("data.json", JSON.stringify(response), (err) => {
                if (err) throw err;
                console.log("The file has been saved!");
              });
            });

            await interaction.reply({
              content: "deu bom",
              ephemeral: false,
            });
          } catch {
            await interaction.reply({
              content: "deu ruim",
              ephemeral: false,
            });
          }

          return;
        } else {
          await interaction.reply({
            content: "n tem permissao",
            ephemeral: false,
          });
          return;
        }
      },
    };
  });

module.exports = teste();
