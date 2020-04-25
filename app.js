const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')

const app = new Koa()

// 使用bodyParser, 以便解析body中的参数, 需要在初始化之前使用
// 会自动把body的参数挂载到request对象的body属性中去
app.use(parser())

// 将app传入到初始化类中
InitManager.initCore(app)

app.listen(3000)
console.log('Server Start in port 3000!')
