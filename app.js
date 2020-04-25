const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  //查阅官网文档, 找到Request的路径和访问方式
  // 为了简化操作, 官网文档说下面访问器和 Request 别名等效,所以可以直接在ctx上取
  console.log(ctx.path)
  console.log(ctx.method)
  // 下面其实是完成路由功能
  if (ctx.path === '/api/v1/login' && ctx.method === 'GET') {
    // 返回值必须要放到ctx.body中才能显示, 不能直接return, 传入js对象可直接转换json
    ctx.body = { key: '登录失败' }
  }
})

// 监听3000端口
app.listen(3000)
console.log('在3000端口服务端启动成功!')
