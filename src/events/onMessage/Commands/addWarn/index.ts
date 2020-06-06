import { Message, TextChannel, MessageEmbed } from 'discord.js';
import DiscordClient from '../../../../client/Discord';
import WarnService from '../../../../services/WarnService';

const handler = async (message: Message, client: DiscordClient) => {
  const warnService = new WarnService();
  const commandParams = message.content.split(' ');
  if (commandParams.length !== 3) {
    await message.reply(`올바르지 않은 명령 사용: ${client.config.commandPrefix}addWarn [ID] [사유]`);
    return null;
  }

  const guild = await client.guilds.resolve(client.config.serverId);

  const targetId = commandParams[1];
  const reason = commandParams[2];

  const targetGuildUser = await guild.member(targetId);
  if (!targetGuildUser) {
    await message.reply('해당 사용자는 서버에 가입되어 있지 않습니다.');
    return null;
  }

  const result = await warnService.addWarn(targetGuildUser.id, message.author.id, reason);
  await message.delete();
  await message.reply(`성공적으로 경고를 추가하였습니다.\nID: ${result.id}\nDID: <@!${result.did}>\n처리 관리자: <@!${result.modDid}>\n사유: ${result.reason}`);

  const warnChannel = guild.channels.resolve(client.config.warnChannelId);
  if (!warnChannel) {
    return null;
  }

  if (!(warnChannel instanceof TextChannel)) {
    return null;
  }

  const embedMessage = new MessageEmbed({
    title: `${targetGuildUser.user.username}#${targetGuildUser.user.discriminator} 유저가 경고되었습니다!`,
    description: '관리자가 위 사용자를 경고하였습니다.',
    color: '#ff0000',
    fields: [
      {
        name: '경고 사유',
        value: result.reason,
      },
    ],
    thumbnail: {
      url: guild.iconURL(),
      height: 80,
      width: 80,
    },
  });

  await warnChannel.send(embedMessage);
};

export default handler;
