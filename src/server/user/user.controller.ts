/*
 * @Author: yonghui666
 * @Date: 2022-01-20 15:33:29
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-07-08 15:48:16
 * @Description: 文件描述
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as moment from 'moment';
import * as md5 from 'md5';
import { ErrHttpBack } from 'src/filters/http-exception.back-code';
import { AppHttpException } from 'src/filters/http-exception.filter';
import { AuthService } from '../auth/auth.service';
import { TokenInfo } from '../auth/interfaces/auth.interfaces';
import { ParamsValidationPipe } from '../validation.pipe';
import { User } from './class/user.class';
import {
  ActionUserDto,
  EditUserDto,
  GetUsersDto,
  InitAddUsersDto,
  LoginByPhoneDto,
  PasswordDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { Access } from './class/access.class';
import { TokenRequest } from 'src/global/interface/request.interface';
import { GroupService } from '../permission/group.service';
import { Group } from '../permission/class/group.class';
import { GroupTypes } from '../permission/enum/permission.enum';
import { FunKeyEnum } from '../permission/enum/funKeys.enum';
import { GroupRelUser } from '../permission/class/groupRelUser.class';
import { FixedRoleGroupIds } from 'src/global/enum/role.enum';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}

  @ApiOperation({ description: '初始化项目:创建超级管理员用户' })
  @Post('_int')
  async createSuperUser(
    @Body(new ParamsValidationPipe()) addUserInfo: InitAddUsersDto,
  ) {
    const { init_code, user_name, phone, password } = addUserInfo;
    // 验证初始码密码
    if (init_code !== 'project_int')
      return new AppHttpException(ErrHttpBack.fail);

    const userId = `MJ${moment().valueOf()}`;

    // 创建超级管理员权限组
    const newGroup = new Group(
      userId,
      userId,
      '超级管理员',
      GroupTypes.SuperAdmin,
    );
    const groupInfo = await this.groupService.creatGroup(newGroup);

    // 创建所有默认的权限
    this.initFixedRole(userId);

    // 创建用户
    const newUser = new User(userId, userId, userId, user_name, phone);

    const { password: hashPwd, salt } = this.authService.generatePassword(
      md5(password),
    ); // 加密密码

    const userInfo = await this.userService.create(newUser, {
      password: hashPwd,
      salt,
    });

    const newGroupRel = new GroupRelUser(groupInfo.group_id, userId);
    newGroupRel.group = groupInfo;

    // 建立组和用户的关联
    this.groupService.addGroupRelUser(newGroupRel);

    return userInfo;
  }

  /**
   * 添加固定的角色
   */
  private async initFixedRole(userId: string) {
    const fixedRoles = [
      {
        group_id: FixedRoleGroupIds.AdministratorID,
        group_name: '管理员',
      },
      {
        group_id: FixedRoleGroupIds.ProductManagerID,
        group_name: '产品经理',
      },
      {
        group_id: FixedRoleGroupIds.CommercialRepresentativeID,
        group_name: 'UI设计',
      },
    ];

    for (const iterator of fixedRoles) {
      const newGroup = new Group(
        userId,
        userId,
        iterator.group_name,
        GroupTypes.SuperAdmin,
      );
      newGroup.group_id = iterator.group_id;
      await this.groupService.creatGroup(newGroup);
    }
  }

  @ApiOperation({ description: '用户登陆（手机号账户）' })
  @Post('login/phone')
  async login(
    @Body(new ParamsValidationPipe()) loginInfo: LoginByPhoneDto,
  ): Promise<{ token: string }> {
    const { phone, needmd5 } = loginInfo;
    let { password } = loginInfo;

    // 调试，是否需要后端md5加密
    if (needmd5) password = md5(password);

    // 查询该用户
    const userInfo: User = await this.userService.getUserInfoByPhone(phone);
    if (!userInfo) throw new AppHttpException(ErrHttpBack.err_user_no_had);

    // 获取密码信息
    const userAccessInfo: Access = await this.userService.getAccessInfoBuUserId(
      userInfo.user_id,
    );

    // 验证密码
    const { salt: userSalt, password: userPassword } = userAccessInfo;
    const validateRes: boolean = await this.authService.validatePassWord(
      userPassword,
      userSalt,
      password,
    );
    if (!validateRes) throw new AppHttpException(ErrHttpBack.err_user_password);

    // 获取当前用户的组,取最后一个
    const groupRels = await this.groupService.getUserRelGroups(
      userInfo.user_id,
    );
    const token = await this.authService.generateToken(
      userInfo,
      groupRels[0].group_id,
    );
    return { token };
  }

  @ApiOperation({ description: '切换角色' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('login/role/:group_id')
  async loginWithChangeRole(
    @Param() params: { group_id: number },
    @Request() tokenRes: TokenRequest,
  ) {
    const { user_id, phone, user_name } = tokenRes.tokenInfo;
    const { group_id } = params;

    // 验证是否有该权限组
    const hasPorver = this.groupService.checkUserHasGroup(user_id, group_id);
    if (!hasPorver) throw new AppHttpException(ErrHttpBack.err_no_permission);

    const newTokenInfo: TokenInfo = {
      user_id,
      group_id,
      phone,
      user_name,
    };

    // 给新的token
    return this.authService.resetToken(newTokenInfo);
  }

  @ApiOperation({ description: '获取登录用户个人信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  async getMineInfo(@Request() tokenRes: TokenRequest): Promise<any> {
    const { user_id, group_id }: TokenInfo = tokenRes.tokenInfo;
    const { user_name, phone }: User = await this.userService.getUserInfoById(
      user_id,
    );
    const groupList = await this.groupService.getUserGroupList(user_id);

    const useRole = groupList.find(
      (group) =>
        group.group_id === group_id ||
        group.group_id.toString() === group_id.toString(),
    );

    return {
      userName: user_name,
      userId: user_id,
      realName: user_name,
      avatar: '',
      roles: groupList,
      phone,
      useRole,
    };
  }

  @ApiOperation({ description: '退出登陆' })
  @Post('logout')
  async logout(): Promise<string> {
    return 'ok';
  }

  /**
   * 更新的重复逻辑校验
   * @param userId
   * @param upUserInfo
   * @returns
   */
  private async _updateUserInfoCheck(
    upUserInfo: ActionUserDto,
    userId?: string,
  ) {
    const { phone, group_ids } = upUserInfo;
    // 手机号不允许重复
    const userPhoneInfo: User = await this.userService.getUserInfoByPhone(
      phone,
    );
    if (!!userPhoneInfo && (!userId || userPhoneInfo.user_id !== userId))
      throw new AppHttpException(ErrHttpBack.err_user_phone_repetition);

    // 超级管理员不允许添加
    const superGroupInfo = await this.groupService.getSuperGroupInfo();
    if (group_ids.includes(superGroupInfo.group_id))
      throw new AppHttpException(ErrHttpBack.err_user_phone_repetition);
  }

  @ApiOperation({ description: '添加新用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  // @Permissions(FunKeyEnum.Router_User_Add)
  // @UseGuards(PermissionGuard)
  @Post()
  async createNewUser(
    @Request() tokenRes: TokenRequest,
    @Body(new ParamsValidationPipe()) addUserInfo: ActionUserDto,
  ) {
    const { user_id: tokenUserId }: TokenInfo = tokenRes.tokenInfo;

    const { phone, user_name, group_ids } = addUserInfo;

    // 验证不可重复的值
    await this._updateUserInfoCheck(addUserInfo);

    // 验证权限组是否存在
    const groupMap = new Map();
    for (const groupId of group_ids) {
      const groupInfo = await this.groupService.getGroupInfoById(groupId);
      if (!groupInfo) throw new AppHttpException(ErrHttpBack.err_group);
      groupMap.set(groupId, groupInfo);
    }

    const newUser = new User(
      tokenUserId,
      tokenUserId,
      `MJ${moment().valueOf()}`,
      user_name,
      phone,
    );

    // 权限数组
    newUser.group_ids = group_ids || [];

    // 创建人
    newUser.create_by_user = tokenUserId;

    const { password: hashPwd, salt } = this.authService.generatePassword(
      md5(User.IntUserPassword),
    ); // 加密密码

    const userInfo = await this.userService.create(newUser, {
      password: hashPwd,
      salt,
    });

    // 建立权限关系
    for (const groupId of group_ids) {
      const newRel = new GroupRelUser(groupId, userInfo.user_id);
      newRel.group = groupMap.get(groupId);
      await this.groupService.addGroupRelUser(newRel);
    }

    return userInfo;
  }

  @ApiOperation({ description: '获取用户列表' })
  @Get()
  async getUserList(
    @Query(new ParamsValidationPipe()) getUsersDto: GetUsersDto,
  ) {
    return await this.userService.findAll(getUsersDto);
  }

  @ApiOperation({ description: '获取用户信息' })
  @Get(':user_id')
  async getUserInfo(@Param() params: any) {
    return await this.userService.getUserInfoById(params.user_id);
  }

  @ApiOperation({ description: '更新用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('info/:user_id')
  async updateUserInfo(
    @Request() tokenRes: TokenRequest,
    @Param() params: { user_id: string },
    @Body(new ParamsValidationPipe()) upUserInfo: EditUserDto,
  ) {
    const { user_id: tokenUserId }: TokenInfo = tokenRes.tokenInfo;
    const { user_id } = params;

    await this._updateUserInfoCheck(upUserInfo, user_id);

    const res = await this.userService.update(user_id, {
      ...upUserInfo,
      modify_by_user: tokenUserId,
    });
    return res;
  }

  @ApiOperation({ description: '重置用户密码' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('password/user/:user_id')
  async updateUserPassword(@Param() params: { user_id: string }) {
    const { user_id } = params;
    const { password, salt } = this.authService.generatePassword(
      md5(User.IntUserPassword),
    ); // 加密密码

    return this.userService.updateUserPassword(user_id, { password, salt });
  }

  @ApiOperation({ description: '更新我的密码' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('password/mine')
  async updateMinePassword(
    @Request() tokenRes: TokenRequest,
    @Body(new ParamsValidationPipe()) upUserInfo: PasswordDto,
  ) {
    const { user_id }: TokenInfo = tokenRes.tokenInfo;
    const { password, old_password } = upUserInfo;

    const { password: oldPassword, salt: oldSalt } =
      await this.userService.getAccessInfoBuUserId(user_id);

    // 对比原密码
    const isPass = this.authService.validatePassWord(
      oldPassword,
      oldSalt,
      old_password,
    );

    if (!isPass) throw new AppHttpException(ErrHttpBack.err_user_password);

    // 加密密码
    const { password: newPassword, salt } =
      this.authService.generatePassword(password);

    return this.userService.updateUserPassword(user_id, {
      password: newPassword,
      salt,
    });
  }

  @ApiOperation({ description: '删除用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':user_id')
  async delUser(@Param() params: { user_id: string }) {
    return await this.userService.delById(params.user_id);
  }
}
