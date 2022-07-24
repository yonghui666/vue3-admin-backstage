/*
 * @Author: yonghui666
 * @Date: 2022-01-21 14:28:19
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-22 15:51:11
 * @Description: 认证相关接口
 */

export interface Password {
  password: string; // 密码
  salt: string; // 盐
}

export interface TokenInfo {
  readonly phone: string;
  readonly user_id: string;
  readonly user_name: string;
  readonly group_id: number;
}
