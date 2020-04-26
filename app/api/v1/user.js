const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const { Success } = require('../../../core/http-exception')

const router = new Router({
  prefix: '/v1/user',
})

router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.email'),
  }
  // create是异步调用, 返回一个promise对象, 需要用await接收
  await User.create(user)
  // 抛出成功的情况
  throw new Success()
})

module.exports = router
