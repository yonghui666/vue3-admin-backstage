/*
 * @Author: Nevin
 * @Date: 2021-10-21 09:39:50
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-20 18:59:18
 * @Description: 用户表
 */
import { UserServings, UserStatus } from 'src/server/user/enum/user.enum';
import { Entity, PrimaryColumn, Column, Index, OneToMany } from 'typeorm';
import { EntityUserTemp } from '../entityUser.temp';
import { GroupRelUserEntity } from './groupRelUser.entity';

@Entity({
  name: 'tb_user',
  synchronize: false,
})
export abstract class UserEntity extends EntityUserTemp {
  @PrimaryColumn({
    type: 'char',
    length: 16,
    comment: '用户ID',
  })
  user_id: string;

  @Index('user_name_idx')
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '用户名',
  })
  user_name: string;

  @Index('phone_idx')
  @Column({
    type: 'char',
    length: 20,
    nullable: false,
    unique: true,
    comment: '手机号',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '邮箱号',
    nullable: true,
  })
  mail: string;

  @Index('serving_idx')
  @Column({
    type: 'tinyint',
    nullable: false,
    comment: '在职状态 1 在职 2 离职',
    default: UserServings.ON,
  })
  serving: UserServings;

  @Index('status_idx')
  @Column({
    type: 'tinyint',
    nullable: false,
    comment: '状态 1 正常 2 已删除',
    default: UserStatus.NORMAL,
  })
  status: UserStatus;

  @Column({
    type: 'json',
    comment: '所有拥有的权限组(方便查询用)',
    nullable: true,
  })
  group_ids: number[];

  @OneToMany(
    () => GroupRelUserEntity,
    (groupRelUser) => {
      groupRelUser.user;
    },
  )
  group_rel_user: GroupRelUserEntity[];
}
