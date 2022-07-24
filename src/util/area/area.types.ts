/*
 * @Author: yonghui666
 * @Date: 2022-06-08 09:29:07
 * @LastEditTime: 2022-06-08 09:32:51
 * @LastEditors: yonghui666
 * @Description:
 */
export type AreaDes = {
  code: number;
  name: string;
  parent_code: number;
};

export type Area = {
  code: number;
  name: string;
  children?: Area[];
};
