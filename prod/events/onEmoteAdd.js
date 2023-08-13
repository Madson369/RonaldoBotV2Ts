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
    name: discord_js_1.Events.MessageReactionAdd,
    once: false,
    execute(reaction, user) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __awaiter(this, void 0, void 0, function* () {
            const message = reaction.message;
            const channelId = reaction.message.channelId;
            const guildId = reaction.message.guildId;
            const messageId = reaction.message.id;
            const messageLink = `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
            if (reaction.emoji.name !== "💀")
                return;
            const count = (_d = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.cache) === null || _b === void 0 ? void 0 : _b.get("💀")) === null || _c === void 0 ? void 0 : _c.count) !== null && _d !== void 0 ? _d : 0;
            if (count < 5) {
                return;
            }
            // if (message.author.id === user.id)
            //   return message.channel.send(
            //     `${user}, deu react na propria mensagem lmao.`
            //   );
            if ((_e = message === null || message === void 0 ? void 0 : message.author) === null || _e === void 0 ? void 0 : _e.bot) {
                return message.channel.send(`${user}, ta dando react em bot pq parça.`);
            }
            // const { starboardChannel } = reaction.client.settings.get(message.guild.id);
            const starChannel = (_f = message === null || message === void 0 ? void 0 : message.guild) === null || _f === void 0 ? void 0 : _f.channels.cache.get("1083854425296207872");
            if (!starChannel)
                return message.channel.send(`achei o canal n.`);
            //----------------------------------
            const fetch = yield (starChannel).messages.fetch({ limit: 100 });
            const stars = fetch.find((m) => {
                var _a, _b, _c, _d;
                return (((_b = (_a = m === null || m === void 0 ? void 0 : m.embeds[0]) === null || _a === void 0 ? void 0 : _a.footer) === null || _b === void 0 ? void 0 : _b.text.startsWith("💀")) &&
                    ((_d = (_c = m === null || m === void 0 ? void 0 : m.embeds[0]) === null || _c === void 0 ? void 0 : _c.footer) === null || _d === void 0 ? void 0 : _d.text.endsWith(message.id)));
            });
            // Now we setup an if statement for if the message is found within the starboard.
            if (stars) {
                // Regex to check how many stars the embed has.
                const star = (_k = /^\💀\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec((_j = (_h = (_g = stars === null || stars === void 0 ? void 0 : stars.embeds[0]) === null || _g === void 0 ? void 0 : _g.footer) === null || _h === void 0 ? void 0 : _h.text) !== null && _j !== void 0 ? _j : '')) !== null && _k !== void 0 ? _k : '';
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
                        url: (_m = (_l = foundStar === null || foundStar === void 0 ? void 0 : foundStar.image) === null || _l === void 0 ? void 0 : _l.url) !== null && _m !== void 0 ? _m : "",
                    },
                    author: foundStar.author,
                    footer: { text: `💀 ${parseInt(star[1]) + 1} | ${message.id}` },
                    fields: [
                        {
                            name: "",
                            value: `[O cringe em questão](${messageLink})`,
                            inline: false,
                        },
                    ],
                };
                // We fetch the ID of the message already on the starboard.
                const starMsg = yield (starChannel).messages.fetch(stars.id);
                // And now we edit the message with the new embed!
                yield starMsg.edit({ embeds: [embed] });
                return;
            }
            // Now we use an if statement for if a message isn't found in the starboard for the message.
            if (!stars) {
                // We use the this.extension function to see if there is anything attached to the message.
                let image = "";
                const attachments = [...message.attachments];
                if (attachments[0] && attachments[0][1] && attachments[0][1].url) {
                    image = attachments[0][1].url;
                }
                const testeEmbed = {
                    color: 15844367,
                    description: message.cleanContent,
                    image: {
                        url: image !== null && image !== void 0 ? image : "",
                    },
                    author: {
                        name: (_o = message === null || message === void 0 ? void 0 : message.author) === null || _o === void 0 ? void 0 : _o.username,
                        iconURL: (_p = message === null || message === void 0 ? void 0 : message.author) === null || _p === void 0 ? void 0 : _p.avatarURL(),
                    },
                    footer: { text: `💀 5 | ${message.id}` },
                    fields: [
                        {
                            name: "",
                            value: `[O cringe em questão](${messageLink})`,
                            inline: false,
                        },
                    ],
                };
                yield (starChannel).send({ embeds: [testeEmbed] });
            }
        });
    },
};
