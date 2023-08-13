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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const dataFluffy = new Date("02/11/2023 20:00");
const timeString = (0, discord_js_2.time)(dataFluffy);
const relative = (0, discord_js_2.time)(dataFluffy, "R");
const mensagem = `O Fluffy the Cup , nosso torneio de Guilty Gear - STRIVE -  para iniciantes, mais recente foi/será em ${timeString}(${relative}) (Check in <t:1674252000:t>). 
Para se inscrever mande seu perfil do challonge e rating update para algum organizador do torneio para se inscrever. Você receberá um convite no site para entrar no torneio. As regras estão na página do torneio: https://challonge.com/pt_BR/kvd3byrs
`;
const readFile = util_1.default.promisify(fs_1.default.readFile);
module.exports = {
    disabled: false,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("fluffy")
        .setDescription("Detalhes sobre torneio!"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            readFile("data.json", "utf8").then((res) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const text = (_a = JSON.parse(res).fluffy) !== null && _a !== void 0 ? _a : "";
                yield interaction.reply({
                    content: text,
                    ephemeral: false,
                });
            }));
        });
    },
};
