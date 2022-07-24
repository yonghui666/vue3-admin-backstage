/*
 * @Author: yonghui666
 * @Date: 2022-06-10 09:21:58
 * @LastEditTime: 2022-06-10 16:59:51
 * @LastEditors: yonghui666
 * @Description: id生成
 */
import * as _ from 'lodash';
import * as moment from 'moment';

export class IdUtil {
  static dateId(i?: number): string {
    if (i === undefined) i = _.random(0, 99999);
    if (i > 99999) return null;

    const bit = i.toString().length;
    const tempRandomNum = 10 ** bit + i;
    const tempRandomStr = tempRandomNum.toString().slice(1);
    const idStr = this.getNowTimeNumber() + tempRandomStr;

    return idStr;
  }

  static getNowTimeNumber(): string {
    return moment().format('YYYYMMDDHHmmss');
  }
}
