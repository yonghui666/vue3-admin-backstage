/*
 * @Author: yonghui666
 * @Date: 2021-12-25 14:16:53
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-10 09:20:45
 * @Description: 字符串工具
 */
const CHAR_STR =
  'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
export class StrUtil {
  static RandomIndex(min: number, max: number, i: number) {
    let index = Math.floor(Math.random() * (max - min + 1) + min);
    const numStart = CHAR_STR.length - 10;
    //如果字符串第一位是数字，则递归重新获取
    if (i == 0 && index >= numStart) {
      index = this.RandomIndex(min, max, i);
    }
    //返回最终索引值
    return index;
  }

  static getRandomString(len = 15) {
    const min = 0;
    const max = CHAR_STR.length - 1;
    let _str = '';
    //循环生成字符串
    for (let i = 0, index: number; i < len; i++) {
      index = this.RandomIndex(min, max, i);
      _str += CHAR_STR[index];
    }
    return _str;
  }
}
