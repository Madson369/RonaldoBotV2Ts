"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const messageChannel = "810605680498311208";
const rulesChannel = "807419813357420555";
const rolesChannel = "1006575997900034098";
module.exports = {
    name: discord_js_1.Events.GuildMemberAdd,
    once: false,
    execute(info) {
        var _a, _b, _c;
        if (!info.guild)
            return;
        const canalRegra = `${(_a = info.guild.channels.cache
            .get(rulesChannel)) === null || _a === void 0 ? void 0 : _a.toString()}`;
        const canalCargo = `${(_c = (_b = info.guild.channels.cache) === null || _b === void 0 ? void 0 : _b.get(rolesChannel)) === null || _c === void 0 ? void 0 : _c.toString()}`;
        const message = `<: fluffy: 914732955702800384 > <@${info.user.id}> <: fluffy: 914732955702800384 > muito boas - vindas ao server, lembre - se de checkar as ${canalRegra} e escolher seus ${canalCargo}
`;
        if (!info.guild)
            return;
        const channel = info.guild.channels.cache.get(messageChannel);
        if (!channel)
            return;
        channel.send(message);
    },
};
