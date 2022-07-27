# 项目简介

> 基于：Nest.js，TS，TypeOrm，MySQL，Redis，swagger，JWT；进行开发；它可以帮助你快速搭建企业级中后台产品原型。更好的帮助前端开发人员学习后端知识，进阶全栈；

## 运行

```
# 克隆项目
git clone https://github.com/yonghui666/vue3-admin-backstage

# 进入项目目录
cd vue3-admin-backstage

# 安装依赖
yarn

# 本地开发 启动项目
npm run start:dev

# 配置环境变量
将.back.env 改名称为.env；配置上自己的MySQL数据库等信息即可；
init 文件夹有初始化 sql 文件；导入到自己数据库；

```

服务运行于： http://localhost:9528
swagger 文档：http://localhost:9528/docs

接下来你可以修改代码进行业务开发了，本项目内建了典型业务模板、常用业务组件、参数过滤器、全局错误处理等等各种实用的功能来辅助开发;

## 目录结构

本项目已经为你生成了一个完整的后端开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```
├── dist                      # 构建相关
├── config                    # 项目配置
├── template                  # 模板引擎
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题静态资源
│   ├── middleware             # 全局公用中间件
│   ├── app.controller.ts      # 带有单个路由的基本控制器。
│   ├── app.controller.spec.ts # 针对控制器的单元测试。
│   ├── app.module.ts          # 应用程序的根模块
│   ├── app.service.ts         # 应用程序的根服务
│   ├── main.ts                # 入口文件 加载组件 初始化等
│   └── _swagger.ts            # swagger文档
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .prettierrc                # 代码风格配置
├── tsconfig.json              # ts 配置
└── package.json               # package.json
```

## nestcli 命令

| 名称 | 缩写 | 描述 |
| ---- | ---- | ---- |
| ---  | ---  | ---  |

```

application	application	生成一个新的应用工作区
class	cl	生成一个新的class
configuration	config	生成 CLI 配置文件
controller	co	生成一个控制器声明
decorator	d	生成一个自定义的装饰者
filter	f	生成一个过滤器声明
gateway	ga	生成网关
guard	gu	生成守卫
interceptor	in	生成拦截器
interface	interface	生成接口声明
middleware	mi	生成中间件声明
module	mo	生成一个模块声明
pipe	pi	生成管道声明
provider	pr	生成提供者声明
resolver	r	生成GraphQL resolver声明
service	s	生成服务
library	lib	生成一个monorepo库
sub-app	App	生成一个monorepo的应用
resource	Res	生成一个新的CURD资源
```

## 参考文档
> 参考博客：https://mp.weixin.qq.com/s/nEUkWE9dGgGSK1GVwUKNyg

**首先了解这些 后端 生态圈的东西，会对你上手本项目有很大的帮助。**

1. [Nest.js](https://docs.nestjs.cn/) 用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架。

2. [TypeScript](https://www.tslang.cn/) 是 JavaScript 类型的超集，它可以编译成纯 JavaScript。TypeScript 可以在任何浏览器、任何计算机和任何操作系统上运行，并且是开源的。

3. [TypeOrm](https://typeorm.io/) 是一个可以在 NodeJS、Browser、Cordova、PhoneGap、Ionic、React Native、NativeScript、Expo 和 Electron 平台上运行的 ORM ，并且可以与 TypeScript 和 JavaScript）一起使用。它的目标是始终支持最新的 JavaScript 功能并提供额外的功能来帮助您开发使用数据库的任何类型的应用程序

4) [MySql](https://www.mysql.com/) 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。

5) [Nodejs](http://nodejs.cn/) 是一个基于 Chrome V8 引擎的 JavaScript 运行环境
