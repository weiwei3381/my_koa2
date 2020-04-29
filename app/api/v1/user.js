const Router = require('koa-router')
const {
  RegisterValidator,
  MovieAddValidator,
  MovieGetValidator,
} = require('../../validators/validator')
const { User } = require('../../models/user')
const { Movie, Music, Sentence } = require('../../models/classic')
const { Success } = require('../../../core/http-exception')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/user',
})

// 注册
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname'),
  }
  await User.create(user)
  throw new Success()
})

// 增加电影情况
router.post('/movie/add', new Auth(2).m, async (ctx) => {
  const v = await new MovieAddValidator().validate(ctx)
  const movie = {
    title: v.get('body.title'),
    content: v.get('body.content'),
  }
  await Movie.create(movie)
  throw new Success()
})

// 返回指定id的电影
router.get('/movie/:id', new Auth(2).m, async (ctx) => {
  const v = await new MovieGetValidator().validate(ctx)
  const queryId = v.get('path.id')
  const movie = await Movie.getMovieById(queryId)
  // 在返回结果中增加某个属性, 需要加到dataValues中去
  // movie.dataValues.addAttrib = '增加的属性'
  // 但是不推荐这种写法, sequlize提供了增加属性的方法时
  movie.setDataValue('addAttrib', '增加的属性')
  // 指定排除的属性
  movie.exclude = ['pubdate']
  ctx.body = movie
})

module.exports = router
