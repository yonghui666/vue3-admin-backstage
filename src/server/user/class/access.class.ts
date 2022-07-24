import { AccessEntity } from 'src/db/mysql/entities/access.entity';

/*
 * @Author: yonghui666
 * @Date: 2022-05-19 22:20:04
 * @LastEditTime: 2022-05-20 11:50:42
 * @LastEditors: yonghui666
 * @Description:
 */
export class Access extends AccessEntity {
  constructor(userId: string, password: string, salt: string) {
    super();
    this.user_id = userId;
    this.password = password;
    this.salt = salt;
  }
}
