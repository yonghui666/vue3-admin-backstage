/*
 * @Author: yonghui666
 * @Date: 2022-03-07 13:37:06
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-05-19 20:18:46
 * @Description: 文件上传
 */
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Headers,
  Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ParamsValidationPipe } from 'src/server/validation.pipe';
import { OssService } from './oss.service';

@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: any,
  ) {

    const secondPath: string = headers['second-path'];

    return await this.ossService.upFileStream(file, secondPath);
  }

  @Post('upload/permanent')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPermanentFile(
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: any,
  ) {

    const secondPath: string = headers['second-path'];

    return await this.ossService.upFileStream(file, secondPath, null, true);
  }

  @Post('upload/list')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFileList(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers() headers: any,
  ) {
    const secondPath: string = headers['second-path'];
    files.forEach((file) => {
      this.ossService.upFileStream(file, secondPath);
    });
    return { status: 'ok' };
  }

  @Post('blob')
  uploadBlob(@Body(new ParamsValidationPipe()) p) {
    console.log(p);
    return {}
  }

  @Post('change') // 测试后关闭
  async changeFile(@Body(new ParamsValidationPipe()) body: any) {
    return await this.ossService.changeFilePath(body.filePath);
  }
}
