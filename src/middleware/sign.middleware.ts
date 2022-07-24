/*
 * @Author: yonghui666
 * @Date: 2021-12-21 18:24:42
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:16:43
 * @Description: 全局日志中间件
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SignMiddleware implements NestMiddleware {
  use(req: Request, resp: Response, next: () => void) {
    console.log(`${req.method} ${req.path}`);
    next();
  }
}
