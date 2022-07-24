/*
 * @Author: yonghui666
 * @Date: 2022-05-22 11:59:00
 * @LastEditTime: 2022-05-26 09:38:34
 * @LastEditors: yonghui666
 * @Description: 权限组
 */
import { GroupEntity } from 'src/db/mysql/entities/group.entity';
import { GroupTypes } from '../enum/permission.enum';

export class Group extends GroupEntity {
  constructor(
    createByUser: string,
    modifyByUser: string,
    groupName: string,
    type: GroupTypes,
  ) {
    super(createByUser, modifyByUser);
    this.group_name = groupName;
    this.type = type;
  }
}
