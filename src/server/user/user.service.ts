/*
 * @Author: yonghui666
 * @Date: 2022-01-20 15:33:18
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-07-14 16:53:30
 * @Description: 用户服务
 */
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
  FindOperator,
  getManager,
  ILike,
  Like,
  Raw,
  Repository,
} from 'typeorm';
import { User } from './class/user.class';
import { UserEntity } from 'src/db/mysql/entities/user.entity';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { Access } from './class/access.class';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { AccessEntity } from 'src/db/mysql/entities/access.entity';
import { ActionUserDto, EditUserDto, GetUsersDto } from './dto/user.dto';
import { TableResponse } from 'src/global/interface/table.interface';
import { GroupRelUser } from '../permission/class/groupRelUser.class';
import { GroupService } from '../permission/group.service';
import { UserStatus } from './enum/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,

    private readonly groupService: GroupService,
  ) {}

  /**
   * @description: 创建数据
   * @param {CreateUsersDto} createUsersInfo
   * @return:
   */
  async create(
    createUsersInfo: User,
    newAccessInfo: Pick<Access, 'salt' | 'password'>,
  ): Promise<User> {
    try {
      return await getManager().transaction(async (manager) => {
        const user = manager.create(UserEntity, createUsersInfo);
        const userInfo = await manager.save(UserEntity, user);

        const newAccess = new Access(
          userInfo.user_id,
          newAccessInfo.password,
          newAccessInfo.salt,
        );
        const accessEntity = manager.create(AccessEntity, newAccess);
        await manager.save(AccessEntity, accessEntity);
        return userInfo;
      });
    } catch (error) {
      throw new AppHttpException(ErrHttpBack.err_user_had);
    }
  }

  /**
   * 获取用户的账户信息
   * @param userId
   * @returns
   */
  async getAccessInfoBuUserId(userId: string): Promise<Access> {
    return await this.accessRepository.findOne({
      user_id: userId,
    });
  }

  /**
   * 更新用户密码
   * @param userId
   * @param newPassword
   * @returns
   */
  async updateUserPassword(
    userId: string,
    newPassword: { password: string; salt: string },
  ): Promise<any> {
    const { password, salt } = newPassword;
    const { affected } = await this.accessRepository.update(
      {
        user_id: userId,
      },
      { password, salt },
    );

    return affected === 1;
  }

  async getUserInfoByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOne({ phone });
  }

  async getUserInfoById(userId: string): Promise<User> {
    const userInfo: User = await this.userRepository.findOne({
      user_id: userId,
    });
    return userInfo;
  }

  /**
   * 获取用户列表
   * @param getUsersDto
   * @returns
   */
  async findAll(getUsersDto: GetUsersDto): Promise<TableResponse<User>> {
    const { user_id, user_name, phone, group_id, serving } = getUsersDto;

    const where: {
      user_id?: string;
      user_name?: FindOperator<string>;
      phone?: FindOperator<string>;
      serving?: string;
      group_ids?: FindOperator<string>;
      likes?: FindOperator<string>;
      status: UserStatus;
    } = { status: UserStatus.NORMAL };

    if (user_id) where.user_id = user_id;
    if (user_name) where.user_name = Like(`%${user_name}%`);
    if (phone) where.phone = Like(`%${phone}%`);
    if (serving) where.serving = serving;

    if (group_id)
      where.group_ids = Raw(
        () => 'JSON_CONTAINS( group_ids , JSON_ARRAY(:group_id) )',
        { group_id: Number.parseInt(group_id) },
      );

    const { page_no, page_size, paging } = getUsersDto;
    const pageInfo = paging
      ? {
          skip: (page_no - 1) * page_size,
          take: page_size,
        }
      : {};

    const [userList, count]: [User[], number] =
      await this.userRepository.findAndCount({
        where,
        ...pageInfo,
        order: {
          create_at: 'DESC',
        },
        skip: (page_no - 1) * page_size,
        take: page_size,
      });

    const ret: TableResponse<User> = {
      page_no,
      page_size,
      total_count: count,
      list: userList,
    };
    return ret;
  }

  /**
   * @description: 更新用户
   * @param userId
   * @return
   */
  async update(
    userId: string,
    newData: EditUserDto & { modify_by_user: string },
  ): Promise<boolean> {
    const { group_ids, group_ids_change } = newData;

    // 更新用户信息
    delete newData.group_ids_change;
    const { affected } = await this.userRepository.update(
      { user_id: userId },
      newData,
    );

    if (group_ids_change) {
      // 更新权限 删除再添加
      await this.groupService.delUserRelGroups(userId);

      for (const groupId of group_ids) {
        const groupInfo = await this.groupService.getGroupInfoById(groupId);
        if (!groupInfo) continue;

        const newRel = new GroupRelUser(groupId, userId);
        newRel.group = groupInfo;
        await this.groupService.addGroupRelUser(newRel);
      }
    }

    return affected === 1;
  }

  /**
   * 软删除用户
   * @param userId
   * @returns
   */
  async delById(userId: string): Promise<any> {
    return await this.userRepository.update(
      { user_id: userId },
      { status: UserStatus.DISABLE },
    );
  }
}
