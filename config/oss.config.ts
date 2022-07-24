/*
 * @Author: yonghui666
 * @Date: 2022-01-20 11:05:02
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 17:47:55
 * @Description: OSS模块配置文件
 */
export default () => ({
  OSS_CONFIG: {
    INIT_OPTION: {
      region: 'oss-cn-beijing',
      accessKeyId: process.env.OSS_KEY_ID || 'xxxx',
      accessKeySecret: process.env.OSS_KEY_SECRET || 'xxxx',
      bucket: process.env.OSS_BUCKET || '',
    },
    HOST_URL: process.env.OSS_URL || '',
  },
});
