/*
 * @Author: yonghui666
 * @Date: 2022-03-10 11:04:42
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-07-01 14:03:38
 * @Description: 权限标识常量枚举
 */

export enum FunKeyType {
  ViewPage = 'view_page', // 页面
  ViewCom = 'view_com', // 组件
  ViewFun = 'view_fun', // 按钮
  Api = 'api', // 路由
}

export interface FunKey {
  key: FunKeyEnum;
  type: FunKeyType;
  name: string;
  parent_key: FunKeyEnum;
}

/**
 * 定义规则：父级枚举 加 ‘-’ 加本级 id数值
 */
export enum FunKeyEnum {
  Title_Home = '1',
  // Page_Work_Place = '1-1', // 工作台 (默认必有的页面，不在权限中使用)

  Title_Permission_Test = '2',
  Page_Product = '2-1',
  Page_Ui = '2-2',

  Title_System_Management = '10', // 系统管理
  Page_Mine_Info = '10-1', // 个人中心页
  Page_Change_Password = '10-2', // 修改密码页
  Page_Member_Management = '10-3', // 成员管理页
  Page_Role_Management = '10-4', // 角色管理页面
}

// 标题列表
export const TitleList: Array<FunKeyEnum> = [
  FunKeyEnum.Title_Home,
  FunKeyEnum.Title_Permission_Test,
  FunKeyEnum.Title_System_Management,
];

export const FunKeysMap = new Map([
  // 主页
  // [
  //   FunKeyEnum.Page_Work_Place,
  //   {
  //     key: FunKeyEnum.Page_Work_Place,
  //     type: FunKeyType.ViewPage,
  //     name: '工作台页', 工作台 (默认必有的页面，不在权限中使用)
  //     parent_key: FunKeyEnum.Title_Home,
  //   },
  // ],
  // 权限测试页面
  [
    FunKeyEnum.Page_Product,
    {
      key: FunKeyEnum.Page_Product,
      type: FunKeyType.ViewPage,
      name: '产品经理',
      parent_key: FunKeyEnum.Title_Permission_Test,
    },
  ],
  [
    FunKeyEnum.Page_Ui,
    {
      key: FunKeyEnum.Page_Ui,
      type: FunKeyType.ViewPage,
      name: 'UI设计',
      parent_key: FunKeyEnum.Title_Permission_Test,
    },
  ],

  // 系统管理
  [
    FunKeyEnum.Page_Mine_Info,
    {
      key: FunKeyEnum.Page_Mine_Info,
      type: FunKeyType.ViewPage,
      name: '我的信息',
      parent_key: FunKeyEnum.Title_System_Management,
    },
  ],
  [
    FunKeyEnum.Page_Change_Password,
    {
      key: FunKeyEnum.Page_Change_Password,
      type: FunKeyType.ViewPage,
      name: '修改密码',
      parent_key: FunKeyEnum.Title_System_Management,
    },
  ],
  [
    FunKeyEnum.Page_Member_Management,
    {
      key: FunKeyEnum.Page_Member_Management,
      type: FunKeyType.ViewPage,
      name: '人员管理',
      parent_key: FunKeyEnum.Title_System_Management,
    },
  ],
  [
    FunKeyEnum.Page_Role_Management,
    {
      key: FunKeyEnum.Page_Role_Management,
      type: FunKeyType.ViewPage,
      name: '角色管理',
      parent_key: FunKeyEnum.Title_System_Management,
    },
  ],
]);
export const FunKeys: Array<FunKey> = [...FunKeysMap.values()];
export const FunKeyStrs: Array<FunKeyEnum> = [...FunKeysMap.keys()];
