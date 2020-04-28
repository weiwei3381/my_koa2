const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

// 由于sequelize不能采用类属性的方式定义字段
// 所以这里单独声明一个classic字段对象
const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  favNums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
}
// 定义电影的模型类
class Movie extends Model {}

// 电影模型类进行初始化, 第1个参数是classic模型的属性,使用classicFields
// 第2个参数传递一些参数, 包括sequelize实例和表名
Movie.init(classicFields, {
  sequelize,
  tableName: 'movie',
})

// 与电影一样, 定义名句的模型类
class Sentence extends Model {}
// 初始化电影
Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence',
})

// 与电影一样, 定义音乐的模型类
class Music extends Model {}

// 需要注意的是, 音乐多了一个字段, 叫做musicUrl
// 使用Object.assign在classicFields的基础上增加url字段
const musicFields = Object.assign({ url: Sequelize.STRING }, classicFields)
Music.init(musicFields, {
  sequelize,
  tableName: 'music',
})

module.exports = {
  Movie,
  Sentence,
  Music,
}
