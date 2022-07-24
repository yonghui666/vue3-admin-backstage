/*
 * @Author: Nevin
 * @Date: 2021-10-21 09:39:50
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-07-08 15:41:44
 * @Description: 用户组表
 */
import { FunKeyEnum } from 'src/server/permission/enum/funKeys.enum';
import {
  GroupProperty,
  GroupTypes,
} from 'src/server/permission/enum/permission.enum';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { EntityUserTemp } from '../entityUser.temp';
import { GroupRelUserEntity } from './groupRelUser.entity';

@Entity({
  name: 'tb_group',
  synchronize: false, // 自动同步
})
export abstract class GroupEntity extends EntityUserTemp {
  @PrimaryGeneratedColumn({
    comment: '组ID',
  })
  group_id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
    comment: '用户组名称',
  })
  group_name: string;

  @Index('idx_type')
  @Column({
    type: 'tinyint',
    nullable: false,
    comment: '类型: 0 超级管理员 1 角色 2 成员',
  })
  type: GroupTypes;

  @Index('property_idx')
  @Column({
    type: 'tinyint',
    nullable: false,
    comment: '权限特性: 0 无特性 1 不可删除',
    default: GroupProperty.NONE,
  })
  property: GroupProperty;

  @Column({
    type: 'json',
    nullable: true,
    comment: '一级权限的key',
  })
  funkeys_page: FunKeyEnum[] = [];

  @Column({
    type: 'json',
    nullable: true,
    comment: '高级设置权限的key',
  })
  funkeys_fun: FunKeyEnum[] = [];

  @OneToMany(
    () => GroupRelUserEntity, // 关联字段必须使用xxxEntity类
    (groupRelUser) => {
      groupRelUser.group;
    },
  )
  group_rel_user?: GroupRelUserEntity[];
}
