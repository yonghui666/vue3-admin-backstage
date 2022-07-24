/*
 * @Author: yonghui666
 * @Date: 2022-02-18 09:19:15
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-17 15:27:54
 * @Description: 缓存器
 */
import { Injectable } from '@nestjs/common';
import { InjectRedisClient } from './redis/decorators';
import * as Redis from 'ioredis';
import Redlock from 'redlock';
import { Lock } from 'redlock';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedisClient('test') private client: Redis.Redis, // 启用redis // @InjectRedisClient('0') private redisClient0: Redis.Redis, // 多链接
  ) {
    this.redlock = new Redlock([this.getClient()], {
      retryDelay: 200, // time in ms
      retryCount: 5,
    });
  }

  redlock: Redlock;

  getClient(): Redis.Redis {
    return this.client;
  }

  // 多链接
  // getClient0() {
  //     return this.redisClient0;
  // }

  /**
   * 设置key-value
   * @param key
   * @param value
   * @param seconds
   * @returns
   */
  async setKey(key: string, value: any, seconds?: number): Promise<boolean> {
    value = JSON.stringify(value);
    if (!seconds) {
      return !!(await this.client.set(key, value));
    }

    return !!(await this.client.set(key, value, 'EX', seconds));
  }

  /**
   * 获取值
   * @param key
   * @returns
   */
  async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  /**
   * 清除值
   * @param key
   * @returns
   */
  async del(key: string): Promise<boolean> {
    const data = await this.client.del(key);
    return !!data;
  }

  /**
   * 设置过期时间
   * @param key
   * @param times
   * @returns
   */
  async setPexire(key: string, times = 0): Promise<boolean> {
    const data = await this.client.pexpire(key, times);
    return data === 1;
  }

  // ======================= 分布式锁 STR =======================
  // const redlock = new Redlock([client1], {
  //   retryDelay: 200, // time in ms
  //   retryCount: 5,
  // });

  // 多个 Redis 实例
  // const redlock = new Redlock(
  //     [new Redis(6379, "127.0.0.1"), new Redis(6379, "127.0.0.2"), new Redis(6379, "127.0.0.3")],
  // )

  // Acquire a lock.
  // let lock = await redlock.acquire(["a"], 5000);
  // try {
  //   // Do something...
  //   await something();

  //   // Extend the lock.
  //   lock = await lock.extend(5000);

  //   // Do something else...
  //   await somethingElse();
  // } finally {
  //   // Release the lock.
  //   await lock.release();
  // }

  /**
   * 加锁
   * @param keys
   * @param ttl
   * @returns
   */
  async addLock(keys: string[], ttl: number): Promise<Lock> {
    return await this.redlock.acquire(keys, ttl);
  }

  /**
   * 延长锁
   * @param ttl
   */
  async extendLock(lock: Lock, ttl: number): Promise<Lock> {
    return await lock.extend(ttl);
  }

  /**
   * 释放锁
   * @param lock
   * @returns
   */
  async releaseLock(lock: Lock): Promise<any> {
    return await lock.release();
  }

  // ======================= 分布式锁 END =======================
}
