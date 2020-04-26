const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class User extends Model {}

// 其实不用显式设置主键id
User.init(
  {
    id: {
      type: Sequelize.INTEGER, // 整型
      primaryKey: true, // 是否主键
      autoIncrement: true, // 自增
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
      // 更加详细的设置每个属性的长度, 是否唯一等
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  { sequelize, tableName: 'user' }
)
