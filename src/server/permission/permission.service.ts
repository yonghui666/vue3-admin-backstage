/*
 * @Author: yonghui666
 * @Date: 2022-05-22 11:21:32
 * @LastEditTime: 2022-06-27 11:01:01
 * @LastEditors: yonghui666
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { FunKey, FunKeyEnum, FunKeys, FunKeysMap } from './enum/funKeys.enum';
import { GroupTypes } from './enum/permission.enum';
import { GroupService } from './group.service';

@Injectable()
export class PermissionService {
  constructor(private readonly groupService: GroupService) {}

  /**
   * 验证token中的权限
   * @param {string} userId
   * @param {FunKeyEnum[]} funKeys 需要的权限funkeys
   * @returns {void}
   */
  async verifyTokenPermissions(
    groupId: number,
    ...funKeys: FunKeyEnum[]
  ): Promise<boolean> {
    const nowFunKeys: FunKey[] = await this.getFunKeysByGroupId(groupId);
    if (!nowFunKeys.length) return false;

    // 已有权限map
    const nowFunKeyMap: Map<string, object> = new Map();
    for (const iterator of nowFunKeys) {
      nowFunKeyMap.set(iterator.key, iterator);
    }

    // 已有权限中是否包含需求权限，全部包含则通过
    for (const funKey of funKeys) {
      if (!nowFunKeyMap.get(funKey)) return false;
    }

    return true;
  }

  /**
   * 获取某个组的权限funkeys
   * @param {number} groupId
   * @returns {FunKey[]} []
   */
  async getFunKeysByGroupId(groupId: number): Promise<FunKey[]> {
    const { funkeys_page, funkeys_fun, type } =
      await this.groupService.getGroupInfoById(groupId);

    if (type === GroupTypes.SuperAdmin) return FunKeys; // 超级管理员权限

    const hasFunkeys: FunKey[] = [];
    for (const funkey of [...funkeys_page, ...funkeys_fun]) {
      hasFunkeys.push(FunKeysMap.get(funkey));
    }

    return hasFunkeys;
  }
}
