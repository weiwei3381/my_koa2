const Koa = require('koa')
const user = require('./api/v1/user')
const deploy = require('./api/v1/deploy')

const app = new Koa()

// 统一在app.js中注册路由
app.use(user.routes())
app.use(deploy.routes())

// 监听3000端口
app.listen(3000)
console.log('在3000端口服务端启动成功!')
