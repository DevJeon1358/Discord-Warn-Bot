import { Repository } from 'typeorm';
import Warn from '../models/Warn';
import WarnRepository from '../repository/Warn';

class WarnService {
  private warnRepository: Repository<Warn>;

  constructor() {
    this.warnRepository = WarnRepository.getRepository();
  }

  public async getWarns(did: string): Promise<Warn[]> {
    const warnResult = this.warnRepository.find({
      where: {
        did,
      },
    });

    return warnResult;
  }

  public async getModWarns(modDid: string): Promise<Warn[]> {
    const warnResult = this.warnRepository.find({
      where: {
        modDid,
      },
    });

    return warnResult;
  }

  public async getWarnCount(did: string): Promise<number> {
    const warnResult = await this.warnRepository.findAndCount({
      where: {
        did,
      },
    });

    return warnResult[1];
  }

  public async addWarn(did: string, modDid: string, reason: string): Promise<Warn> {
    const warn = new Warn();
    warn.did = did;
    warn.modDid = modDid;
    warn.reason = reason;

    const addResult = this.warnRepository.save(warn);
    return addResult;
  }

  public async removeWarn(id: number): Promise<Warn> {
    const removeEntity = new Warn();
    removeEntity.id = id;

    return this.warnRepository.remove(removeEntity);
  }
}

export default WarnService;
