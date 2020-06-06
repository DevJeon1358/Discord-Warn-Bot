import { createConnection, ConnectionOptions } from 'typeorm';
import Config from '../../config/config.json';
import colorConsole from '../utils/colorConsole';

class TypeORMLoader {
  public static load() {
    const options = Config.database as ConnectionOptions;
    createConnection(options);
    colorConsole.green('[TypeORM] Created Connection');
  }
}

export default TypeORMLoader;
