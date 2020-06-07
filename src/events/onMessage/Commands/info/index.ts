import { Message, MessageEmbed } from 'discord.js';
import DiscordClient from '../../../../client/Discord';
import WarnService from '../../../../services/WarnService';

const handler = async (message: Message, client: DiscordClient) => {
  const warnService = new WarnService();

  const commandParams = message.content.split(' ');
  if (commandParams.length !== 2) {
    await message.reply(`올바르지 않은 명령 사용: ${client.config.commandPrefix}info [DID]`);
    return null;
  }

  const targetDid = commandParams[1];
  const guild = await client.guilds.resolve(client.config.serverId);
  if (!guild) {
    throw new Error('Could not found guild');
  }

  const targetGuildMember = await guild.member(targetDid);
  if (!targetGuildMember) {
    await message.reply(`해당 사용자를 찾을 수 없습니다: <@!${targetDid}>`);
    return null;
  }

  const embed = new MessageEmbed();
  embed.setColor('#6766CC');
  embed.setTitle(`${targetGuildMember.user.username}#${targetGuildMember.user.discriminator}`);
  embed.setThumbnail(targetGuildMember.user.avatarURL());

  embed.setDescription(`AKA: ${targetGuildMember.nickname === null ? targetGuildMember.user.username : targetGuildMember.nickname}`);

  embed.addField('Discord Account ID', `<@!${targetDid}> (${targetDid})`, false);
  embed.addField('Discord Account Created', targetGuildMember.user.createdAt.toLocaleString(), false);
  embed.addField('Guild Joined', new Date(targetGuildMember.joinedTimestamp).toLocaleString(), false);

  const warns = await warnService.getWarns(targetDid);
  embed.addField('Warns', `${warns.length} Warns`);
  warns.forEach((e) => {
    embed.addField(`Warn #${e.id}`, `${e.reason}\n처리 관리자: <@!${e.modDid}>`, true);
  });

  await message.delete();
  await message.channel.send(embed);
};

export default handler;
