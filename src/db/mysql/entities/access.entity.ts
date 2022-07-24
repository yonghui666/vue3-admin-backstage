/*
 * @Author: Nevin
 * @Date: 2021-10-20 09:36:28
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-21 19:06:35
 * @Description: 用户的账户表
 */
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { EntityTemp } from '../entity.temp';

@Entity({
  name: 'tb_access',
  synchronize: false, // 自动同步
})
export abstract class AccessEntity extends EntityTemp {
  @PrimaryColumn({
    type: 'char',
    length: 36,
    nullable: false,
    comment: '用户ID',
  })
  user_id: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '密码盐',
  })
  salt: string;
}
