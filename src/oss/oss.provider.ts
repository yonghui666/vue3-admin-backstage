/*
 * @Author: yonghui666
 * @Date: 2022-02-18 09:38:19
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:19:02
 * @Description: 文件描述
 */
import * as OSS from 'ali-oss';
import { NotFoundException, Provider } from '@nestjs/common';

export class OssProvider {
  /**
   * 创建连接
   * @param options
   */
  private static createClient(options: OSS.Options): OSS {
    return new OSS(options);
  }

  /**
   * 得到 oss 客户端连接的 provider
   * @return {Provider}
   */
  public static createClientProvider(
    options: OSS.Options,
    resetName?: string,
  ): Provider {
    return {
      provide: resetName || 'OSS_CLIENT_PROVIDER',
      useFactory: () => {
        return this.createClient(options);
      },
      // inject: ['OSS_CLIENT_PROVIDER'],
    };
  }
}
