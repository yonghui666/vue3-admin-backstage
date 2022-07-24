/*
 * @Author: yonghui666
 * @Date: 2022-06-07 10:35:11
 * @LastEditTime: 2022-06-07 11:29:59
 * @LastEditors: yonghui666
 * @Description: 测试定时任务
 */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksSchedule {
  private readonly logger = new Logger(TasksSchedule.name);

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // handleCron() {
  //   console.log('=============');
  // }
}
