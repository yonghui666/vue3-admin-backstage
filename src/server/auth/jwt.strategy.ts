/*
 * @Author: yonghui666
 * @Date: 2022-01-21 09:45:49
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-20 15:31:02
 * @Description: JWT 的验证策略
 */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { TokenInfo } from './interfaces/auth.interfaces';
import { DefAuthSecret } from './constant';
import { User } from '../user/class/user.class';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET || DefAuthSecret,
    });
  }

  /**
   * 被守卫调用的验证方法
   * @param payload
   * @returns
   */
  async validate(payload: TokenInfo): Promise<User> {
    const { phone } = payload;
    const userInfo: User = await this.userService.getUserInfoByPhone(phone);

    if (!userInfo) {
      // throw new UnauthorizedException();
      throw new AppHttpException(ErrHttpBack.err_user_had);
    }
    return userInfo;
  }
}
