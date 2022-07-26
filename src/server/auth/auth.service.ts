/*
 * @Author: yonghui666
 * @Date: 2022-01-21 09:42:13
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-22 18:51:15
 * @Description: 文件描述
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from './util';
import { Password, TokenInfo } from './interfaces/auth.interfaces';
import { User } from '../user/class/user.class';

@Injectable()
export class AuthService {
  secretKey = 'niuniu';
  constructor(
    // private readonly userService: UserService, // 可用，没用到
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 生成密码
   * @param password
   * @returns
   */
  generatePassword(password: string): Password {
    return encryptPassword(password);
  }

  /**
   * 校验用户信息
   * @param userPassword 用户密码
   * @param userSalt 盐值
   * @param password 密码
   * @returns
   */
  async validatePassWord(
    userPassword: string,
    userSalt: string,
    password: string,
  ): Promise<boolean> {
    // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
    const { password: hashPassword } = encryptPassword(password, userSalt);
    return userPassword === hashPassword;
  }

  /**
   * 生成Token
   * @param user
   * @returns
   */
  async generateToken(tokenInfo: TokenInfo): Promise<string>;
  async generateToken(tokenInfo: User, groupId: number): Promise<string>;
  async generateToken(
    tokenInfo: User | TokenInfo,
    groupId?: number,
  ): Promise<string> {
    const payload: TokenInfo = {
      phone: tokenInfo.phone,
      user_id: tokenInfo.user_id,
      user_name: tokenInfo.user_name,
      group_id: groupId || (tokenInfo as TokenInfo).group_id,
    };
    return `Bearer ${this.jwtService.sign(payload)}`;
  }

  /**
   * @description: 解析token获取认证用户信息
   * @param {string} authorizationToken // ctx.header.authorization
   * @return {Promise<TokenInfo>}
   */
  async decryptToken(authorizationToken: string): Promise<TokenInfo> {
    authorizationToken = authorizationToken.replace('Bearer ', '');
    return this.jwtService.verify(authorizationToken);
  }

  /**
   * 重置Token
   * @param tokenInfo
   * @returns
   */
  async resetToken(tokenInfo: TokenInfo): Promise<string> {
    const payload: TokenInfo = {
      phone: tokenInfo.phone,
      user_id: tokenInfo.user_id,
      user_name: tokenInfo.user_name,
      group_id: tokenInfo.group_id,
    };
    return `Bearer ${this.jwtService.sign(payload)}`;
  }
}
