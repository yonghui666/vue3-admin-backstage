/*
 * @Author: yonghui666
 * @Date: 2022-01-20 15:33:08
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-07-05 17:49:08
 * @Description: 文件描述
 */
import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/mysql/entities/user.entity';
import { AccessEntity } from 'src/db/mysql/entities/access.entity';
import { TasksSchedule } from './user.schedule';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccessEntity])],
  providers: [UserService, TasksSchedule],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
