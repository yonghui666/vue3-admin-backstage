/*
 * @Author: yonghui666
 * @Date: 2021-12-25 14:16:53
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-30 12:56:54
 * @Description: 文件描述
 */
import * as moment from 'moment';

export class TimeUtil {
  constructor();
  constructor(obj: any);
  constructor(obj?: any) {
    return null;
  }

  static getNeedTime(timeNum: number): string;
  static getNeedTime(timeStr: string): number;
  static getNeedTime(theTime: number | string): string | number {
    if (typeof theTime === 'number')
      return moment(theTime).format('YYYY-MM-DD HH:mm:ss');
    return moment(theTime).valueOf();
  }

  static getNowTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  static getThanOneYear() {
    return moment().subtract(1, 'y').format('YYYY-MM-DD HH:mm:ss');
  }
}
