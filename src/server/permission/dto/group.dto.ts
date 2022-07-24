/*
 * @Author: yonghui666
 * @Date: 2022-06-02 09:04:12
 * @LastEditTime: 2022-06-02 17:54:50
 * @LastEditors: yonghui666
 * @Description: 权限组DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AddGroupDto {
  @ApiProperty()
  @IsString({ message: '权限组名必须是字符' })
  @Expose()
  group_name: string;
}

export class UpdateGroupInfoDto {
  @ApiProperty()
  @IsNumber({ allowNaN: false }, { message: '权限组id必须是数字' })
  @Type(() => Number)
  @Expose()
  group_id: number = null;
}
