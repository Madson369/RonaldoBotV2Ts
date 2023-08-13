require("dotenv").config();
import fs from "node:fs";
import path from "node:path";

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
const token = process.env.KEY;

interface ClientWithCommands extends Client {
    commands: Collection<string, any>
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
}) as ClientWithCommands;

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file: string) => file.endsWith(".js"));


console.log('eventFiles', eventFiles);

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

async function processCommands() {
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if (command instanceof Promise) {
            try {
                const resolvedCommand = await command;
                client.commands.set(resolvedCommand.data.name, resolvedCommand);
            } catch (error) {
                console.error(error);
            }
        } else {
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ("data" in command && "execute" in command) {
                console.log(command.data.name);
                client.commands.set(command.data.name, command);
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
                );
            }
        }
    }
}

processCommands();

setTimeout(() => {
    // Log in to Discord with your client's token
    client.login(token);
}, 2000);
