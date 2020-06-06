import { getRepository } from 'typeorm';
import Warn from '../models/Warn';

const WarnRepository = getRepository(Warn);

export default WarnRepository;
