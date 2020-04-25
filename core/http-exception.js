class HttpException extends Error {
  constructor(msg = '服务器错误', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

// 新定义参数错误类, 继承自HttpException
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    // 参数都增加默认值
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

// 使用对象的方式导出多个异常
module.exports = {
  HttpException,
  ParameterException,
}
