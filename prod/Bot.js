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
require("dotenv").config();
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const discord_js_1 = require("discord.js");
const token = process.env.KEY;
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
const eventsPath = node_path_1.default.join(__dirname, "events");
const eventFiles = node_fs_1.default
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
console.log('eventFiles', eventFiles);
for (const file of eventFiles) {
    const filePath = node_path_1.default.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
client.commands = new discord_js_1.Collection();
const commandsPath = node_path_1.default.join(__dirname, "commands");
const commandFiles = node_fs_1.default
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
function processCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const file of commandFiles) {
            const filePath = node_path_1.default.join(commandsPath, file);
            const command = require(filePath);
            if (command instanceof Promise) {
                try {
                    const resolvedCommand = yield command;
                    client.commands.set(resolvedCommand.data.name, resolvedCommand);
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ("data" in command && "execute" in command) {
                    console.log(command.data.name);
                    client.commands.set(command.data.name, command);
                }
                else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
    });
}
processCommands();
setTimeout(() => {
    // Log in to Discord with your client's token
    client.login(token);
}, 2000);
