/*
 * @Author: yonghui666
 * @Date: 2022-03-03 16:59:23
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:19:07
 * @Description: oss函数
 */
import { Injectable, Inject, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';
import * as moment from 'moment';
import { Duplex } from 'stream';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OssService {
  constructor(
    @Inject('OSS_CLIENT_PROVIDER') private client: OSS, // 启用redis
    private configService: ConfigService, // 启用redis
  ) {}

  getImgList() {
    return this.client.listV2();
  }

  /**
   * 获取完整url中的文件名即去除host域名
   * @param url
   * @returns
   */
  getFileNameFromUrl(url: string) {
    const tempStr = url.split(
      `${this.configService.get('OSS_CONFIG.HOST_URL')}/`,
    );
    return tempStr.length <= 0 ? '' : tempStr[tempStr.length - 1];
  }

  /**
   * 文件上传
   * @param {Express.Multer.File} file 文件buffer流对象
   * @param {string | undefined} path 路径，不传就会使用‘nopath’前缀
   * @param {string | undefined} newName 新的文件名
   * @param {string | undefined} permanent 是否为永久目录，默认临时
   * @returns
   */
  async upFileStream(
    file: Express.Multer.File,
    path?: string,
    newName?: string,
    permanent?: boolean,
  ) {
    const { buffer, originalname, mimetype } = file;

    path =
      (permanent ? '' : 'temp/') +
      (path || `nopath/${moment().format('YYYYMM')}`);
    newName = newName || uuidv4();

    const tempStr = mimetype.split('/');
    const fileTypeStr = tempStr[tempStr.length - 1];

    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);

    try {
      const upRes = await this.client.putStream(
        `${path}/${newName}.${fileTypeStr}`,
        stream,
      );

      const {
        name,
        url,
        res: { statusCode },
      } = upRes;

      if (statusCode !== HttpStatus.OK) throw new Error('文件上传失败');

      const a = {
        name,
        url,
        host: this.configService.get('OSS_CONFIG.HOST_URL'),
      };

      return a;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 将临时目录文件转到新的目录文件
   * @param filePath
   * @param newFilePath 不填就是去除temp标识
   * @returns
   */
  async changeFilePath(
    filePath: string,
    newFilePath?: string,
  ): Promise<string> {
    const hostUrl = this.configService.get('OSS_CONFIG.HOST_URL');
    // 干掉前置
    filePath = filePath.replace(`${hostUrl}/`, '');
    // 复制文件
    newFilePath = newFilePath || filePath.replace('temp/', '');
    try {
      const {
        res: { statusCode },
      } = await this.client.copy(newFilePath, filePath);
      if (statusCode !== HttpStatus.OK) throw new Error('文件上传失败');
      return newFilePath;
    } catch (error) {
      throw error;
    }
  }
}
