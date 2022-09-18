import { sign, verify } from 'jsonwebtoken';
import { enviroment } from '../enviroment';

export class AuthHelper {
  static async signJwt(payload: any) {
    return await sign(payload, enviroment.SECRET_AUTH, {
      algorithm: 'HS256',
    });
  }

  static async verifyBearerToken(token: string) {
    const tokenToVerify = token.replace('Bearer ', '');
    return await verify(tokenToVerify, enviroment.SECRET_AUTH, {
      algorithms: ['HS256'],
    });
  }
}
