/*
 * @Author: yonghui666
 * @Date: 2022-03-04 10:40:22
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:18:52
 * @Description: 文件描述
 */
import OSS from 'ali-oss';

export interface OssOptions extends OSS.Options {}

export interface OssModuleAsyncOption {
  imports?: any;
  useValue?: OSS.Options;
  useFactory?: (...args: any[]) => OSS.Options; // 生成options的构造函数
  inject?: any[]; // 注入
}
