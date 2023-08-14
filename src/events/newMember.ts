import { Events } from "discord.js";
import { CommandInteraction, TextChannel } from 'discord.js';

const messageChannel = "810605680498311208";
const rulesChannel = "807419813357420555";
const rolesChannel = "1006575997900034098";

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  execute(info: CommandInteraction) {
    if (!info.guild) return

    const canalRegra = `${info.guild.channels.cache
      .get(rulesChannel)
      ?.toString()}`

    const canalCargo = `${info.guild.channels.cache
      ?.get(rolesChannel)
      ?.toString()
      }`

    const message = `<:fluffy:914732955702800384> <@${info.user.id
      }> <:fluffy:914732955702800384> muito boas - vindas ao server, lembre - se de checkar as ${canalRegra} e escolher seus ${canalCargo}
`;

    if (!info.guild) return
    const channel = info.guild.channels.cache.get(messageChannel);
    if (!channel) return
    (channel as TextChannel).send(message);
  },
};
