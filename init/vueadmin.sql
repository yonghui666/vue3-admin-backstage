/*
 Navicat Premium Data Transfer

 Source Server         : 后台管理系统初始化数据库
 Source Server Type    : MySQL
 Source Server Version : 80024
 Source Host           : 101.xx.xx.202:3306
 Source Schema         : vueadmin

 Target Server Type    : MySQL
 Target Server Version : 80024
 File Encoding         : 65001

 Date: 24/07/2022 10:06:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_access
-- ----------------------------
DROP TABLE IF EXISTS `tb_access`;
CREATE TABLE `tb_access` (
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `salt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码盐',
  PRIMARY KEY (`user_id`) USING BTREE,
  KEY `idx_create_at` (`create_at`) USING BTREE,
  KEY `idx_update_at` (`update_at`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tb_access
-- ----------------------------
BEGIN;
INSERT INTO `tb_access` VALUES ('2022-05-22 15:49:34.659932', '2022-05-22 15:49:34.659932', 'BMS1653205772856', 't+wtNxrw8fSPq+Bf/6eUcQ==', '/CoU');
INSERT INTO `tb_access` VALUES ('2022-06-17 14:13:55.513279', '2022-06-22 11:46:18.000000', 'MJ1655446435133', 'zusZzuP8pTC5FwfrMLaYWg==', 'hz3m');
INSERT INTO `tb_access` VALUES ('2022-06-17 14:25:05.994792', '2022-06-17 14:25:05.994792', 'MJ1655447105607', 'ccJ1ShuVDw7HZMh1drHRaw==', 'qwIf');
INSERT INTO `tb_access` VALUES ('2022-06-21 16:15:55.921866', '2022-06-22 14:31:55.000000', 'MJ1655799355869', 'lQGVhPkk8RZc6E9wf5S00w==', '6iRM');
INSERT INTO `tb_access` VALUES ('2022-06-27 16:59:38.267525', '2022-07-04 09:27:44.000000', 'MJ1656320378240', 'IHxzqeBQYKLZxEET6+oPOA==', 'g0PH');
INSERT INTO `tb_access` VALUES ('2022-06-27 17:05:55.311511', '2022-06-27 17:05:55.311511', 'MJ1656320755290', 'DSf5kDLkgcdPh3OtODWSmA==', 'DVLf');
INSERT INTO `tb_access` VALUES ('2022-06-30 09:16:05.305774', '2022-06-30 09:16:05.305774', 'MJ1656551765286', '82Icb9hQFOIPkVRvvFRjtA==', 'Yx1j');
INSERT INTO `tb_access` VALUES ('2022-06-30 16:44:45.510042', '2022-06-30 16:44:45.510042', 'MJ1656578685078', 'gJXU9sFFFoI+BDwG6EcM3w==', 'khRq');
INSERT INTO `tb_access` VALUES ('2022-06-30 16:46:08.884341', '2022-06-30 16:46:08.884341', 'MJ1656578768470', 'o0V5e35TY+TQJ8LX6irYJw==', '/Jk+');
INSERT INTO `tb_access` VALUES ('2022-06-30 16:47:28.009999', '2022-06-30 16:47:28.009999', 'MJ1656578847587', 'rW7h/rdeMdRNFDZWmOeVKQ==', 'VlgG');
INSERT INTO `tb_access` VALUES ('2022-06-30 17:07:00.995380', '2022-06-30 17:07:00.995380', 'MJ1656580020564', 'GGb3/gq4vUv1KxwSaVCUaQ==', '2v70');
INSERT INTO `tb_access` VALUES ('2022-07-04 09:22:46.303318', '2022-07-04 09:22:46.303318', 'MJ1656897766285', 'hXOn8eS23xAy1ZDxWec6MQ==', 'LJ3N');
INSERT INTO `tb_access` VALUES ('2022-07-05 15:56:23.278052', '2022-07-05 15:56:23.278052', 'MJ1657007783257', '7sRHuZc+m+Jg8BCo8D0KGQ==', 'JRPW');
INSERT INTO `tb_access` VALUES ('2022-07-23 17:09:11.545085', '2022-07-23 17:34:57.000000', 'MJ1658567351152', 'E+qiN7E8xvdqH7IfhAJ+9Q==', 'nCPj');
INSERT INTO `tb_access` VALUES ('2022-07-23 17:19:11.294712', '2022-07-23 17:37:03.000000', 'MJ1658567950897', '/2kKzeHyXygX1h7md5cHWg==', '8Tuk');
COMMIT;

-- ----------------------------
-- Table structure for tb_customer_access
-- ----------------------------
DROP TABLE IF EXISTS `tb_customer_access`;
CREATE TABLE `tb_customer_access` (
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `customer_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '客户ID',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '密码',
  `salt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '密码盐',
  `token` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'token',
  PRIMARY KEY (`customer_id`) USING BTREE,
  KEY `idx_create_at` (`create_at`) USING BTREE,
  KEY `idx_update_at` (`update_at`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tb_customer_access
-- ----------------------------
BEGIN;
INSERT INTO `tb_customer_access` VALUES ('2022-07-15 10:18:46.350416', '2022-07-19 11:33:45.000000', 'mjc11111', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE4NzEzMzUxMzMwIiwibWVyY2hhbnRfaWQiOjUzLCJjdXN0b21lcl9pZCI6Im1qYzExMTExIiwiY3VzdG9tZXJfbmFtZSI6IueJm-eJmyIsImlhdCI6MTY1ODIwMTYyNSwiZXhwIjoxNjYwNzkzNjI1fQ.RkaIHPN3Cv2sxUt0CAGaCEp2DwxpvP907cDb4R78Zu4');
COMMIT;

-- ----------------------------
-- Table structure for tb_group
-- ----------------------------
DROP TABLE IF EXISTS `tb_group`;
CREATE TABLE `tb_group` (
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by_user` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '创建者',
  `modify_by_user` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '最后修改者',
  `group_id` int NOT NULL AUTO_INCREMENT COMMENT '组ID',
  `group_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户组名称',
  `type` tinyint NOT NULL COMMENT '类型: 0 超级管理员 1 角色 2 成员',
  `funkeys_page` json DEFAULT NULL COMMENT '一级权限的key',
  `funkeys_fun` json DEFAULT NULL COMMENT '高级设置权限的key',
  `property` tinyint NOT NULL DEFAULT '0' COMMENT '权限特性: 0 无特性 1 不可删除',
  PRIMARY KEY (`group_id`) USING BTREE,
  UNIQUE KEY `IDX_2cf55e72f512dfe4f1c3f5d3e2` (`group_name`) USING BTREE,
  KEY `idx_create_at` (`create_at`) USING BTREE,
  KEY `idx_update_at` (`update_at`) USING BTREE,
  KEY `idx_create_by_user` (`create_by_user`) USING BTREE,
  KEY `idx_modify_by_user` (`modify_by_user`) USING BTREE,
  KEY `idx_type` (`type`) USING BTREE,
  KEY `property_idx` (`property`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tb_group
-- ----------------------------
BEGIN;
INSERT INTO `tb_group` VALUES ('2022-05-22 15:49:34.471936', '2022-06-06 10:39:04.208096', NULL, NULL, 1, '超级管理员', 0, '[]', '[]', 1);
INSERT INTO `tb_group` VALUES ('2022-06-02 10:00:11.269011', '2022-07-23 17:48:28.000000', 'BMS1653205772856', 'BMS1653205772856', 2, '管理员', 1, '[\"2-1\", \"2-2\", \"10-1\", \"10-2\", \"10-3\", \"10-4\"]', '[]', 1);
INSERT INTO `tb_group` VALUES ('2022-06-02 14:28:10.571139', '2022-07-23 17:01:54.000000', 'BMS1653205772856', 'BMS1653205772856', 3, '产品经理', 1, '[\"2-1\", \"10-1\", \"10-2\", \"10-3\", \"10-4\"]', '[]', 1);
INSERT INTO `tb_group` VALUES ('2022-07-23 17:02:12.219782', '2022-07-23 17:51:04.224469', 'BMS1653205772856', 'BMS1653205772856', 22, 'UI设计', 1, '[\"2-2\", \"10-1\", \"10-2\", \"10-3\", \"10-4\"]', '[]', 1);
COMMIT;

-- ----------------------------
-- Table structure for tb_group_rel_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_group_rel_user`;
CREATE TABLE `tb_group_rel_user` (
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `group_id` int NOT NULL COMMENT '组ID',
  `user_id` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID',
  `ref_id` int NOT NULL AUTO_INCREMENT COMMENT '关系ID',
  PRIMARY KEY (`ref_id`) USING BTREE,
  UNIQUE KEY `IDX_4ab867d74f98c4faa9df3afcf4` (`group_id`,`user_id`) USING BTREE,
  KEY `idx_create_at` (`create_at`) USING BTREE,
  KEY `idx_update_at` (`update_at`) USING BTREE,
  KEY `FK_09f88cffad298f9d63ff23937c1` (`user_id`) USING BTREE,
  CONSTRAINT `FK_09f88cffad298f9d63ff23937c1` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`user_id`),
  CONSTRAINT `FK_4037897485af1cfd31a90b7f9b1` FOREIGN KEY (`group_id`) REFERENCES `tb_group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tb_group_rel_user
-- ----------------------------
BEGIN;
INSERT INTO `tb_group_rel_user` VALUES ('2022-05-22 15:49:34.743859', '2022-05-22 15:49:34.743859', 1, 'BMS1653205772856', 1);
INSERT INTO `tb_group_rel_user` VALUES ('2022-07-23 17:09:11.613363', '2022-07-23 17:09:11.613363', 3, 'MJ1658567351152', 103);
INSERT INTO `tb_group_rel_user` VALUES ('2022-07-23 17:19:11.357152', '2022-07-23 17:19:11.357152', 22, 'MJ1658567950897', 104);
COMMIT;

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `user_id` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID',
  `user_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `phone` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '邮箱号',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态 1 正常 2 已删除',
  `create_by_user` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '创建者',
  `modify_by_user` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '最后修改者',
  `serving` tinyint NOT NULL DEFAULT '1' COMMENT '在职状态 1 在职 2 离职',
  `group_ids` json DEFAULT NULL COMMENT '所有拥有的权限组(方便查询用)',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `IDX_f187fcd151cb766f5a466d0799` (`phone`) USING BTREE,
  KEY `idx_create_at` (`create_at`) USING BTREE,
  KEY `idx_update_at` (`update_at`) USING BTREE,
  KEY `status_idx` (`status`) USING BTREE,
  KEY `idx_create_by_user` (`create_by_user`) USING BTREE,
  KEY `idx_modify_by_user` (`modify_by_user`) USING BTREE,
  KEY `user_name_idx` (`user_name`) USING BTREE,
  KEY `phone_idx` (`phone`) USING BTREE,
  KEY `serving_idx` (`serving`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
BEGIN;
INSERT INTO `tb_user` VALUES ('2022-05-22 15:49:34.601871', '2022-07-23 17:58:37.746011', 'BMS1653205772856', '尊贵的超管', '18166667777', NULL, 0, NULL, NULL, 1, '[1]');
INSERT INTO `tb_user` VALUES ('2022-07-23 17:09:11.508444', '2022-07-23 17:09:11.508444', 'MJ1658567351152', '我是产品', '13166666666', NULL, 1, 'BMS1653205772856', 'BMS1653205772856', 1, '[3]');
INSERT INTO `tb_user` VALUES ('2022-07-23 17:19:11.260699', '2022-07-23 17:19:11.260699', 'MJ1658567950897', '我是设计师', '13111112222', NULL, 1, 'BMS1653205772856', 'BMS1653205772856', 1, '[22]');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
