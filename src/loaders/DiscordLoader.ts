import { ClientEvents } from 'discord.js';
import { discord as DiscordConfig } from '../../config/config.json';
import DiscordClient from '../client/Discord';
import events from '../events';
import colorConsole from '../utils/colorConsole';

class DiscordLoader {
  public static async load() {
    colorConsole.gray('[DISCORD] Initing Bot');

    const client = new DiscordClient();
    type eventKeys = keyof ClientEvents;

    // Add Discord Event Handlers
    Object.keys(events).forEach((e: eventKeys) => {
      colorConsole.gray(`[DISCORD] Adding Event: ${e}`);
      client.on(e, events[e]);
    });

    client.setConfig(DiscordConfig);
    DiscordClient.setInstance(client);

    await client.login(DiscordConfig.token);
  }
}

export default DiscordLoader;
