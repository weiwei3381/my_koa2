const bcrypt = require('bcryptjs') // 导入加密模块
const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
// 引入User模块
const { User } = require('../../models/user')

const router = new Router({
  prefix: '/v1/user',
})

router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  // 传的参数表示生成盐的成本, 通常用10, 使用同步版本
  const salt = bcrypt.genSaltSync(10)
  // 两个用户密码即使一样, 加密后的密码也应该不一样, 以防止彩虹攻击
  const psw = bcrypt.hashSync(v.get('body.password1'), salt)
  const user = {
    email: v.get('body.email'),
    password: psw,
    nickname: v.get('body.email'),
  }
  // 把用户保存至User表中, create是异步调用, 返回一个promise对象, 需要用await接收
  const newUser = await User.create(user)
})

module.exports = router
