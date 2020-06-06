import { getRepository } from 'typeorm';
import Warn from '../models/Warn';

class WarnRepository {
  public static getRepository() {
    const warnRepository = getRepository(Warn);
    return warnRepository;
  }
}

export default WarnRepository;
