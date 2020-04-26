const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
// 引入User模块
const { User } = require('../../models/user')

const router = new Router({
  prefix: '/v1/user',
})

router.post('/register', async (ctx) => {
  // 新版本validator都需要加上await
  // validate需要放到代码的第一行, 否则起不到守门的作用
  const v = await new RegisterValidator().validate(ctx)
  // 获取用户参数信息, 由于已经验证过了, 所以直接可以用
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.email'),
  }
  // 把用户保存至User表中, create是异步调用, 返回一个promise对象, 需要用await接收
  const newUser = await User.create(user)
})

module.exports = router
