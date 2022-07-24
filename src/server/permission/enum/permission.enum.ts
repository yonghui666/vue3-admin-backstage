/*
 * @Author: yonghui666
 * @Date: 2022-03-21 14:14:23
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-02 14:23:31
 * @Description: 权限相关枚举
 */
export enum GroupTypes {
  SuperAdmin = 0, // 超级管理员
  Role = 1, // 角色
  Member = 2, // 成员
}

export enum GroupProperty {
  NONE = 0, // 无
  CANNOT_DEL = 1, // 不能被删除
}

export enum GroupCtlDataTypes {
  Shop = 1, // 门店
  Menber = 2, // 成员
  Store = 3, // 站点
}

export enum GroupCtlDataMenberTypes {
  NoOne = 0,
  Mine = 1, // 本人
  CompanyAndMine = 2, // 本公司及本人
  DepartmentAndMine = 3, // 本部门及本人
  AssignAndMine = 4, // 本人及指定人
}

export enum CtlStatus {
  Open = 1,
  Close = 0,
}
