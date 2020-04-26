const basicAuth = require('basic-auth')
const { Forbbiden } = require('../core/http-exception')
const jwt = require('jsonwebtoken')

class Auth {
  // 设置Auth的不同用户的常量权限, 以及传入api的权限等级
  constructor(level) {
    this.level = level || 1 // api的权限等级, 默认为1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(
          userToken.name,
          global.config.security.secretKey
        )
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = '令牌已过期'
        }
        throw new Forbbiden(errMsg)
      }
      // 进行权限管理
      // 如果用户权限小于当前api的权限范围, 则抛出权限不足的错误
      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new Forbbiden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      }
      await next()
    }
  }
}
module.exports = { Auth }
