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
exports.execute = exports.data = exports.disabled = void 0;
const discord_js_1 = require("discord.js");
exports.disabled = false;
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("baiken")
    .setDescription("baiken");
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.reply({
            content: `https://media.discordapp.net/attachments/1031620896298901634/1115489063231836160/169px-GGST_Baiken_236P.png`,
            ephemeral: false,
        });
    });
}
exports.execute = execute;
