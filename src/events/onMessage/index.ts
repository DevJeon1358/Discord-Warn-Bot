import { Message } from 'discord.js';
import DiscordClient from '../../client/Discord';
import Commands from './Commands';

const handler = async (message: Message) => {
  const client = DiscordClient.getInstance();
  if (!client) {
    throw new Error('Discord Bot is not inited');
  }

  if (message.content.startsWith(client.config.commandPrefix)) {
    Object.keys(Commands).forEach((c) => {
      const contentLowercase = message.content.toLowerCase();
      const commandPrefixLowercase = `${client.config.commandPrefix}${c.toLowerCase()}`;

      if (contentLowercase.startsWith(commandPrefixLowercase)) {
        Commands[c](message);
      }
    });
  }
};

export default handler;
