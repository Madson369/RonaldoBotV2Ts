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
const discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.MessageReactionRemove,
    once: false,
    execute(reaction, user) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const { message } = reaction;
            if (((_a = message === null || message === void 0 ? void 0 : message.author) === null || _a === void 0 ? void 0 : _a.id) === user.id)
                return;
            if (reaction.emoji.name !== "💀")
                return;
            if (!message.guild)
                return;
            const starChannel = message.guild.channels.cache.get("1083854425296207872");
            if (!starChannel)
                return message.channel.send(`tem canal n brother.`);
            const fetch = yield (starChannel).messages.fetch({ limit: 100 });
            const stars = fetch.find((m) => {
                var _a, _b, _c, _d;
                return (((_b = (_a = m === null || m === void 0 ? void 0 : m.embeds[0]) === null || _a === void 0 ? void 0 : _a.footer) === null || _b === void 0 ? void 0 : _b.text.startsWith("💀")) &&
                    ((_d = (_c = m === null || m === void 0 ? void 0 : m.embeds[0]) === null || _c === void 0 ? void 0 : _c.footer) === null || _d === void 0 ? void 0 : _d.text.endsWith(message.id)));
            });
            if (stars) {
                const star = /^\💀\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec((_c = (_b = stars.embeds[0].footer) === null || _b === void 0 ? void 0 : _b.text) !== null && _c !== void 0 ? _c : '');
                if (!star)
                    return;
                const foundStar = stars.embeds[0];
                let image = "";
                const attachments = [...message.attachments];
                if (attachments[0] && attachments[0][1] && attachments[0][1].url) {
                    image = attachments[0][1].url;
                }
                const embed = {
                    color: foundStar.color,
                    description: foundStar.description,
                    image: {
                        url: (_e = (_d = foundStar === null || foundStar === void 0 ? void 0 : foundStar.image) === null || _d === void 0 ? void 0 : _d.url) !== null && _e !== void 0 ? _e : "",
                    },
                    author: foundStar.author,
                    footer: { text: `💀 ${parseInt(star[1]) - 1} | ${message.id}` },
                };
                const starMsg = yield (starChannel).messages.fetch(stars.id);
                console.log("aqui");
                yield starMsg.edit({ embeds: [embed] });
                if (parseInt(star[1]) - 1 < 5)
                    return setTimeout(() => starMsg.delete(), 1000);
            }
        });
    },
};
