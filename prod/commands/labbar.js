"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const labMazeEmbed = new discord_js_1.EmbedBuilder()
    .setColor(0x14d514)
    .setAuthor({ name: "Maze" })
    .setImage("https://media.tenor.com/pKwRy_WMQXAAAAAd/robo-ky-robo-ky-gym.gif")
    .setTitle("VAI LABBAR!")
    .setDescription("Faz bem para a saúde.")
    .setFooter({ text: "Provided by GGSTBR" });
module.exports = {
    disabled: false,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("labbar")
        .setDescription("O Maze versão bot pede para tu labbar."),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Math.random() <= 0.01) {
                interaction
                    .reply("to muito afim agora não")
                    .then( /* ... */)
                    .catch(console.error);
                //   mensagem.react(reactionEmoji).then().catch(console.error);
                return;
            }
            yield interaction.reply({ embeds: [labMazeEmbed], ephemeral: false });
        });
    },
};
