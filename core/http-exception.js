// 必须要继承内置类Error, 否则无法抛出自定义的这个类
class HttpException extends Error {
  // 设置默认值
  constructor(msg = '服务器错误', errorCode = 10000, code = 400) {
    super() // 调用父类的构造方法
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

// 使用对象的方式导出, 这样可以导出多个异常
module.exports = {
  HttpException,
}
