/*
 * @Author: Nevin
 * @Date: 2021-10-21 09:39:50
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-13 15:39:29
 * @Description: 组-用户-关联表
 */

import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { EntityTemp } from '../entity.temp';
import { GroupEntity } from './group.entity';
import { UserEntity } from './user.entity';

@Entity({
  synchronize: true, // 自动同步
  name: 'tb_group_rel_user',
})
@Index(['group_id', 'user_id'], { unique: true })
export abstract class GroupRelUserEntity extends EntityTemp {
  @PrimaryGeneratedColumn({
    comment: '关系ID',
  })
  ref_id: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '组ID',
  })
  group_id: number;

  @Column({
    name: 'user_id',
    type: 'char',
    length: 16,
    comment: '用户ID',
  })
  user_id: string;

  @ManyToOne(() => GroupEntity, (group) => group.group_rel_user, {
    nullable: false,
  })
  @JoinColumn({ name: 'group_id', referencedColumnName: 'group_id' })
  group!: GroupEntity;

  @ManyToOne(() => UserEntity, (user) => user.group_rel_user, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user!: UserEntity;
}
