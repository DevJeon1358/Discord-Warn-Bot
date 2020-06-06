import { Message } from 'discord.js';
import DiscordClient from '../../client/Discord';
import Commands from './Commands';

const handler = async (message: Message) => {
  const client = DiscordClient.getInstance();
  if (!client) {
    throw new Error('Discord Bot is not inited');
  }

  const guild = await client.guilds.resolve(client.config.serverId);
  if (!guild) {
    throw new Error(`Could not found server ID, ${client.config.serverId}`);
  }

  const guildMember = await guild.member(message.author.id);
  let roleResult = await Promise.all(client.config.modRoleId.map((e) => {
    if (guildMember.roles.cache.has(e)) {
      return true;
    }

    return false;
  }));

  roleResult = roleResult.filter((e) => e === true);

  if (message.content.startsWith(client.config.commandPrefix) && roleResult.length > 0) {
    Object.keys(Commands).forEach((c) => {
      const contentLowercase = message.content.toLowerCase();
      const commandPrefixLowercase = `${client.config.commandPrefix}${c.toLowerCase()}`;

      if (contentLowercase.startsWith(commandPrefixLowercase)) {
        Commands[c](message, client);
      }
    });
  }
};

export default handler;
