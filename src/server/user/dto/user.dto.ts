/*
 * @Author: yonghui666
 * @Date: 2021-04-21 18:21:11
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-22 14:07:20
 * @Description: 用户接口类型
 */
import {
  IsString,
  IsInt,
  IsEmail,
  IsEmpty,
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { TableDto } from 'src/global/dto/table.dto';

export class InitAddUsersDto {
  @ApiProperty() // 文档标识
  @IsPhoneNumber('CN', { message: '请填写正确的中国区域手机号码' })
  @Expose()
  readonly phone: string;

  @ApiProperty()
  @IsString({ message: '初始化code必须是字符' })
  @Expose()
  init_code: string;

  @ApiProperty()
  @Expose()
  @IsString({ message: '用户名必须是字符' })
  user_name: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  @Expose()
  password: string;
}
export class CreateUsersDto {
  @ApiProperty() // 文档标识
  @IsEmail()
  readonly u_mail: string;

  @ApiProperty()
  @IsString({ message: '验证码必须是字符' })
  readonly code: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  password: string;
}

export class LoginByPhoneDto {
  @ApiProperty() // 文档标识
  @IsPhoneNumber('CN', { message: '请填写正确的中国区域手机号码' })
  @Expose()
  readonly phone: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  @Expose()
  password: string;

  @ApiProperty()
  @IsBoolean({ message: '需要后端md5加密' })
  @IsOptional()
  @Expose()
  needmd5?: boolean;
}

export class UpdateUsersDto {
  @Type(() => Number)
  @IsInt({ message: '年龄必须是数值' })
  @IsOptional()
  readonly age?: number;

  @IsString({ message: '昵称必须是字符' })
  @IsOptional()
  readonly user_name?: string;
}

export class ActionUserDto {
  @ApiProperty()
  @IsString({ message: '用户名必须是字符' })
  @Expose()
  user_name: string;

  @ApiProperty() // 文档标识
  @IsPhoneNumber('CN')
  @Expose()
  readonly phone: string;

  @ApiProperty()
  @IsArray({ message: '权限组必须是字符数组' })
  @Expose()
  group_ids: number[];
}

export class EditUserDto extends ActionUserDto {
  @ApiProperty()
  @IsBoolean({ message: '权限组修改标识必须是布尔类型' })
  @Type(() => Boolean)
  @Expose()
  group_ids_change?: boolean;
}

export class GetUsersDto extends TableDto {
  @IsString({ message: '用户ID' })
  @IsOptional()
  @Expose()
  readonly user_id?: string;

  @IsString({ message: '用户名必须是字符' })
  @IsOptional()
  @Expose()
  readonly user_name?: string;

  @IsString({ message: '用户手机号必须是字符' })
  @IsOptional()
  @Expose()
  readonly phone?: string;

  @IsString({ message: '权限组ID必须是字符' })
  @IsOptional()
  @Expose()
  readonly group_id?: string;

  @IsString({ message: '在职状态有误' })
  @IsOptional()
  @Expose()
  readonly serving?: string;
}

export class PasswordDto {
  @ApiProperty()
  @IsString({ message: '原密码必须是字符' })
  @Expose()
  old_password: string;

  @ApiProperty()
  @IsString({ message: '密码必须是字符' })
  @Expose()
  password: string;
}
