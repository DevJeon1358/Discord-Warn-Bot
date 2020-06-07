import { Message } from 'discord.js';
import DiscordClient from '../../../../client/Discord';
import WarnService from '../../../../services/WarnService';

const handler = async (message: Message, client: DiscordClient) => {
  const warnService = new WarnService();
  const commandParams = message.content.split(' ');
  if (commandParams.length !== 2) {
    await message.reply(`올바르지 않은 명령 사용: ${client.config.commandPrefix}removeWarn [Warn ID]`);
    return null;
  }

  try {
    parseInt(commandParams[1], 10);
  } catch (error) {
    await message.reply('올바른 숫자를 입력하세요.');
  }

  await warnService.removeWarn(parseInt(commandParams[1], 10));
  await message.reply(`성공적으로 경고(\`${commandParams[1]}\`) 를 제거하였습니다.`);
};

export default handler;
