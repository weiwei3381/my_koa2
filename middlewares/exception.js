const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 如果是httpException, 则属于已知错误
    if (error instanceof HttpException) {
      // 构造返回值
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`,
      }
      // http状态码直接写到ctx上
      ctx.status = error.code
    }
  }
}

module.exports = catchError
