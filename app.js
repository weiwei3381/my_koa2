const Koa = require('koa')
const app = new Koa()

// 实现中间件, 每次访问都会调用打印
// 在第一个中间件中调用第2个中间件
app.use(async (ctx, next) => {
  console.log('1')
  await next()
  console.log('2')
})

// 定义第2个中间件
app.use(async (ctx, next) => {
  //   console.log(3)
  const axios = require('axios')
  const start = Date.now()
  const res = await axios.get('https://www.taobao.com')
  const end = Date.now()
  console.log(`阻塞之后的延时为:${end - start}`)
  console.log(res)

  //   console.log(4)
})

// 监听3000端口
app.listen(3000)
console.log('在3000端口服务端启动成功!')
