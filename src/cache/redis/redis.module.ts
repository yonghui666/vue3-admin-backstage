/*
 * @Author: yonghui666
 * @Date: 2022-02-18 09:40:07
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-07 10:55:14
 * @Description: 文件描述
 */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RedisModuleAsyncOption, RedisModuleOptions } from './redis.interface';
import { RedisCoreModule } from './redis-core.module';

@Module({})
export class RedisModule {
  /**
   * 注册所有的 redis 连接
   * @param options
   */
  static forRoot(
    options: RedisModuleOptions | RedisModuleOptions[],
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options)],
    };
  }

  /**
   * 异步获取redis客户端
   * @param options
   * @param injectOption
   */
  static forAsync(
    options: Partial<RedisModuleOptions> | Array<Partial<RedisModuleOptions>>,
    injectOption: RedisModuleAsyncOption,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forAsync(options, injectOption)],
    };
  }
}
