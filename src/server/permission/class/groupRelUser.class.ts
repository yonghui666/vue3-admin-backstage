/*
 * @Author: yonghui666
 * @Date: 2022-05-22 11:59:00
 * @LastEditTime: 2022-06-13 15:40:03
 * @LastEditors: yonghui666
 * @Description: 权限组
 */
import { GroupRelUserEntity } from 'src/db/mysql/entities/groupRelUser.entity';

export class GroupRelUser extends GroupRelUserEntity {
  constructor(groupId: number, userId: string) {
    super();
    this.group_id = groupId;
    this.user_id = userId;
  }
}
