"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Events } = require("discord.js");
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        var _a;
        console.log(`Tamo no ponto logado como ${(_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
    },
};
