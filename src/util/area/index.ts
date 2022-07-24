/*
 * @Author: yonghui666
 * @Date: 2022-03-21 10:02:43
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-08 09:35:37
 * @Description: 中国的地区
 */

import { AreaList } from './areaList';
import { AreaMap } from './areaMap';
import { AreaDes, Area } from './area.types';

export { AreaList, AreaMap, AreaDes, Area };
export class AreaUtil {
  // constructor() {}

  /**
   *  根据城市ID获取省份ID；
   */
  static getProvinceId(cityId: number): number {
    return Math.floor(cityId / 1000) * 1000;
  }
}
