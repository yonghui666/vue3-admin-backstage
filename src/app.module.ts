/*
 * @Author: yonghui666
 * @Date: 2022-01-19 16:13:27
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-07 10:33:59
 * @Description: 主模块
 */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ServerModule } from './server/server.module';
import * as Joi from '@hapi/joi';
import serverConfig from '../config/server.config';
import { SignMiddleware } from './middleware/sign.middleware';
import { LogMiddleware } from './middleware/log.middleware';
import { MysqlModule } from './db/mysql/mysql.module';
import { CacheModule } from './cache/cache.module';
import { LogModule } from './log/log.module';
import { OssModule } from './oss/oss.module';
import { TokenMiddleware } from './middleware/token.middleware';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env', // 配置文件路径，也可以配置为数组如['/config/.env1','.env']。
      ignoreEnvFile: false, // 取消忽略配置文件，为true则仅读取操作系统环境变量，常用于生产环境
      isGlobal: true, // 作用于全局
      load: [serverConfig], // 加载自定义配置项
      validationSchema: Joi.object({
        // 配置文件.env校验
        PORT: Joi.string().default('7000'), // 端口
        ENV: Joi.string() // 环境
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
      }),
    }),
    MailModule,
    ServerModule,
    MysqlModule,
    CacheModule,
    LogModule,
    OssModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SignMiddleware)
      .exclude(
        { path: 'api/upload-files', method: RequestMethod.POST },
        'api/test',
      ) // 多个过滤多个参数
      .forRoutes('*')

      .apply(TokenMiddleware)
      .exclude(
        // { path: 'api/upload-files', method: RequestMethod.POST },
        '/api/user/logout',
      ) // 多个过滤多个参数
      .forRoutes('*')

      .apply(LogMiddleware)
      // .forRoutes('users');
      .forRoutes('*');
  }
}
