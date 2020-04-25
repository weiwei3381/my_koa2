const Router = require('koa-router')
// 导入自定义Http异常类
const { HttpException } = require('../../../core/http-exception')

const router = new Router() // 实例化router

router.post('/v1/:id/test', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body

  // 如果query为空对象, 则抛出相应错误
  if (JSON.stringify(query) === '{}') {
    // 创建error对象之后, 在上面挂载相应的状态
    const error = new HttpException('参数错误', 10001, 400)
    throw error
  }
  ctx.body = { key: '获取参数成功' }
})

module.exports = router
