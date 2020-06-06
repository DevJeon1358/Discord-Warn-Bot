import { Message } from 'discord.js';
import DiscordClient from '../../../../client/Discord';

const handler = async (message: Message, client: DiscordClient) => {
  // Changed in discord.js version 12, from client.ping to client.ws.ping
  await message.reply(`${client.ws.ping} MS`);
};

export default handler;
