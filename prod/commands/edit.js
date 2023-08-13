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
const teste = () => readFile("data.json", "utf8").then((res) => {
    const stringArray = Object.keys(JSON.parse(res));
    let optionArr = stringArray.map((item) => {
        return { name: item, value: item };
    });
    return {
        disabled: false,
        data: new discord_js_1.SlashCommandBuilder()
            .setName("edit")
            .setDescription("edita o texto ai men!")
            .addStringOption((option) => option
            .setName("texto")
            .setDescription("lança o verbo")
            .setRequired(true))
            .addStringOption((option) => option
            .setName("comando")
            .setDescription("quer editar qual comando chapa")
            .setRequired(true)
            .addChoices(...optionArr)),
        execute(interaction) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                let roleArray = [];
                const roleManager = (_a = interaction === null || interaction === void 0 ? void 0 : interaction.member) === null || _a === void 0 ? void 0 : _a.roles;
                const roles = roleManager.cache;
                for (let item of roles) {
                    roleArray.push(item[0]);
                }
                const permissionBool = roleArray.some((role) => {
                    return (role === "807823269306695680" ||
                        role === "1065679711931482112" ||
                        role === "850420756314587227");
                });
                if (permissionBool) {
                    const texto = (_b = interaction.options.getString("texto")) !== null && _b !== void 0 ? _b : '';
                    const comando = (_c = interaction.options.getString("comando")) !== null && _c !== void 0 ? _c : '';
                    try {
                        readFile("data.json", "utf8").then((res) => {
                            let response = JSON.parse(res);
                            response[comando] = texto;
                            fs_1.default.writeFile("data.json", JSON.stringify(response), (err) => {
                                if (err)
                                    throw err;
                                console.log("The file has been saved!");
                            });
                        });
                        yield interaction.reply({
                            content: "deu bom",
                            ephemeral: false,
                        });
                    }
                    catch (_d) {
                        yield interaction.reply({
                            content: "deu ruim",
                            ephemeral: false,
                        });
                    }
                    return;
                }
                else {
                    yield interaction.reply({
                        content: "n tem permissao",
                        ephemeral: false,
                    });
                    return;
                }
            });
        },
    };
});
module.exports = teste();
