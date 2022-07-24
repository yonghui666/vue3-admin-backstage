/*
 * @Author: yonghui666
 * @Date: 2022-01-20 16:41:36
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-03-14 11:22:10
 * @Description: 请求返回接口
 */

export interface NormalResponse {
    result: any, // 数据
    message: string, // 信息
    code: 0, // 自定义code
    url: string, // 错误的url地址
}

export interface ErrorResponse {
    result: any, // 数据
    message: string, // 信息
    code: string, // 自定义code
    url: string, // 错误的url地址
}