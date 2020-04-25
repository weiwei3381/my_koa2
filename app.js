const Koa = require('koa')
const app = new Koa()

// 第1个中间件
app.use(async (ctx, next) => {
  await next()
  // 在next之后,能保证后续代码已全部执行,才能拿到r
  const r = ctx.r
  console.log(r)
})

// 第2个中间件
app.use(async (ctx, next) => {
  const axios = require('axios')
  const res = await axios.get('https://api.uomg.com/api/rand.qinghua')
  // 将返回值挂载到ctx.r上
  ctx.r = res
  await next()
})

// 监听3000端口
app.listen(3000)
console.log('在3000端口服务端启动成功!')
