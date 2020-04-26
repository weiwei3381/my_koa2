const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
// 引入User模块
const { User } = require('../../models/user')

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
  // 把用户保存至User表中, create是异步调用, 返回一个promise对象, 需要用await接收
  const newUser = await User.create(user)
})

module.exports = router
