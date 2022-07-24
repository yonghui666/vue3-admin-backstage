/*
 * @Author: yonghui666
 * @Date: 2022-05-22 15:18:25
 * @LastEditTime: 2022-06-21 15:16:39
 * @LastEditors: yonghui666
 * @Description: 权限组
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { GroupEntity } from 'src/db/mysql/entities/group.entity';
import { GroupRelUserEntity } from 'src/db/mysql/entities/groupRelUser.entity';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { getManager, Repository } from 'typeorm';
import { Group } from './class/group.class';
import { GroupRelUser } from './class/groupRelUser.class';
import { GroupGlobalCacheKeys } from './enum/cache.enum';
import { FunKeyEnum, FunKeysMap, FunKeyType } from './enum/funKeys.enum';
import { GroupProperty, GroupTypes } from './enum/permission.enum';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,

    @InjectRepository(GroupRelUserEntity)
    private readonly groupRelUserRepository: Repository<GroupRelUserEntity>,

    private readonly cacheService: CacheService,
  ) {}

  /**
   * 创建新的权限组
   * @param newGroup
   * @returns
   */
  async creatGroup(newGroup: Group) {
    // 不能重名
    const oldGroupInfo = await this.groupRepository.findOne({
      group_name: newGroup.group_name,
    });
    if (!!oldGroupInfo) throw new AppHttpException(ErrHttpBack.err_group_hasd);

    return this.groupRepository.save(newGroup);
  }

  /**
   * 更新权限组信息
   * @param groupId
   * @param newGroup
   * @returns
   */
  async updateGroup(
    groupId: number,
    newGroup: { groupName: string; updateUserId: string },
  ): Promise<boolean> {
    const groupInfo = await this.getGroupInfoById(groupId);
    // 有些角色不能被更新
    if (groupInfo.property === GroupProperty.CANNOT_DEL)
      throw new AppHttpException(ErrHttpBack.err_group_cannot_change);

    // 不能重名
    const oldGroupInfo = await this.groupRepository.findOne({
      group_name: newGroup.groupName,
    });
    if (!!oldGroupInfo) throw new AppHttpException(ErrHttpBack.err_group_hasd);

    const { raw } = await this.groupRepository.update(
      { group_id: groupId, property: GroupProperty.NONE },
      { group_name: newGroup.groupName, modify_by_user: newGroup.updateUserId },
    );

    return raw ? true : false;
  }

  /**
   * 删除权限组（事务）
   * @param groupId
   * @returns
   */
  async delGroup(groupId: number): Promise<any> {
    const groupInfo = await this.getGroupInfoById(groupId);

    // 有些角色不能删除
    if (groupInfo.property === GroupProperty.CANNOT_DEL)
      throw new AppHttpException(ErrHttpBack.err_group_cannot_change);

    return await getManager().transaction(async (manager) => {
      const res = await manager.delete(GroupEntity, {
        group_id: groupId,
        property: GroupProperty.NONE,
      });

      // 删除关联
      await manager.delete(GroupRelUserEntity, { group_id: groupId });

      return res;
    });
  }

  /**
   * 获取用户的权限组列表
   * @param userId
   * @returns
   */
  async getUserGroupList(userId: string) {
    const groupRelList: GroupRelUserEntity[] =
      await this.groupRelUserRepository.find({
        relations: ['group'],
        where: { user_id: userId },
      });

    const groupList: Group[] = [];
    for (const iterator of groupRelList) {
      groupList.push(iterator.group);
    }

    return groupList;
  }

  /**
   * 获取权限组列表
   * @param groupType
   * @returns
   */
  async getGroupList(groupType?: GroupTypes) {
    const where: { type?: GroupTypes } = {};
    if (groupType in GroupTypes) where.type = groupType;
    return await this.groupRepository.find(where);
  }

  /**
   * 整理超级管理员的权限key
   * @param groupInfo
   */
  private forMatSuperGroupFunKeys(groupInfo: Group) {
    const { funkeys_fun, funkeys_page } = groupInfo;
    for (const funKeyInfo of FunKeysMap.values()) {
      const { key } = funKeyInfo;
      switch (funKeyInfo.type) {
        case FunKeyType.ViewPage:
          funkeys_page.push(key);
          break;

        case FunKeyType.ViewFun:
          funkeys_fun.push(key);
          break;
      }
    }
  }

  /**
   * 由名称获取
   * @param groupName
   * @returns
   */
  async getGroupInfoName(groupName: string) {
    return await this.groupRepository.findOne({
      group_name: groupName,
    });
  }

  /**
   * 获取超级管理员的信息
   * @returns
   */
  async getSuperGroupInfo(): Promise<Group> {
    // 缓存中拿取
    const cacheGroupInfo: Group = await this.cacheService.get(
      GroupGlobalCacheKeys.SUPER_ADMIN,
    );
    if (cacheGroupInfo) return cacheGroupInfo;

    const groupInfo = await this.groupRepository.findOne({
      type: GroupTypes.SuperAdmin,
    });
    this.cacheService.setKey(GroupGlobalCacheKeys.SUPER_ADMIN, groupInfo);

    return groupInfo;
  }

  /**
   * 由ID获取权限组信息
   * @param groupId
   * @returns
   */
  async getGroupInfoById(groupId: number) {
    const groupInfo = await this.groupRepository.findOne({ group_id: groupId });

    // 超级管理员获取全部的
    if (groupInfo.type === GroupTypes.SuperAdmin) {
      this.forMatSuperGroupFunKeys(groupInfo);
    }
    return groupInfo;
  }

  /**
   * 获取用户拥有的权限组列表
   * @param userId
   * @returns
   */
  async getUserRelGroups(userId: string): Promise<GroupRelUser[]> {
    return this.groupRelUserRepository.find({
      where: { user_id: userId },
      order: { update_at: 'DESC' },
    });
  }

  /**
   * 删除用户拥有的权限组列表
   * @param userId
   * @returns
   */
  async delUserRelGroups(userId: string) {
    return this.groupRelUserRepository.delete({
      user_id: userId,
    });
  }
  /**
   * 设置用户和权限的关系
   * @param userId
   * @param groupId
   * @returns
   */
  async addGroupRelUser(newRel: GroupRelUser) {
    return this.groupRelUserRepository.save(newRel);
  }

  /**
   * 更新权限组的页面权限
   * @param groupId
   * @param funKeysPage
   * @returns
   */
  async updateGroupFunKeysPage(
    groupId: number,
    funKeysPage: FunKeyEnum[],
  ): Promise<boolean> {
    const { raw } = await this.groupRepository.update(
      { group_id: groupId },
      { funkeys_page: funKeysPage },
    );

    return raw ? true : false;
  }

  /**
   * 验证用户和组是否关联
   * @param userId
   * @param groupId
   * @returns
   */
  async checkUserHasGroup(userId: string, groupId: number): Promise<boolean> {
    const res = await this.groupRelUserRepository.findOne({
      user_id: userId,
      group_id: groupId,
    });
    return !!res;
  }
}
