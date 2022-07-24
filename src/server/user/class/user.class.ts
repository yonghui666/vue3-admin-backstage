import { UserEntity } from 'src/db/mysql/entities/user.entity';

/*
 * @Author: yonghui666
 * @Date: 2022-05-19 22:20:04
 * @LastEditTime: 2022-06-21 19:05:03
 * @LastEditors: yonghui666
 * @Description:
 */
export class User extends UserEntity {
  constructor(
    createByUser: string,
    modifyByUser: string,
    userId: string,
    userName: string,
    phone: string,
  ) {
    super(createByUser, modifyByUser);
    this.user_id = userId;
    this.user_name = userName;
    this.phone = phone;
  }

  static IntUserPassword = '000000';
}
