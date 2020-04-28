const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class Flow extends Model {}

Flow.init(
  {
    index: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
    // type是表示每天展现的形式
    // 100表示电影,200表示句子,300表示音乐
    type: Sequelize.INTEGER,
  },
  {
    sequelize,
    tableName: 'flow',
  }
)

module.exports = {
  Flow,
}
