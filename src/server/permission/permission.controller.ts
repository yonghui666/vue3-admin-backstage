/*
 * @Author: yonghui666
 * @Date: 2022-05-22 11:21:47
 * @LastEditTime: 2022-06-21 11:41:32
 * @LastEditors: yonghui666
 * @Description: 权限
 */
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheService } from 'src/cache/cache.service';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { TokenRequest } from 'src/global/interface/request.interface';
import { TokenInfo } from '../auth/interfaces/auth.interfaces';
import { ParamsValidationPipe } from '../validation.pipe';
import { Group } from './class/group.class';
import { AddGroupDto, UpdateGroupInfoDto } from './dto/group.dto';
import { FunKeyEnum } from './enum/funKeys.enum';
import { GroupTypes } from './enum/permission.enum';
import { GroupService } from './group.service';
import { ResourceService } from './resource.service';
@ApiTags('权限')
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly groupService: GroupService,
    private readonly resourceService: ResourceService,
  ) {}

  @ApiOperation({ description: '获取用户当前登录的权限组信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('group/mine/info')
  getGroupInfo(@Request() tokenRes: TokenRequest) {
    const { group_id }: TokenInfo = tokenRes.tokenInfo;
    return this.groupService.getGroupInfoById(group_id);
  }

  @ApiOperation({ description: '获取权限组信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('group/info/:group_id')
  getGroupInfoById(@Param() params: { group_id?: number }) {
    return this.groupService.getGroupInfoById(params.group_id);
  }

  @ApiOperation({ description: '获取我的权限组列表' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('group/mine/list')
  getMineGroups(@Request() tokenRes: TokenRequest) {
    const { user_id }: TokenInfo = tokenRes.tokenInfo;

    return this.groupService.getUserGroupList(user_id);
  }

  @ApiOperation({ description: '获取用户的权限组列表' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('group/user/groups/:user_id')
  getUserGroups(@Param() params: { user_id: string }) {
    return this.groupService.getUserGroupList(params.user_id);
  }

  @ApiOperation({ description: '获取权限组列表' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('group/list/:type')
  getGroups(@Param() params: { type?: GroupTypes }) {
    return this.groupService.getGroupList(params.type);
  }

  @ApiOperation({ description: '添加权限组' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('group')
  async creatGroup(
    @Request() tokenRes: TokenRequest,
    @Body() body: AddGroupDto,
  ) {
    const { user_id } = tokenRes.tokenInfo;
    const newGroup = new Group(
      user_id,
      user_id,
      body.group_name,
      GroupTypes.Role,
    );
    return this.groupService.creatGroup(newGroup);
  }

  @ApiOperation({ description: '更新权限组信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('group/:group_id')
  async updateGroup(
    @Request() tokenRes: TokenRequest,
    @Param(new ParamsValidationPipe()) params: UpdateGroupInfoDto,
    @Body(new ParamsValidationPipe()) updateGroupInfo: AddGroupDto,
  ) {
    const { user_id } = tokenRes.tokenInfo;
    return this.groupService.updateGroup(params.group_id, {
      groupName: updateGroupInfo.group_name,
      updateUserId: user_id,
    });
  }

  @ApiOperation({ description: '删除权限组' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('group/:group_id')
  async delGroup(
    @Param(new ParamsValidationPipe()) params: UpdateGroupInfoDto,
  ) {
    return this.groupService.delGroup(params.group_id);
  }

  @ApiOperation({ description: '获取标题下的页面权限funKeys' })
  @Get('title_page')
  async getFunKeysForTitlePage() {
    return await this.resourceService.getFunKeysForTitlePage();
  }

  @ApiOperation({ description: '给权限组增加权限key' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('funkey/:group_id')
  async addFunkeysToGroup(
    @Request() tokenRes: TokenRequest,
    @Param() params: { group_id: number },
    @Body() body: { funkeys: FunKeyEnum[] },
  ) {
    return this.groupService.updateGroupFunKeysPage(
      params.group_id,
      body.funkeys,
    );
  }
}
