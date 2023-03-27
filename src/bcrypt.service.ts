import { Injectable } from '@nestjs/common/decorators';
import { compare as bCompare, hash as bHash } from 'bcrypt';

const rounds = 10;

@Injectable()
export class BcryptService {
  async hash(password: string) {
    return await bHash(password, rounds);
  }

  async compare(password: string, hash: string) {
    return await bCompare(password, hash);
  }
}
