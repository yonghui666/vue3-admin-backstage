/*
 * @Author: yonghui666
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 17:37:34
 * @Description: 日志模块配置文件
 */
export default () => ({
  LOG_CONFIG: {
    LOG_DB_OPEN: process.env.NODE_ENV !== 'development' ? true : false,
    LABEL_NAME: 'bms-server',
    LOG_DB_URL: process.env.LOG_DB_URL || 'xxxx',
    LOG_DB_COL: process.env.LOG_DB_COL || 'logs',
  },
});
