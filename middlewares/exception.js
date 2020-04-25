// 自己编写全局异常处理, 有点面向切面编程的感觉
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 如果含有errorCode, 表示是一类已知错误
    if (error.errorCode) {
      // 构造返回值
      ctx.body = {
        msg: error.message,
        errorCode: error.errorCode,
        requestUrl: error.requestUrl,
      }
      // http状态码直接写到ctx上
      ctx.status = error.status
    }
  }
}

module.exports = catchError
