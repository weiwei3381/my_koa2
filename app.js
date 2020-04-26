const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/exception')

require('./app/models/user')

const app = new Koa()
// 首先进行全局异常处理
app.use(catchError)
// 解析body参数
app.use(parser())
// 将app传入到初始化类中
InitManager.initCore(app)

app.listen(3000)
console.log('Server Start in port 3000!')
