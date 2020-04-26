const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { ParameterException } = require('../../../core/http-exception')

const router = new Router({
  prefix: '/v1/token',
})

// 颁布令牌
router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  const account = v.get('body.account')
  const secret = v.get('body.secret')
  const type = v.get('body.type')
  // 使用jwt令牌, 是随机字符串并可携带数据
  switch (type) {
    case LoginType.USER_EMAIL:
      await emailLogin(account, secret)
      break
    case LoginType.USER_MINI_PROGRAM:
      break
    default:
      throw new ParameterException('没有相应的处理函数')
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
}

module.exports = router
