import Warn from '../models/Warn';
import WarnRepository from '../repository/Warn';

class WarnService {
  public async getWarns(did: string): Promise<Warn[]> {
    const warnResult = WarnRepository.find({
      where: {
        did,
      },
    });

    return warnResult;
  }

  public async getModWarns(modDid: string): Promise<Warn[]> {
    const warnResult = WarnRepository.find({
      where: {
        modDid,
      },
    });

    return warnResult;
  }

  public async getWarnCount(did: string): Promise<number> {
    const warnResult = await WarnRepository.findAndCount({
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

    const addResult = WarnRepository.save(warn);
    return addResult;
  }

  public async removeWarn(id: number): Promise<Warn> {
    const removeEntity = new Warn();
    removeEntity.id = id;

    return WarnRepository.remove(removeEntity);
  }
}

export default WarnService;
