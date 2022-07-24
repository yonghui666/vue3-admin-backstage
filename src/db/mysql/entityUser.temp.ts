/*
 * @Author: yonghui666
 * @Date: 2022-03-08 17:43:04
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-29 10:46:13
 * @Description: 所有实体通用字段
 */

import { Column, Index } from 'typeorm';
import { EntityTemp } from './entity.temp';

export abstract class EntityUserTemp extends EntityTemp {
  constructor(createByUser: string, modifyByUser?: string) {
    super();
    this.create_by_user = createByUser || null;
    this.modify_by_user = modifyByUser || null;
  }

  @Index('idx_create_by_user')
  @Column({
    type: 'char',
    length: 16,
    nullable: true,
    comment: '创建者',
  })
  create_by_user: string;

  @Index('idx_modify_by_user')
  @Column({
    type: 'char',
    length: 16,
    nullable: true,
    comment: '最后修改者',
  })
  modify_by_user: string;
}
