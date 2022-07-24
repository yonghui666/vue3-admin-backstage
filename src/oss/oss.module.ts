/*
 * @Author: yonghui666
 * @Date: 2022-03-03 16:50:53
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:52:51
 * @Description: 阿里云OSS文件存储
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ossConfig from 'config/oss.config';
import { OssCoreModule } from './oss-core.module';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ossConfig], // 加载自定义配置项
    }),
    OssCoreModule.forRoot(ossConfig().OSS_CONFIG.INIT_OPTION),
    // OssCoreModule.forRoot((configService: ConfigService) =>  // 后期可尝试改成工厂模式
    //   configService.get('OSS_CONFIG.INIT_OPTION'),
    // ),
    // OssCoreModule.forRoot(ossConfig().OSS_API_CONFIG.INIT_OPTION, 'api_oss'), // 多oss示例
  ],
  controllers: [OssController],
  providers: [OssService],
  exports: [OssService],
})
export class OssModule {}
