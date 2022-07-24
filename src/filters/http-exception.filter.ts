/*
 * @Author: yonghui666
 * @Date: 2022-01-20 16:05:23
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:15:29
 * @Description: 文件描述
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorResponse } from 'src/global/interface/response.interface';

import { errHttpBackMap, ErrorHttpBack } from './http-exception.back-code';

const BASE_ERROR_CODE = '1';

interface ExceptionResponseObj {
  message?: '';
  statusCode?: '';
  error?: '';
}

// 临时解决不返回401 STR
@Catch(Error)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    Logger.error({
      url: request.originalUrl,
      level: 'error',
      message: request.originalUrl,
      mate: error.stack,
      stack: error.stack,
    });

    const errorResponse: ErrorResponse = {
      result: '',
      message: '',
      code: BASE_ERROR_CODE, // 自定义code
      url: request.originalUrl, // 错误的url地址
    };

    response.status(
      ['Unauthorized', 'jwt expired'].includes(error.message)
        ? HttpStatus.UNAUTHORIZED
        : HttpStatus.INTERNAL_SERVER_ERROR,
    );
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
// 临时解决不返回401 END
export class AppHttpException extends HttpException {
  constructor(errKey: string) {
    super(errKey, HttpStatus.OK);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 定义错误的返回对象
    const errorResponse: ErrorResponse = {
      result: exception.getResponse(),
      message: '',
      code: '', // 自定义code
      url: request.originalUrl, // 错误的url地址
    };

    const defErrHttpBack = errHttpBackMap.get('fail');
    const errObj = exception.getResponse(); // 获取的错误返回对象

    if (typeof errObj === 'object') {
      errorResponse.message =
        (<ExceptionResponseObj>errObj).message || defErrHttpBack.message;
      errorResponse.code =
        (<ExceptionResponseObj>errObj).error || defErrHttpBack.errCode;
      errorResponse.result = errObj;
    }

    if (typeof errObj === 'string') {
      const errBackObj =
        errHttpBackMap.get(exception.message) || defErrHttpBack;

      errorResponse.code = errBackObj.errCode;
      errorResponse.message = errBackObj.message;
      errorResponse.result = '';
    }

    Logger.log(errorResponse.code + ':' + errorResponse.message);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
