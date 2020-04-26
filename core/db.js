// 引入sequelize, 文档地址: https://sequelize.org/v5/
const Sequelize = require('sequelize')

// 解构获取database参数
const {
  dbName,
  host,
  port,
  user,
  password,
} = require('../config/config').database
// 创建Sequelize实例
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+8:00',
  define: {
    // 是否显示createdAt和updateAt字段
    timestamps: true,
    paranoid: true, // 会增加deleteAt字段, 实现假删除
    // 下面3项是更改别名
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
  },
})

// 将定义的模型同步到数据库上, force表示强制更新, 会丢失数据
sequelize.sync({
  force: false,
})

module.exports = { sequelize }
