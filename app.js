const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router() // 实例化router

// 编写路由
router.get('/api/v1/login', (ctx, next) => {
  ctx.body = { key: '登录失败' }
})

// 注册
app.use(router.routes())

// 监听3000端口
app.listen(3000)
console.log('在3000端口服务端启动成功!')
