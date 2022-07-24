/*
 * @Author: yonghui666
 * @Date: 2022-05-22 10:51:17
 * @LastEditTime: 2022-06-07 10:55:55
 * @LastEditors: yonghui666
 * @Description: 
 */
import { Inject } from '@nestjs/common';
import { createClientToken } from '../utils/create.token';
import { REDIS_CLIENT_DEFAULT_KEY } from '../redis.constant';

/**
 * 注入redis的客户端
 * @param name
 * @constructor
 */
export const InjectRedisClient = (name: string = REDIS_CLIENT_DEFAULT_KEY) => {
  return Inject(createClientToken(name));
};
