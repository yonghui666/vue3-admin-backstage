/*
 * @Author: yonghui666
 * @Date: 2022-01-20 16:41:36
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-12 23:28:42
 * @Description: 请求返回接口
 */

import { TokenInfo } from 'src/server/auth/interfaces/auth.interfaces';
import { Request } from 'express';

export interface TokenRequest extends Request {
  tokenInfo: TokenInfo;
}
