import { Message } from 'discord.js';

const handler = async (message: Message) => {
  await message.reply('test');
};

export default handler;
