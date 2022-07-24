import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

/*
 * @Author: yonghui666
 * @Date: 2022-03-17 18:14:52
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:09:32
 * @Description: 文件描述
 */
export class TableDto {
  @Type(() => Number)
  @IsInt({ message: '页码必须是数值' })
  @IsOptional()
  @Expose()
  readonly page_no?: number = 1;

  @Type(() => Number)
  @IsInt({ message: '每页个数必须是数值' })
  @Expose()
  @IsOptional()
  readonly page_size?: number = 10;

  @Type(() => Number)
  @IsInt({ message: '分页标识必须是数值' })
  @IsOptional()
  readonly paging?: number = 1;
}
