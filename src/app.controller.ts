/*
 * @Author: yonghui666
 * @Date: 2022-02-17 13:57:15
 * @LastEditTime: 2022-05-19 16:53:49
 * @LastEditors: yonghui666
 * @Description: 你好
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
