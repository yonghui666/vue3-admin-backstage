/*
 * @Author: yonghui666
 * @Date: 2022-01-20 15:56:08
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:10:44
 * @Description: 全局拦截器 慢日志打印
 */
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NormalResponse } from 'src/global/interface/response.interface';

interface Response<T> {
  result: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const startTime = Date.parse(new Date().toString());

    const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    const request = ctx.getRequest();

    const reqUrl = request.originalUrl;

    return next.handle().pipe(
      map((data) => {
        // 慢日志 打印警告 STR
        const ruqTime = Date.parse(new Date().toString()) - startTime;
        if (ruqTime >= 50) {
          Logger.verbose({
            level: 'verbose',
            message: reqUrl,
            mate: ruqTime,
          });
        }
        // 慢日志 打印警告 END

        const res: NormalResponse = {
          result: data,
          code: 0,
          message: '请求成功',
          url: reqUrl,
        };

        if (reqUrl.indexOf('/oss/upload/permanent') != -1) {
          const newData: any = data;
          const url = <string>newData.url;
          return {
            result: null,
            errno: 0, // 注意：值是数字，不能是字符串
            data: {
              url, // 图片 src ，必须
              // alt: 'yyy', // 图片描述文字，非必须
              // href: 'zzz', // 图片的链接，非必须
            },
          };
        }

        return res;
      }),
    );
  }
}
