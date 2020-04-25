// 自己编写全局异常处理, 有点面向切面编程的感觉
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = { message: '服务器出现问题' }
  }
}

module.exports = catchError
