/*
 * @Author: yonghui666
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-22 18:29:57
 * @Description: 服务配置文件
 */
export default () => ({
  SERVER_CONFIG: {
    PORT: 9528,
    ENABLE_SWAGGER: process.env.NODE_ENV !== 'production' ? true : false,
  },
});
