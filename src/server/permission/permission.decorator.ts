/*
 * @Author: yonghui666
 * @Date: 2022-03-11 11:50:03
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-27 10:53:59
 * @Description: 权限守卫注解
 */
import { SetMetadata } from '@nestjs/common';
import { FunKeyEnum } from './enum/funKeys.enum';

export const Permissions_Metadata_Tag = 'permissions';

export const Permissions = (...permissions: FunKeyEnum[]) =>
  SetMetadata(Permissions_Metadata_Tag, permissions);
