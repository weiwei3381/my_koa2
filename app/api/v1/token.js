const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { ParameterException } = require('../../../core/http-exception')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/token',
})

// 颁布令牌
router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  const account = v.get('body.account')
  const secret = v.get('body.secret')
  const type = v.get('body.type')
  let token // token默认为空

  switch (type) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(account, secret)
      break
    default:
      throw new ParameterException('没有相应的处理函数')
  }
  ctx.body = { token }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  // 获得用户后生成令牌
  return generateToken(user.id, Auth.USER)
}

module.exports = router
