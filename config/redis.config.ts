/*
 * @Author: yonghui666
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-07-14 13:27:24
 * @Description: 服务配置文件
 */
export default () => ({
  REDIS_CONFIG: [
    {
      name: 'test',
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || '',
      db: Number.parseInt(process.env.REDIS_DB) || 0,
    },
  ],
});
