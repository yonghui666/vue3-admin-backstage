/*
 * @Author: yonghui666
 * @Date: 2022-05-22 11:20:52
 * @LastEditTime: 2022-06-06 14:57:53
 * @LastEditors: yonghui666
 * @Description: 权限模块
 */
import { Global, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/db/mysql/entities/group.entity';
import { GroupRelUserEntity } from 'src/db/mysql/entities/groupRelUser.entity';
import { ResourceService } from './resource.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, GroupRelUserEntity])],
  providers: [PermissionService, GroupService, ResourceService],
  controllers: [PermissionController],
  exports: [PermissionService, GroupService, ResourceService],
})
export class PermissionModule {}
