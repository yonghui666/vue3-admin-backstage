/*
 * @Author: yonghui666
 * @Date: 2022-03-08 17:43:04
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-22 14:58:44
 * @Description: 所有实体通用字段
 */

import { BaseEntity, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export abstract class EntityTemp extends BaseEntity {
  @Index('idx_create_at')
  @CreateDateColumn({
    type: 'datetime',
    length: 0,
    comment: '创建时间',
    readonly: true,
  }) // 自动生成列
  create_at: Date;

  @Index('idx_update_at')
  @UpdateDateColumn({ type: 'datetime', length: 0, comment: '更新时间' }) // 自动生成并自动更新列
  update_at: Date;
}
