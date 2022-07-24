/*
 * @Author: yonghui666
 * @Date: 2022-03-10 11:02:16
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-06 14:56:55
 * @Description: 资源
 */
import { Injectable } from '@nestjs/common';
import { FunKeys, FunKey, TitleList } from './enum/funKeys.enum';

@Injectable()
export class ResourceService {
  /**
   * 获取某类型资源
   * @param type
   * @returns
   */
  async getFunKeysByType(type: string): Promise<FunKey[]> {
    const res = FunKeys.filter((item) => {
      return item.type === type;
    });
    return res;
  }

  /**
   * 获取子级资源key
   * @param prantKey
   * @returns
   */
  async getFunKeysByPrantKey(prantKey: string): Promise<FunKey[]> {
    const res = FunKeys.filter((item) => {
      return item.parent_key === prantKey;
    });
    return res;
  }

  /**
   * 获取所有资源key
   * @returns
   */
  async getAllFunKeys(): Promise<FunKey[]> {
    return FunKeys;
  }

  /**
   * 获取大标题下的key
   * @returns
   */
  async getFunKeysForTitlePage(): Promise<FunKey[]> {
    return FunKeys.filter((funKey) => TitleList.includes(funKey.parent_key));
  }
}
