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
exports.execute = exports.data = exports.disabled = void 0;
const discord_js_1 = require("discord.js");
const getMove_1 = __importDefault(require("../getMove"));
function formatObject(obj) {
    let result = [];
    for (let key in obj) {
        let newObj = {
            name: key,
            value: obj[key] ? obj[key] : "-",
            inline: true,
        };
        if (key !== "character" && key !== "url" && key !== "riscLoss") {
            result.push(newObj);
        }
    }
    return result;
}
exports.disabled = false;
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("framedata")
    .setDescription("framedata dos boneco pog!")
    .addStringOption((option) => option
    .setName("personagem")
    .setDescription("Escolhe um personagem ae brother")
    .setRequired(true))
    .addStringOption((option) => option
    .setName("move")
    .setDescription("Escolhe um move ae brother")
    .setRequired(true));
function execute(interaction) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (Math.random() <= 0.01) {
            yield interaction.reply({
                content: "to com preguiça tente novamente mais tarde",
                ephemeral: false,
            });
            return;
        }
        const character = (_a = interaction.options.getString("personagem")) !== null && _a !== void 0 ? _a : '';
        const move = (_b = interaction.options.getString("move")) !== null && _b !== void 0 ? _b : '';
        let info = yield (0, getMove_1.default)(character, move);
        if (typeof info === "string") {
            yield interaction.reply({
                content: info,
                ephemeral: false,
            });
        }
        if (info.length > 0 && typeof info !== 'string') {
            const embedArray = info.map((move) => {
                return {
                    color: 0xd69226,
                    title: move.name
                        ? `${move.character} ${move.name} `
                        : `${move.character} ${move.input}`,
                    // url: "https://discord.js.org",
                    // author: {
                    //   name: "Some name",
                    //   icon_url: "https://i.imgur.com/AfFp7pu.png",
                    //   url: "https://discord.js.org",
                    // },
                    // description: "Some description here",
                    // thumbnail: {
                    //   url: "https://i.imgur.com/AfFp7pu.png",
                    // },
                    fields: [
                        ...formatObject(move),
                        // {
                        //   name: "Regular field title",
                        //   value: "Some value here",
                        // },
                        // {
                        //   name: "\u200b",
                        //   value: "\u200b",
                        //   inline: false,
                        // },
                        // {
                        //   name: "Inline field title",
                        //   value: "Some value here",
                        //   inline: true,
                        // },
                        // {
                        //   name: "Inline field title",
                        //   value: "Some value here",
                        //   inline: true,
                        // },
                        // {
                        //   name: "Inline field title",
                        //   value: "Some value here",
                        //   inline: true,
                        // },
                    ],
                    image: {
                        url: `https://www.dustloop.com${move.url}`,
                    },
                    // timestamp: new Date().toISOString(),
                    // footer: {
                    //   text: "Some footer text here",
                    //   icon_url: "https://i.imgur.com/AfFp7pu.png",
                    // },
                };
            });
            // await interaction.reply({
            //   content: `O vei achei esses move aqui ${info.map((move) => {
            //     return move.name ?? move.input;
            //   })}`,
            //   ephemeral: false,
            // });
            yield interaction.reply({
                embeds: [...embedArray],
                ephemeral: false,
            });
            return;
        }
        yield interaction.reply({
            content: "deu ruim",
            ephemeral: false,
        });
    });
}
exports.execute = execute;
