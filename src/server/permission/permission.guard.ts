/*
 * @Author: yonghui666
 * @Date: 2022-03-11 10:54:34
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-27 10:57:50
 * @Description: 文件描述
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { AuthService } from '../auth/auth.service';
import { TokenInfo } from '../auth/interfaces/auth.interfaces';
import { FunKeyEnum } from './enum/funKeys.enum';
import { Permissions_Metadata_Tag } from './permission.decorator';
import { PermissionService } from './permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    // 必须有token
    const token = request.headers['authorization'];
    if (!token) throw new AppHttpException(ErrHttpBack.err_no_permission);

    // 获取路由需求的权限列表
    const permissions: FunKeyEnum[] = this.reflector.get<FunKeyEnum[]>(
      Permissions_Metadata_Tag,
      context.getHandler(),
    );
    if (permissions.length) return true;

    // 验证是否有权限
    const tokenInfo: TokenInfo = await this.authService.decryptToken(token);
    const perRes = await this.permissionService.verifyTokenPermissions(
      tokenInfo.group_id,
      ...permissions,
    );
    if (perRes) return true;

    throw new AppHttpException(ErrHttpBack.err_no_permission);
  }
}
