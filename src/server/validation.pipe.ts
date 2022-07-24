/*
 * @Author: niuwenzheng
 * @Date: 2020-04-14 15:29:18
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-24 16:07:57
 * @Description: 参数验证管道
 */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as _ from 'lodash';

function getValidConstraints(validationError: ValidationError) {
  const { children, constraints } = validationError;
  if (!!constraints) {
    return constraints;
  }

  return getValidConstraints(children[0]);
}
@Injectable()
export class ParamsValidationPipe implements PipeTransform<any> {
  private toValidate(metatype: unknown): boolean {
    const types: unknown[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    // 数据转换成类
    const inData: any = plainToClass(metatype, value, {
      excludeExtraneousValues: true, // 过滤掉非@Expose()标识字段
    });

    const errors = await validate(inData, {
      whitelist: true, // 白名单
      forbidUnknownValues: true, // 禁止未知值
    });

    if (errors.length <= 0) return inData;

    const showConstraints = getValidConstraints(errors[0]);
    const showError = _.values(showConstraints)[0];

    throw new BadRequestException(`参数验证失败：${showError} `);
  }
}
