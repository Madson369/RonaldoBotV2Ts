"use strict";
/*
Tenta obter a frame data do golpe de um personagem a partir do dustloop.com
*/
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
module.exports = {
    disabled: false,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("say")
        .setDescription("!")
        .addStringOption((option) => option.setName("text").setDescription("lança a voz").setRequired(true)),
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.user.id === "158000799673221121") {
                const text = (_a = interaction.options.getString("text")) !== null && _a !== void 0 ? _a : '';
                yield interaction.reply({
                    content: text,
                    ephemeral: false,
                });
                return;
            }
            yield interaction.reply({
                content: "you are not the chosen one",
                ephemeral: false,
            });
        });
    },
};
