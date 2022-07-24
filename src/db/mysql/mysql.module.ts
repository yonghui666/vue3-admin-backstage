/*
 * @Author: yonghui666
 * @Date: 2022-02-17 15:07:38
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-22 15:12:23
 * @Description: mysql数据库
 */
import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import mysqlConfig from 'config/mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mysqlConfig], // 加载自定义配置项
      validationSchema: Joi.object({
        // 配置文件.env校验
        MYSQL_HOST: Joi.string().default('localhost'),
        port: Joi.number().default(3306),
        synchronize: Joi.boolean() // 是否反向同步
          .valid(true, false)
          .default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      // name: 'api_mysql', // 用于多数据配置的标识
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mysqlConfig = await configService.get('MYSQL_CONFIG');
        return {
          ...mysqlConfig,
          type: 'mysql',
          entities: [`${__dirname}/entities*/*.entity{.ts,.js}`], // 扫描所有实体类
          // timezone: '+8:00', // 时区调整
        };
      },
    }),
  ],
})
export class MysqlModule {}
