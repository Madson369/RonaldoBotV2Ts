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
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const readFile = util_1.default.promisify(fs_1.default.readFile);
module.exports = {
    disabled: false,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("scuff")
        .setDescription("info sobre a scuff!"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            readFile("data.json", "utf8").then((res) => __awaiter(this, void 0, void 0, function* () {
                let json = JSON.parse(res);
                let text = json.scuff;
                if (!text) {
                    json.scuff = "";
                    text = "setaram esse texto ainda não usa o /edit";
                    fs_1.default.writeFile("data.json", JSON.stringify(json), (err) => {
                        if (err)
                            throw err;
                        console.log("The file has been saved!");
                    });
                }
                yield interaction.reply({
                    content: text,
                    ephemeral: false,
                });
            }));
        });
    },
};
