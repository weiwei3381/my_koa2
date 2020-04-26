const bcrypt = require('bcryptjs') // 导入加密模块
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
    email: {
      type: Sequelize.STRING(128),
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      // set函数会在给password赋值的时候调用
      // 这里相当于实现了一个观察者模式
      set(val) {
        // 传的参数表示生成盐的成本, 通常用10, 使用同步版本
        const salt = bcrypt.genSaltSync(10)
        // 两个用户密码即使一样, 加密后的密码也应该不一样, 以防止彩虹攻击
        const psw = bcrypt.hashSync(val, salt)
        // 将加密过后的密码存入数据库
        // setDataValue是Model模型中的方法, 第一个参数表示给哪个参数赋值
        this.setDataValue('password', psw)
      },
    },
    openid: {
      // 更加详细的设置每个属性的长度, 是否唯一等
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  { sequelize, tableName: 'user' }
)

module.exports = { User }
