const Router = require('koa-router')

const router = new Router() // 实例化router

router.post('/v1/:id/test', (ctx, next) => {
  const path = ctx.params // 获取到{id:"1"}
  const query = ctx.request.query // 获取到{param:"weiwei"}
  const headers = ctx.request.header // 对象包含很多属性, 其中token属性为12345678
  // 在使用路由之前, 使用了koa-bodyparser中间件
  // 才能在request的body属性中获取值
  const body = ctx.request.body // 获取到{test: 2}

  // 如果query为空对象, 则抛出相应错误
  if (JSON.stringify(query) === '{}') {
    // 创建error对象之后, 在上面挂载相应的状态
    const error = new Error('错误信息')
    error.errorCode = 10001
    error.status = 400
    error.requestUrl = `${ctx.method} ${ctx.path}`
    throw error
  }
  ctx.body = { key: '获取参数成功' }
})

module.exports = router
