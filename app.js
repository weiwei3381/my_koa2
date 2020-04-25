const Koa = require('koa')
const InitManager = require('./core/init')

const app = new Koa()

// 将app传入到初始化类中
InitManager.initCore(app)

app.listen(3000)
console.log('Server Start in port 3000!')
