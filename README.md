## Running the app

```bash
$ yarn
```

```bash
# development
$ npm run start
$ npm run start:dev
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
$ npm run test:e2e
$ npm run test:cov
```

## nest cli 命令

```bash
# 增加模块
$ nest g mo xxx
$ nest g module xxx
$ nest g mo server/xxx

# 增加控制器
$ nest g co xxx
$ nest g co server/xxx

# 增加服务
$ nest g service xxx
$ nest g service server/xxx
```

# 构建过程

## .env 环境变量
- 将.back.env 改名称为.env；配置上自己的数据库等信息即可；
- init文件夹有初始化sql文件；导入到自己数据库即可；