// 导入basicAuth相关的包
const basicAuth = require('basic-auth')
const { Forbbiden } = require('../core/http-exception')
const jwt = require('jsonwebtoken')

class Auth {
  constructor() {}

  // 注意,m是一个属性, 这里用get修饰符
  get m() {
    // token进行检查, 使用httpBasicAuth进行身份验证, 在username中传递令牌
    return async (ctx, next) => {
      // ctx.req获得的是node.js原生的request对象,
      // ctx.request获取的则是koa2中封装的request对象
      // 将request对象传入, 即可得到basicAuth的令牌
      // basicAuth的令牌包括2个部分,一个是name, 一个是pass
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      // 如果令牌不存在, 或者没有那么属性, 则抛出异常
      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg)
      }
      try {
        // 验证令牌是否合法, 其中userToken.name是令牌字符串, secretKey是用户私有key
        // 如果验证通过, 则会返回我们给令牌传的值
        // 这里decode需要用var关键词, 否则后续拿不到该值
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
      // 将验证后的值统一保存到ctx的auth属性中
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      }
      // 调用后续的中间件函数
      await next()
    }
  }
}
module.exports = { Auth }
