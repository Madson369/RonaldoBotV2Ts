import { Events } from "discord.js";
import { MessageReaction, User, TextChannel } from 'discord.js';

module.exports = {
  name: Events.MessageReactionAdd,
  once: false,
  async execute(reaction: MessageReaction, user: User) {
    const message = reaction.message;

    const channelId = reaction.message.channelId;
    const guildId = reaction.message.guildId;
    const messageId = reaction.message.id;

    const messageLink = `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;

    if (reaction.emoji.name !== "💀") return;

    const count = message?.reactions?.cache?.get("💀")?.count ?? 0
    if (count < 5) {
      return;
    }
    // if (message.author.id === user.id)
    //   return message.channel.send(
    //     `${user}, deu react na propria mensagem lmao.`
    //   );
    if (message?.author?.bot) {
      return message.channel.send(`${user}, ta dando react em bot pq parça.`);
    }
    // const { starboardChannel } = reaction.client.settings.get(message.guild.id);
    const starChannel = message?.guild?.channels.cache.get("1083854425296207872") as TextChannel ?? message?.guild?.channels.cache.get("1195053450501820426") as TextChannel;

    if (!starChannel) return message.channel.send(`achei o canal n.`);

    //----------------------------------

    const fetch = await (starChannel).messages.fetch({ limit: 100 });

    const stars = fetch.find((m) => {
      return (
        m?.embeds[0]?.footer?.text.startsWith("💀") &&
        m?.embeds[0]?.footer?.text.endsWith(message.id)
      );
    });

    // Now we setup an if statement for if the message is found within the starboard.
    if (stars) {
      // Regex to check how many stars the embed has.
      const star = /^\💀\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
        stars?.embeds[0]?.footer?.text ?? ''
      ) ?? ''

      const foundStar = stars.embeds[0];
      let image = "";
      const attachments = [...message.attachments];
      if (attachments[0] && attachments[0][1] && attachments[0][1].url) {
        image = attachments[0][1].url;
      }

      const embed: any = {
        color: foundStar.color,
        description: foundStar.description,
        image: {
          url: foundStar?.image?.url ?? "",
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
      const starMsg = await (starChannel).messages.fetch(stars.id);
      // And now we edit the message with the new embed!
      await starMsg.edit({ embeds: [embed] });
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

      const testeEmbed: any = {
        color: 15844367,
        description: message.cleanContent,
        image: {
          url: image ?? "",
        },
        author: {
          name: message?.author?.username,
          iconURL: message?.author?.avatarURL(),
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



      await (starChannel).send({ embeds: [testeEmbed] });
    }
  },
};
