const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')

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

// 在Model基类上定义toJSON方法排除3个日期字段
Model.prototype.toJSON = function () {
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')
  // 如果对象有exclude数组, 则在序列化的时候排除指定属性
  if (isArray(this.exclude)) {
    this.exclude.forEach((value) => unset(data, value))
  }

  return data
}

module.exports = { sequelize }
