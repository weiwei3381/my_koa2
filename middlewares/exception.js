// 导入HttpException类, 以便进行判定
const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 区分开发环境和生产环境, 如果是开发环境则提示错误信息
    const isHttpException = error instanceof HttpException
    const isDev = global.config.enviroment === 'dev'
    if (!isHttpException && isDev) {
      throw error
    }
    // 如果是httpException, 则属于已知错误
    if (isHttpException) {
      // 构造返回值
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`,
      }
      // http状态码直接写到ctx上
      ctx.status = error.code
    } else {
      // 处理未知异常
      ctx.body = {
        msg: '服务器错误',
        errorCode: 999,
        requestUrl: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
