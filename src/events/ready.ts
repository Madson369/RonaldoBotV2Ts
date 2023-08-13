const { Events } = require("discord.js");
import { Client } from "discord.js";


module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`Tamo no ponto logado como ${client?.user?.tag}`);
  },
};
