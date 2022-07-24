import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createSwagger } from './_swagger';
import { Logger } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import {
  AuthExceptionFilter,
  HttpExceptionFilter,
} from './filters/http-exception.filter';

async function bootstrap() {
  // 禁用logger会引起启动的错误不显示
  // const app = await NestFactory.create(AppModule, {
  //   logger: false,
  // });

  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const { PORT, ENABLE_SWAGGER } = config.get('SERVER_CONFIG');

  // 全局的logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.setGlobalPrefix('api'); // 路由添加api开头

  if (ENABLE_SWAGGER) createSwagger(app); // 文档插件

  // ------------- 全局注册拦截器 STR-------------
  app.useGlobalInterceptors(new TransformInterceptor());
  // ------------- 全局注册拦截器 END-------------

  // ------------- 全局注册错误的过滤器 STR-------------
  app.useGlobalFilters(new AuthExceptionFilter(), new HttpExceptionFilter());
  // ------------- 全局注册错误的过滤器 END-------------

  await app.listen(PORT);
  console.log(`服务运行于：http://127.0.0.1:${PORT}`);
}
bootstrap();
