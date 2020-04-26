const Router = require('koa-router')
// 导入正整数校验器
const { PositiveIntegerValidator } = require('../../validators/validator')

const router = new Router() // 实例化router

router.post('/v1/:id/test', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body

  // 实例化校验器后, 校验时需传入ctx参数
  // 因为所有的参数都保存在ctx中,所以必须要传入ctx
  const v = new PositiveIntegerValidator().validate(ctx)

  ctx.body = { key: '获取参数成功' }
})

module.exports = router
