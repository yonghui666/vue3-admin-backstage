/*
 * @Author: yonghui666
 * @Date: 2022-02-18 09:18:59
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-13 23:01:29
 * @Description: 文件描述
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from 'config/redis.config';
import { CacheService } from './cache.service';
import { RedisModule } from './redis/redis.module';

const REDIS_CONFIG = redisConfig().REDIS_CONFIG;
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfig], // 加载自定义配置项
    }),
    RedisModule.forRoot(REDIS_CONFIG),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
